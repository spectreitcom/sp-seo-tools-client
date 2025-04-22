import { ComponentProps } from "react";
import clsx from "clsx";
import { Analysis } from "../../hooks";
import AnalysisTableRow from "./analysis-table-row.tsx";

type Props = ComponentProps<"div"> & {
  analysis: Analysis[];
};

function AnalysisTable({ className, analysis, ...rest }: Props) {
  const containerClasses = clsx(className);

  return (
    <div className={containerClasses} {...rest}>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Phrase
            </th>

            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Progress
            </th>

            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Localization
            </th>

            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Device
            </th>

            <th
              scope="col"
              className="relative py-3.5 pr-4 pl-3 whitespace-nowrap sm:pr-0"
            />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {analysis.map((item) => (
            <AnalysisTableRow key={item.analysisId} analysis={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalysisTable;
