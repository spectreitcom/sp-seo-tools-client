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
import { useKeywords, useKeywordsFilters } from "../../hooks";
import KeywordsFilters, {
  KeywordsFilter,
} from "../../components/keywords-filters.tsx";
import LinkBtn from "../../components/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PER_PAGE = 30;

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

  const [searchText, setSearchText] = useDebounceValue(getSearchText(), 1000);
  const [addKeywordModalOpen, setAddKeywordModalOpen] = useState(false);
  const { createKeywordsQueryOptions } = useKeywords();

  const {
    data: keywords,
    isError,
    refetch,
    isLoading,
  } = useQuery(
    createKeywordsQueryOptions(
      getPage(),
      searchText ?? "",
      getDevice(),
      getDomainId(),
    ),
  );

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
    if (isError) {
      toast.error("Ups! Something went wrong");
    }
  }, [isError]);

  return (
    <div>
      <PageTitle title={"Keywords"} />

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
