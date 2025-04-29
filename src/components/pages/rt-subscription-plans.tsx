import {
  useErrorHandler,
  useRankTrackerStripe,
  useRankTrackerSubscriptionPlans,
} from "../../hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RequestAxiosError } from "../../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/get-error-message.ts";
import { useEffect } from "react";
import { AxiosError } from "axios";
import Spinner from "../ui/loader/spinner.tsx";
import Button from "../ui/button.tsx";
import SubscriptionPlan from "./subscription-plan.tsx";

function RtSubscriptionPlans() {
  const { createSubscriptionPlansQueryOptions, createCurrentPlanQueryOptions } =
    useRankTrackerSubscriptionPlans();
  const { createSessionPortal, createCheckoutSession } = useRankTrackerStripe();
  const { handle401Error } = useErrorHandler();

  const {
    data: plans,
    isLoading: plansIsLoading,
    error: plansError,
  } = useQuery(createSubscriptionPlansQueryOptions());

  const {
    data: currentPlan,
    isLoading: currentPlanIsLoading,
    error: currentPlanError,
  } = useQuery(createCurrentPlanQueryOptions());

  const { mutate, isPending } = useMutation({
    mutationFn: createSessionPortal,
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error: RequestAxiosError) => {
      handle401Error(error);
      toast.error(getErrorMessage(error));
    },
  });

  const { mutate: createCheckout, isPending: createCheckoutIsPending } =
    useMutation({
      mutationFn: createCheckoutSession,
      onSuccess: (data) => {
        window.location.href = data.sessionUrl;
      },
      onError: (error: RequestAxiosError) => {
        handle401Error(error);
        toast.error(getErrorMessage(error));
      },
    });

  useEffect(() => {
    if (plansError) {
      handle401Error(plansError as AxiosError);
      return;
    }
    if (currentPlanError) {
      handle401Error(currentPlanError as AxiosError);
    }
  }, [plansError, currentPlanError]);

  if (plansIsLoading || currentPlanIsLoading)
    return (
      <div className={"bg-gray-100 rounded-md p-4 pt-4"}>
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  if (currentPlan) {
    return (
      <div className={"bg-gray-100 rounded-md p-4 flex items-center"}>
        <p className={"mr-4"}>
          Current plan: <strong>Pro</strong>
        </p>
        <Button size={"sm"} onClick={() => mutate()} loading={isPending}>
          Manage subscription
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className={"text-2xl font-semibold"}>
        Choose your plan to unlock all Rank Tracker features
      </h2>
      <div className={"mt-8 flex gap-x-16"}>
        {plans?.map((plan) => (
          <SubscriptionPlan
            key={plan.subscriptionId}
            title={plan.name}
            price={plan.amount}
            isLoading={createCheckoutIsPending}
            onChoosePlan={() => createCheckout(plan.subscriptionId)}
            features={[
              `Max Keywords: ${plan.maxKeywordsQty}`,
              `Max Searched Pages: ${plan.maxSearchedPages}`,
              "Domains: unlimited",
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default RtSubscriptionPlans;
