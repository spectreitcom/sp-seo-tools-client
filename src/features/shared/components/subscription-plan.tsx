import { CheckIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Button from "./button.tsx";

type Props = Readonly<{
  className?: string;
  title: string;
  price: number;
  onChoosePlan: () => void;
  features: string[];
  isLoading?: boolean;
}>;

function SubscriptionPlan({
  className,
  title,
  price,
  onChoosePlan,
  features,
  isLoading,
}: Props) {
  return (
    <div
      className={clsx(
        "w-4/12 border border-gray-200 rounded-md p-8",
        className,
      )}
    >
      <h3 className={"text-2xl font-semibold"}>{title}</h3>
      <div className={"items-baseline text-5xl font-bold mt-2"}>
        ${price}
        <span className={"text-sm font-light ml-1"}>/month</span>
      </div>
      <div className={"mt-8"}>
        <ul className={"space-y-2"}>
          {features.map((feature) => (
            <li className={"flex items-center"} key={feature}>
              <CheckIcon className={"size-5 text-green-500 mr-2"} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className={"mt-8"}
        size={"xl"}
        block
        soft
        onClick={onChoosePlan}
        loading={isLoading}
      >
        Choose plan
      </Button>
    </div>
  );
}

export default SubscriptionPlan;
