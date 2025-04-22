import PageTitle from "../../components/pages/page-title.tsx";
import Button from "../../components/ui/button.tsx";
import AnalysisFilters, {
  AnalysisFilter,
} from "../../components/pages/analysis-filters.tsx";
import { useAnalysis, useAnalysisFilters, useErrorHandler } from "../../hooks";
import { useDebounceValue } from "usehooks-ts";
import LinkBtn from "../../components/ui/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/loader/spinner.tsx";
import NoAnalysisPlaceholder from "../../components/pages/no-analysis-placeholder.tsx";
import Pagination from "../../components/ui/pagination.tsx";
import AnalysisTable from "../../components/pages/analysis-table.tsx";

const PER_PAGE = 15;

function SaAnalysisPage() {
  const {
    reset: resetFilters,
    getPage,
    updatePage,
    commit,
    getSearchText,
    getDevice,
    updateLocalizationId,
    updateSearchText,
    updateDevice,
    getLocalizationId,
  } = useAnalysisFilters();

  const { createAnalysisQueryOptions } = useAnalysis();
  const { handle401Error } = useErrorHandler();

  const [searchText, setSearchText] = useDebounceValue(getSearchText(), 1000);

  const {
    data: analysis,
    error: analysisError,
    isFetching: analysisIsFetching,
    isError,
  } = useQuery(
    createAnalysisQueryOptions(
      getPage(),
      searchText ?? "",
      getDevice(),
      PER_PAGE,
      getLocalizationId(),
    ),
  );

  const handleFiltersChange = (filter: AnalysisFilter) => {
    setSearchText(filter.searchText);
    updateSearchText(filter.searchText);
    updatePage(1);
    updateDevice(filter.device);
    updateLocalizationId(filter.localizationId);
    commit();
  };

  const resetFiltersFn = () => {
    setSearchText("");
    resetFilters();
    commit();
  };

  const handleNextPage = async () => {
    updatePage(getPage() + 1);
    commit();
  };

  const handlePrevPage = async () => {
    updatePage(getPage() - 1);
    commit();
  };

  const isClearFiltersBtnVisible = () => {
    const searchText = getSearchText();
    const device = getDevice();
    const localizationId = getLocalizationId();
    return searchText || device || localizationId;
  };

  useEffect(() => {
    if (analysisError) {
      handle401Error(analysisError as AxiosError);
    }
  }, [analysisError]);

  useEffect(() => {
    if (isError) {
      toast.error("Ups! Something went wrong");
    }
  }, [isError]);

  return (
    <div>
      <PageTitle
        title={"Analysis"}
        returnPath={"/serp-analyzer"}
        returnText={"Back"}
      />

      <div className={"mt-8 flex justify-between items-center"}>
        <div className={"grow"}>
          <AnalysisFilters
            value={{
              searchText: getSearchText(),
              device: getDevice(),
              localizationId: getLocalizationId(),
            }}
            onChange={handleFiltersChange}
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
        <Button size={"lg"} onClick={() => {}}>
          Add analysis
        </Button>
      </div>

      {analysisIsFetching ? (
        <div className={"mt-4"}>
          <Spinner />
        </div>
      ) : (
        <>
          <>
            {analysis?.userTotal ? (
              <>
                <AnalysisTable
                  analysis={analysis?.data ?? []}
                  className={"mt-4"}
                />
                <div className={"mt-4 flex justify-end"}>
                  <Pagination
                    page={getPage()}
                    total={analysis.total}
                    perPage={PER_PAGE}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </>
          {!analysis?.userTotal && (
            <NoAnalysisPlaceholder className={"mt-8"} onAction={() => {}} />
          )}
        </>
      )}
    </div>
  );
}

export default SaAnalysisPage;
