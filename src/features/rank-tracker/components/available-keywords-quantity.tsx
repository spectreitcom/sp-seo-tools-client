import { AvailableKeywordsQuantity as AvailableKeywordsQuantityInterface } from "../types";
import { RectangleStackIcon } from "@heroicons/react/16/solid";
import Spinner from "../../shared/components/loader/spinner.tsx";

type Props = Readonly<{
  data?: AvailableKeywordsQuantityInterface;
  loading?: boolean;
}>;

function AvailableKeywordsQuantity({ data, loading }: Props) {
  if (!data) return null;
  return (
    <div className={"bg-gray-100 p-4 rounded-md inline-flex items-center"}>
      <RectangleStackIcon className={"size-5 text-indigo-600 mr-2"} />
      <span>
        Used keywords {data.usedKeywordsQuantity} / {data.maxKeywordsQuantity}
      </span>
      {loading && (
        <span className={"ml-2"}>
          <Spinner width={20} borderWidth={3} />
        </span>
      )}
    </div>
  );
}

export default AvailableKeywordsQuantity;
