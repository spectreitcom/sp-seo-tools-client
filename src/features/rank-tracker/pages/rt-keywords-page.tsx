import { useKeywordsFilters } from "../hooks/use-keywords-filters.ts";
import { useErrorHandler } from "../../shared";
import { useDebounceValue } from "usehooks-ts";
import { useEffect, useState } from "react";
import { useKeywords } from "../hooks/use-keywords.ts";
import { useQuery } from "@tanstack/react-query";
import KeywordsFilters, {
  KeywordsFilter,
} from "../components/keywords-filters.tsx";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import PageTitle from "../../shared/components/page-title.tsx";
import AvailableKeywordsQuantity from "../components/available-keywords-quantity.tsx";
import LinkBtn from "../../shared/components/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../shared/components/button.tsx";
import Spinner from "../../shared/components/loader/spinner.tsx";
import KeywordsTable from "../components/keywords-table.tsx";
import Pagination from "../../shared/components/pagination.tsx";
import EmptyTablePlaceholder from "../../shared/components/empty-table-placeholder.tsx";
import AddKeywordAsideModal from "../components/add-keyword-aside-modal.tsx";

const PER_PAGE = 15;

function RtKeywordsPage() {
  const {
    reset: resetFilters,
    getPage,
    updatePage,
    commit,
    getSearchText,
    getDevice,
    getDomainId,
    updateDomainId,
    updateSearchText,
    updateDevice,
    getLocalizationId,
    updateLocalizationId,
  } = useKeywordsFilters();

  const { handle401Error } = useErrorHandler();

  const [searchText, setSearchText] = useDebounceValue(getSearchText(), 1000);
  const [addKeywordModalOpen, setAddKeywordModalOpen] = useState(false);
  const {
    createKeywordsQueryOptions,
    createAvailableKeywordsQuantityQueryOptions,
  } = useKeywords();

  const {
    data: keywords,
    isError,
    refetch: refetchKeywords,
    isFetching: keywordIsFetching,
    error: keywordsError,
  } = useQuery(
    createKeywordsQueryOptions(
      getPage(),
      searchText ?? "",
      getDevice(),
      getDomainId(),
      PER_PAGE,
      getLocalizationId(),
    ),
  );

  const {
    data: availableKeywordsQuantity,
    refetch: refetchAvailableKeywordsQuantity,
    error: availableKeywordsQuantityError,
    isFetching: availableKeywordsQuantityIsFetching,
  } = useQuery(createAvailableKeywordsQuantityQueryOptions());

  const handleNextPage = async () => {
    updatePage(getPage() + 1);
    commit();
  };

  const handlePrevPage = async () => {
    updatePage(getPage() - 1);
    commit();
  };

  const handleAdded = async () => {
    resetFiltersFn();
    await refetchKeywords();
    await refetchAvailableKeywordsQuantity();
  };

  const handleFiltersChange = (filter: KeywordsFilter) => {
    setSearchText(filter.searchText);
    updateSearchText(filter.searchText);
    updatePage(1);
    updateDevice(filter.device);
    updateDomainId(filter.domainId);
    updateLocalizationId(filter.localizationId);
    commit();
  };

  const handleDeleted = async () => {
    resetFilters();
    await refetchKeywords();
    await refetchAvailableKeywordsQuantity();
  };

  const resetFiltersFn = () => {
    setSearchText("");
    resetFilters();
    commit();
  };

  const isClearFiltersBtnVisible = () => {
    const searchText = getSearchText();
    const device = getDevice();
    const domainId = getDomainId();
    const localizationId = getLocalizationId();
    return searchText || device || domainId || localizationId;
  };

  useEffect(() => {
    if (keywordsError) {
      handle401Error(keywordsError as AxiosError);
      return;
    }
    if (availableKeywordsQuantityError) {
      handle401Error(availableKeywordsQuantityError as AxiosError);
    }
  }, [keywordsError, availableKeywordsQuantityError, handle401Error]);

  useEffect(() => {
    if (isError) {
      toast.error("Ups! Something went wrong");
    }
  }, [isError]);

  return (
    <div>
      <PageTitle
        title={"Keywords"}
        returnPath={"/rank-tracker"}
        returnText={"Back"}
      />

      <div className={"mt-8"}>
        <AvailableKeywordsQuantity
          data={availableKeywordsQuantity}
          loading={availableKeywordsQuantityIsFetching}
        />
      </div>

      <div className={"mt-8 flex justify-between items-center"}>
        <div className={"grow"}>
          <KeywordsFilters
            onChange={handleFiltersChange}
            value={{
              searchText: getSearchText(),
              device: getDevice(),
              domainId: getDomainId(),
              localizationId: getLocalizationId(),
            }}
          />
          {isClearFiltersBtnVisible() && (
            <div className={"mt-4"}>
              <LinkBtn
                onClick={resetFiltersFn}
                icon={<XMarkIcon className={"size-5"} />}
              >
                Clear filters
              </LinkBtn>
            </div>
          )}
        </div>
        <Button size={"lg"} onClick={() => setAddKeywordModalOpen(true)}>
          Add keyword
        </Button>
      </div>

      {keywordIsFetching ? (
        <div className={"mt-4"}>
          <Spinner />
        </div>
      ) : (
        <>
          {keywords?.userTotal ? (
            <>
              <KeywordsTable
                keywords={keywords.data}
                className={"mt-4"}
                onDeleted={handleDeleted}
              />
              <div className={"mt-4 flex justify-end"}>
                <Pagination
                  page={getPage()}
                  total={keywords.total}
                  perPage={PER_PAGE}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              </div>
            </>
          ) : (
            ""
          )}

          {!keywords?.userTotal && (
            <EmptyTablePlaceholder
              className={"mt-8"}
              onAction={() => setAddKeywordModalOpen(true)}
              heading={"No keywords"}
              description={"Get started by creating a new keyword."}
              actionText={"Add keyword"}
            />
          )}
        </>
      )}

      <AddKeywordAsideModal
        open={addKeywordModalOpen}
        onClose={() => setAddKeywordModalOpen(false)}
        onAdded={handleAdded}
      />
    </div>
  );
}

export default RtKeywordsPage;
