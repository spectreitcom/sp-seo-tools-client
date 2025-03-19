import { AvailableKeywordsQuantity as AvailableKeywordsQuantityInterface } from "../../hooks";
import { RectangleStackIcon } from "@heroicons/react/16/solid";

type Props = {
  data?: AvailableKeywordsQuantityInterface;
};

function AvailableKeywordsQuantity({ data }: Props) {
  if (!data) return null;
  return (
    <div className={"bg-gray-100 p-4 rounded-md inline-flex items-center"}>
      <RectangleStackIcon className={"size-5 text-indigo-600 mr-2"} />
      <span>
        Used keywords {data.usedKeywordsQuantity} / {data.maxKeywordsQuantity}
      </span>
    </div>
  );
}

export default AvailableKeywordsQuantity;
