import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router";
import { Analysis } from "../../hooks";

type Props = Readonly<{
  analysis: Analysis;
}>;

function AnalysisTableRow({ analysis }: Props) {
  return (
    <tr>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        <Link
          to={`/serp-analyzer/analysis/${analysis.analysisId}`}
          className={
            "cursor-pointer text-sm flex flex-nowrap items-center hover:text-indigo-500 focus-visible:outline-indigo-600 text-indigo-600 font-bold"
          }
        >
          {analysis.phrase}
        </Link>
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        progress todo
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
