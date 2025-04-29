import { useAnalysisFilters } from "../hooks/use-analysis-filters.ts";
import { useAnalysis } from "../hooks/use-analysis.ts";
import { useDebounceValue } from "usehooks-ts";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AnalysisFilters, {
  AnalysisFilter,
} from "../components/analysis-filters.tsx";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import PageTitle from "../../shared/components/page-title.tsx";
import AnalysisMonthlyUsage from "../components/analysis-monthly-usage.tsx";
import LinkBtn from "../../shared/components/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../shared/components/button.tsx";
import Spinner from "../../shared/components/loader/spinner.tsx";
import AnalysisTable from "../components/analysis-table.tsx";
import Pagination from "../../shared/components/pagination.tsx";
import EmptyTablePlaceholder from "../../shared/components/empty-table-placeholder.tsx";
import AddAnalysisAsideModal from "../components/add-analysis-aside-modal.tsx";
import { ErrorBoundary, useErrorHandler } from "../../shared";

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

  const { createAnalysisQueryOptions, createUsageQueryOptions } = useAnalysis();
  const { handle401Error } = useErrorHandler();

  const [searchText, setSearchText] = useDebounceValue(getSearchText(), 1000);
  const [showCreateAnalysisModal, setShowCreateAnalysisModal] = useState(false);

  const {
    data: analysis,
    error: analysisError,
    isFetching: analysisIsFetching,
    isError,
    refetch: refetchAnalysis,
  } = useQuery(
    createAnalysisQueryOptions(
      getPage(),
      searchText ?? "",
      getDevice(),
      PER_PAGE,
      getLocalizationId(),
    ),
  );

  const {
    data: usage,
    isFetching: usageIsFetching,
    error: usageError,
    refetch: refetchUsage,
  } = useQuery(createUsageQueryOptions());

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
      return;
    }
    if (usageError) {
      handle401Error(usageError as AxiosError);
    }
  }, [analysisError, usageError, handle401Error]);

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

      <div className={"mt-8"}>
        <AnalysisMonthlyUsage data={usage} loading={usageIsFetching} />
      </div>

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
        <Button size={"lg"} onClick={() => setShowCreateAnalysisModal(true)}>
          Add analysis
        </Button>
      </div>

      {analysisIsFetching ? (
        <div className={"mt-4"}>
          <Spinner />
        </div>
      ) : (
        <ErrorBoundary>
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
            <EmptyTablePlaceholder
              className={"mt-8"}
              onAction={() => setShowCreateAnalysisModal(true)}
              heading={"No analysis"}
              description={"Get started by creating a new analysis."}
              actionText={"Create analysis"}
            />
          )}
        </ErrorBoundary>
      )}

      <AddAnalysisAsideModal
        open={showCreateAnalysisModal}
        onClose={() => setShowCreateAnalysisModal(false)}
        onAdded={async () => {
          await refetchAnalysis();
          await refetchUsage();
        }}
      />
    </div>
  );
}

export default SaAnalysisPage;
