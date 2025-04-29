import Button from "./button.tsx";

type Props = Readonly<{
  planName: string;
  price: number;
  isLoading?: boolean;
  onManageSubscription: () => void;
}>;

function CurrentSubscriptionBanner({
  onManageSubscription,
  planName,
  price,
  isLoading,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="text-center lg:text-left">
        <h3 className="text-xl font-semibold text-gray-800">
          Active Subscription - {planName}
        </h3>
        <p className="text-gray-600 mt-1">Your current plan: ${price}/month</p>
      </div>
      <div className="mt-4 lg:mt-0">
        <Button
          size="lg"
          loading={isLoading}
          onClick={onManageSubscription}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Manage Subscription
        </Button>
      </div>
    </div>
  );
}

export default CurrentSubscriptionBanner;
