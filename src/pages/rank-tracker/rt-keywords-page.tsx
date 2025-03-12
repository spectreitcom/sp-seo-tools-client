import PageTitle from "../../components/page-title.tsx";
import { useQuery } from "@tanstack/react-query";
import KeywordsTable from "../../components/keywords-table.tsx";
import Pagination from "../../components/pagination.tsx";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import toast from "react-hot-toast";
import AddKeywordAsideModal from "../../components/add-keyword-aside-modal.tsx";
import NoKeywordsPlaceholder from "../../components/no-keywords-placeholder.tsx";
import Button from "../../components/button.tsx";
import { useErrorHandler, useKeywords, useKeywordsFilters } from "../../hooks";
import KeywordsFilters, {
  KeywordsFilter,
} from "../../components/keywords-filters.tsx";
import LinkBtn from "../../components/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AvailableKeywordsQuantity from "../../components/available-keywords-quantity.tsx";
import { AxiosError } from "axios";

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
    refetch,
    isLoading,
    error: keywordsError,
  } = useQuery(
    createKeywordsQueryOptions(
      getPage(),
      searchText ?? "",
      getDevice(),
      getDomainId(),
      PER_PAGE,
    ),
  );

  const {
    data: availableKeywordsQuantity,
    refetch: refetchAvailableKeywordsQuantity,
    error: availableKeywordsQuantityError,
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
    await refetch();
    await refetchAvailableKeywordsQuantity();
  };

  const handleFiltersChange = (filter: KeywordsFilter) => {
    setSearchText(filter.searchText);
    updateSearchText(filter.searchText);
    updatePage(1);
    updateDevice(filter.device);
    updateDomainId(filter.domainId);
    commit();
  };

  const handleDeleted = async () => {
    resetFilters();
    await refetch();
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
    return searchText || device || domainId;
  };

  useEffect(() => {
    if (keywordsError) {
      handle401Error(keywordsError as AxiosError);
      return;
    }
    if (availableKeywordsQuantityError) {
      handle401Error(availableKeywordsQuantityError as AxiosError);
      return;
    }
  }, [keywordsError, availableKeywordsQuantityError]);

  useEffect(() => {
    if (isError) {
      toast.error("Ups! Something went wrong");
    }
  }, [isError]);

  return (
    <div>
      <PageTitle title={"Keywords"} />

      <div className={"mt-8"}>
        <AvailableKeywordsQuantity data={availableKeywordsQuantity} />
      </div>

      <div className={"mt-8 flex justify-between items-center"}>
        <div className={"grow"}>
          <KeywordsFilters
            onChange={handleFiltersChange}
            value={{
              searchText: getSearchText(),
              device: getDevice(),
              domainId: getDomainId(),
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

      {!keywords?.userTotal && !isLoading && (
        <NoKeywordsPlaceholder
          onAction={() => setAddKeywordModalOpen(true)}
          className={"mt-8"}
        />
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
