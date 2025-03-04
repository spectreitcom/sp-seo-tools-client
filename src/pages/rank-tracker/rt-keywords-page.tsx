import PageTitle from "../../components/page-title.tsx";
import { useQuery } from "@tanstack/react-query";
import KeywordsTable from "../../components/keywords-table.tsx";
import Pagination from "../../components/pagination.tsx";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import toast from "react-hot-toast";
import AddKeywordAsideModal from "../../components/add-keyword-aside-modal.tsx";
import NoKeywordsPlaceholder from "../../components/no-keywords-placeholder.tsx";
import InputWithInlineAddon from "../../components/input-with-inline-addon.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Button from "../../components/button.tsx";
import { useKeywords } from "../../hooks";

const PER_PAGE = 30;

function RtKeywordsPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useDebounceValue("", 1000);
  const [addKeywordModalOpen, setAddKeywordModalOpen] = useState(false);
  const { createKeywordsQueryOptions } = useKeywords();
  const {
    data: keywords,
    refetch,
    isError,
  } = useQuery(createKeywordsQueryOptions(page, searchText));

  const handleNextPage = async () => {
    setPage(page + 1);
    await refetch();
  };

  const handlePrevPage = async () => {
    setPage(page - 1);
    await refetch();
  };

  const handleAdded = async () => {
    setPage(1);
    setSearchText("");
    await refetch();
  };

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
    setPage(1);
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
        <div>
          <InputWithInlineAddon
            placeholder={"Search"}
            onChange={(e) => handleSearchTextChange(e.target.value)}
            leadingAddon={
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400 sm:size-4"
              />
            }
          />
        </div>
        <Button size={"lg"} onClick={() => setAddKeywordModalOpen(true)}>
          Add keyword
        </Button>
      </div>

      {keywords?.userTotal ? (
        <>
          <KeywordsTable keywords={keywords.data} className={"mt-4"} />
          <div className={"mt-4 flex justify-end"}>
            <Pagination
              page={page}
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
