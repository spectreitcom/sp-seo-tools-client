import ReactCountryFlag from "react-country-flag";
import KeywordPositionBadge from "./keyword-position-badge.tsx";
import KeywordGrowthArrows from "./keyword-growth-arrows.tsx";
import { Keyword } from "../types";

type Props = Readonly<{
  keyword: Keyword | undefined;
  className?: string;
}>;

function RtKeywordDetails({ keyword, className }: Props) {
  if (!keyword) return null;
  return (
    <div className={className}>
      <div className={"flex -mx-4"}>
        <div className={"w-1/2 lg:w-3/12 p-4"}>
          <div className={"bg-gray-100 rounded-md p-4"}>
            <strong>Keyword:</strong> {keyword.keywordText}
          </div>
        </div>
        <div className={"w-1/2 lg:w-3/12 p-4"}>
          <div className={"bg-gray-100 rounded-md p-4"}>
            <strong>Domain:</strong> {keyword.domain}
          </div>
        </div>
        <div className={"w-1/2 lg:w-3/12 p-4"}>
          <div className={"bg-gray-100 rounded-md p-4"}>
            <strong className={"mr-2"}>Localization:</strong>
            <span>
              <ReactCountryFlag
                countryCode={keyword.localizationCountryCode}
                className={"mr-1"}
              />
              {keyword.localizationCountryName}
            </span>
          </div>
        </div>
        <div className={"w-1/2 lg:w-3/12 p-4"}>
          <div className={"bg-gray-100 rounded-md p-4 flex items-center"}>
            <strong className={"mr-2"}>Last indexed position:</strong>
            <div className={"flex items-center"}>
              <KeywordGrowthArrows growth={keyword.growth} />
              <KeywordPositionBadge position={keyword.lastIndexedPosition} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RtKeywordDetails;
