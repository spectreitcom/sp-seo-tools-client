import PageTitle from "../../components/pages/page-title.tsx";
import { useParams } from "react-router";
import { useAnalysis, useErrorHandler } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Spinner from "../../components/ui/loader/spinner.tsx";
import PagesList from "../../components/pages/pages-list.tsx";
import PageFactors from "../../components/pages/page-factors.tsx";
import MessageBox from "../../components/ui/message-box.tsx";
import AnalysisChart from "../../components/pages/analysis-chart.tsx";
import ReactCountryFlag from "react-country-flag";
import LinkBtn from "../../components/ui/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AddCompetitorForm from "../../components/pages/add-competitor-form.tsx";

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
  }, [error]);

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
          <PageFactors
            data={data?.factorsCollection ?? []}
            onChange={(factors) => setSelectedFactors(factors)}
            selected={selectedFactors}
          />
        </div>
        <div className={"w-8/12"}>
          {!selectedFactors.length && (
            <MessageBox
              severity={"info"}
              text={"Select options to see charts"}
            />
          )}

          {selectedFactors.map((selectedFactor) => (
            <AnalysisChart
              key={selectedFactor.key}
              data={data?.pages ?? []}
              factor={selectedFactor}
            />
          ))}

          <PagesList
            data={
              data?.pages.map((page) => ({
                pageId: page.pageId,
                position: page.position,
                url: page.url,
              })) ?? []
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SaAnalysisDetailsPage;
