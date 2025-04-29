import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { AxiosError } from "axios";
import clsx from "clsx";
import toast from "react-hot-toast";
import { Analysis } from "../types";
import { useAnalysisProgress } from "../hooks/use-analysis-progress.ts";
import { useErrorHandler } from "../../shared";
import Spinner from "../../shared/components/loader/spinner.tsx";
import Badge from "../../shared/components/badge.tsx";

type Props = Readonly<{
  analysis: Analysis;
}>;

function AnalysisTableRow({ analysis }: Props) {
  const { createAnalysisProgressQueryOptions } = useAnalysisProgress();
  const { handle401Error } = useErrorHandler();

  const [progress, setProgress] = useState(analysis.progress);

  const isCompleted = () => {
    return analysis.progress === 100 || progress === 100;
  };

  const { data: analysisProgress, error } = useQuery(
    createAnalysisProgressQueryOptions(
      analysis.analysisId,
      !isCompleted() && !analysis.hasError,
      3 * 1000,
    ),
  );

  useEffect(() => {
    setProgress(analysisProgress?.progress ?? 0);
    if (analysisProgress?.progress === 100 && analysis.progress !== 100) {
      toast.success("Analysis finished");
    }
  }, [analysisProgress, analysis]);

  useEffect(() => {
    if (error) {
      handle401Error(error as AxiosError);
    }
  }, [error, handle401Error]);

  return (
    <tr>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0 flex items-center">
        {!isCompleted() && !analysis.hasError && (
          <span className={"mr-2"}>
            <Spinner width={20} borderWidth={3} />
          </span>
        )}
        <Link
          to={`/serp-analyzer/analysis/${analysis.analysisId}`}
          className={clsx(
            "cursor-pointer text-sm flex flex-nowrap items-center hover:text-indigo-500 focus-visible:outline-indigo-600 text-indigo-600 font-bold",
            !isCompleted() && "opacity-20 pointer-events-none",
          )}
        >
          {analysis.phrase}
        </Link>
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {isCompleted() && <Badge text={"Completed"} color={"success"} />}
        {analysis.hasError && <Badge text={"Error"} color={"danger"} />}
        {!isCompleted() && !analysis.hasError && (
          <ProgressBar completed={progress} className={"w-48"} />
        )}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        <ReactCountryFlag
          countryCode={analysis.localizationCountryCode}
          className={"mr-2"}
        />
        {analysis.localizationName}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {analysis.deviceName}
      </td>
    </tr>
  );
}

export default AnalysisTableRow;
