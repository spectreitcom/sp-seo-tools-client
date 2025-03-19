import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useErrorHandler, useRankTrackerStripe } from "../../../hooks";
import { RequestAxiosError } from "../../../types";
import { getErrorMessage } from "../../../utils/get-error-message.ts";
import Button from "../../ui/button.tsx";

type Props = {
  subscriptionId: string;
  price: number;
  name: string;
  maxKeywordsQty: number;
  maxSearchedPages: number;
};

function SubscriptionPlan({
  subscriptionId,
  maxKeywordsQty,
  price,
  name,
  maxSearchedPages,
}: Props) {
  const { createCheckoutSession } = useRankTrackerStripe();
  const { handle401Error } = useErrorHandler();

  const { mutate, isPending } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      window.location.href = data.sessionUrl;
    },
    onError: (error: RequestAxiosError) => {
      handle401Error(error);
      toast.error(getErrorMessage(error));
    },
  });

  const createSession = () => {
    mutate(subscriptionId);
  };

  return (
    <div className={"w-full lg:w-1/3 p-4"}>
      <div className={"bg-white p-4 border-gray-200 rounded-md"}>
        <h3 className={"text-xl font-semibold"}>Plan: {name}</h3>
        <p className={"mt-4"}>Max Keywords: {maxKeywordsQty}</p>
        <p>Max Searched Pages: {maxSearchedPages}</p>
        <p>Domains: unlimited</p>
        <p>Price: ${price}/month</p>
        <div className={"mt-4"}>
          <Button size={"lg"} soft onClick={createSession} loading={isPending}>
            Choose
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
