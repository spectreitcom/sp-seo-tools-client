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
import { useKeywords } from "../../hooks";
import { useSearchParams } from "react-router";
import KeywordsFilters, {
  KeywordsFilter,
} from "../../components/keywords-filters.tsx";
import LinkBtn from "../../components/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PER_PAGE = 30;

function RtKeywordsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    searchText: "",
    device: "",
    searchEngineId: "",
    domainId: "",
  });
  const [searchText, setSearchText] = useDebounceValue(
    searchParams.get("searchText"),
    1000,
  );
  const [addKeywordModalOpen, setAddKeywordModalOpen] = useState(false);
  const { createKeywordsQueryOptions } = useKeywords();

  const getPage = () => {
    const page = searchParams.get("page");
    if (!page) {
      return 1;
    }
    const pageNumber = parseInt(page);
    if (isNaN(pageNumber)) {
      return 1;
    }
    return pageNumber;
  };

  const getSearchText = () => {
    const searchText = searchParams.get("searchText");
    if (!searchText) {
      return "";
    }
    return searchText;
  };

  const getDevice = () => {
    const device = searchParams.get("device");
    if (!device) {
      return "";
    }
    return device;
  };

  const getSearchEngineId = () => {
    const searchEngineId = searchParams.get("searchEngineId");
    if (!searchEngineId) {
      return "";
    }
    return searchEngineId;
  };

  const getDomainId = () => {
    const domainId = searchParams.get("domainId");
    if (!domainId) {
      return "";
    }
    return domainId;
  };

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
      getSearchEngineId(),
      getDomainId(),
    ),
  );

  const handleNextPage = async () => {
    searchParams.set("page", (getPage() + 1).toString());
    searchParams.set("searchText", getSearchText());
    searchParams.set("device", getDevice());
    searchParams.set("searchEngineId", getSearchEngineId());
    searchParams.set("domainId", getDomainId());
    setSearchParams(searchParams);
  };

  const handlePrevPage = async () => {
    searchParams.set("page", (getPage() - 1).toString());
    searchParams.set("searchText", getSearchText());
    searchParams.set("device", getDevice());
    searchParams.set("searchEngineId", getSearchEngineId());
    searchParams.set("domainId", getDomainId());
    setSearchParams(searchParams);
  };

  const handleAdded = async () => {
    resetFilters();
    await refetch();
  };

  const handleFiltersChange = (filter: KeywordsFilter) => {
    searchParams.set("searchText", filter.searchText);
    searchParams.set("page", "1");
    searchParams.set("device", filter.device);
    searchParams.set("searchEngineId", filter.searchEngineId);
    searchParams.set("domainId", filter.domainId);
    setSearchParams(searchParams);
    setSearchText(filter.searchText);
  };

  const handleDeleted = async () => {
    resetFilters();
    await refetch();
  };

  const resetFilters = () => {
    setSearchText("");
    searchParams.set("page", "1");
    searchParams.set("searchText", "");
    searchParams.set("device", "");
    searchParams.set("searchEngineId", "");
    searchParams.set("domainId", "");
    setSearchParams(searchParams);
  };

  const isClearFiltersBtnVisible = () => {
    const searchText = getSearchText();
    const device = getDevice();
    const searchEngineId = getSearchEngineId();
    const domainId = getDomainId();
    return searchText || device || searchEngineId || domainId;
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
              searchEngineId: getSearchEngineId(),
              domainId: getDomainId(),
            }}
          />
          {isClearFiltersBtnVisible() && (
            <div className={"mt-4"}>
              <LinkBtn
                onClick={resetFilters}
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
