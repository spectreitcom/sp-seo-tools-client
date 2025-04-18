import { KeywordGrowth } from "../../hooks";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/16/solid";

export type Props = Readonly<{
  growth: KeywordGrowth;
}>;

function KeywordGrowthArrows({ growth }: Props) {
  return (
    <div>
      {growth === "UP" && (
        <ArrowLongUpIcon className={"size-4 text-green-600"} />
      )}
      {growth === "DOWN" && (
        <ArrowLongDownIcon className={"size-4 text-red-600"} />
      )}
    </div>
  );
}

export default KeywordGrowthArrows;
