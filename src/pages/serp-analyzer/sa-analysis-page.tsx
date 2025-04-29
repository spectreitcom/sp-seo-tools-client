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
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/loader/spinner.tsx";
import Pagination from "../../components/ui/pagination.tsx";
import AnalysisTable from "../../components/pages/analysis-table.tsx";
import AddAnalysisAsideModal from "../../components/add-analysis-aside-modal.tsx";
import AnalysisMonthlyUsage from "../../components/pages/analysis-monthly-usage.tsx";
import EmptyTablePlaceholder from "../../components/pages/empty-table-placeholder.tsx";

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
  }, [analysisError, usageError]);

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
            <EmptyTablePlaceholder
              className={"mt-8"}
              onAction={() => setShowCreateAnalysisModal(true)}
              heading={"No analysis"}
              description={"Get started by creating a new analysis."}
              actionText={"Create analysis"}
            />
          )}
        </>
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
