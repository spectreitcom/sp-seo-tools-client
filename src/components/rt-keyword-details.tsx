import { Keyword } from "../hooks";
import ReactCountryFlag from "react-country-flag";

type Props = {
  keyword: Keyword | undefined;
  className?: string;
};

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
          <div className={"bg-gray-100 rounded-md p-4"}>
            <strong>Last indexed position:</strong>
            {keyword.lastIndexedPosition}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RtKeywordDetails;
