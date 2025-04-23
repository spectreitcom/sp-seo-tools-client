import { AnalysisUsage } from "../../hooks";
import { RectangleStackIcon } from "@heroicons/react/16/solid";
import Spinner from "../ui/loader/spinner.tsx";

type Props = Readonly<{
  data?: AnalysisUsage;
  loading?: boolean;
}>;

function AnalysisMonthlyUsage({ data, loading }: Props) {
  if (!data) return null;
  return (
    <div className={"bg-gray-100 p-4 rounded-md inline-flex items-center"}>
      <RectangleStackIcon className={"size-5 text-indigo-600 mr-2"} />
      <span>
        Quota {data.usedQuota} / {data.monthlyLimit}
      </span>
      {loading && (
        <span className={"ml-2"}>
          <Spinner width={20} borderWidth={3} />
        </span>
      )}
    </div>
  );
}

export default AnalysisMonthlyUsage;
