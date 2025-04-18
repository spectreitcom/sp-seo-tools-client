import Button from "../ui/button.tsx";

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
    <div
      className={
        "mt-8 flex justify-between items-center bg-gray-100 p-4 rounded-md"
      }
    >
      <div>
        <h3 className={"text-lg font-semibold"}>
          Active Subscription - {planName}
        </h3>
        <p>Your current plan: {price}$/month</p>
      </div>
      <div>
        <Button size={"lg"} loading={isLoading} onClick={onManageSubscription}>
          Manage subscription
        </Button>
      </div>
    </div>
  );
}

export default CurrentSubscriptionBanner;
