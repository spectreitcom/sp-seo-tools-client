import { useParams } from "react-router";
import { useAnalysis } from "../hooks/use-analysis.ts";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Spinner from "../../shared/components/loader/spinner.tsx";
import PageTitle from "../../shared/components/page-title.tsx";
import ReactCountryFlag from "react-country-flag";
import AddCompetitorForm from "../components/add-competitor-form.tsx";
import LinkBtn from "../../shared/components/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PageFactors from "../components/page-factors.tsx";
import MessageBox from "../../shared/components/message-box.tsx";
import AnalysisChart from "../components/analysis-chart.tsx";
import PagesList from "../components/pages-list.tsx";
import { ErrorBoundary, useErrorHandler } from "../../shared";

function SaAnalysisDetailsPage() {
  const { analysisId } = useParams<{ analysisId: string }>();
  const { createAnalysisDetailsQueryOptions } = useAnalysis();
  const { handle401Error } = useErrorHandler();

  const [selectedFactors, setSelectedFactors] = useState<
    { label: string; key: string }[]
  >([]);

  const { data, isFetching, error } = useQuery(
    createAnalysisDetailsQueryOptions(analysisId ?? "", !!analysisId),
  );

  useEffect(() => {
    if (error) {
      handle401Error(error as AxiosError);
    }
  }, [error, handle401Error]);

  if (isFetching) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        title={`Analysis details - ${data?.phrase}`}
        returnText={"Back"}
        returnPath={"/serp-analyzer/analysis"}
      />

      <div className={"mt-8 flex gap-x-4"}>
        <div className={"bg-gray-100 rounded-md p-4 w-3/12"}>
          <strong className={"mr-2"}>Localization:</strong>
          <span>
            <ReactCountryFlag
              countryCode={data?.localizationCountryCode ?? ""}
              className={"mr-1"}
            />
            {data?.localizationName}
          </span>
        </div>
        <div className={"bg-gray-100 rounded-md p-4 w-3/12"}>
          <strong className={"mr-2"}>Device:</strong>
          {data?.deviceName}
        </div>
      </div>

      <div className={"mt-4"}>
        <AddCompetitorForm analysisId={analysisId ?? ""} />
      </div>

      {!!selectedFactors.length && (
        <div className={"mt-4"}>
          <LinkBtn
            onClick={() => setSelectedFactors([])}
            icon={<XMarkIcon className={"size-5"} />}
          >
            Clear all charts
          </LinkBtn>
        </div>
      )}

      <div className={"flex mt-8"}>
        <div
          className={"w-4/12 max-h-[800px] overflow-auto mr-4 sticky top-20"}
        >
          <ErrorBoundary>
            <PageFactors
              data={data?.factorsCollection ?? []}
              onChange={(factors) => setSelectedFactors(factors)}
              selected={selectedFactors}
            />
          </ErrorBoundary>
        </div>
        <div className={"w-8/12"}>
          {!selectedFactors.length && (
            <MessageBox
              severity={"info"}
              text={"Select options to see charts"}
            />
          )}

          {selectedFactors.map((selectedFactor) => (
            <ErrorBoundary key={selectedFactor.key}>
              <AnalysisChart data={data?.pages ?? []} factor={selectedFactor} />
            </ErrorBoundary>
          ))}

          <ErrorBoundary>
            <PagesList
              data={
                data?.pages.map((page) => ({
                  pageId: page.pageId,
                  position: page.position,
                  url: page.url,
                  hasError: page.hasError,
                })) ?? []
              }
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default SaAnalysisDetailsPage;
