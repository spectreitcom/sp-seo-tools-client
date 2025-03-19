import SubscriptionPlan from "./subscription-plan.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { AxiosError } from "axios";
import {
  useErrorHandler,
  useRankTrackerStripe,
  useRankTrackerSubscriptionPlans,
} from "../../../hooks";
import { RequestAxiosError } from "../../../types";
import { getErrorMessage } from "../../../utils/get-error-message.ts";
import Spinner from "../../ui/loader/spinner.tsx";
import Button from "../../ui/button.tsx";

function SubscriptionPlans() {
  const { createSubscriptionPlansQueryOptions, createCurrentPlanQueryOptions } =
    useRankTrackerSubscriptionPlans();

  const { createSessionPortal } = useRankTrackerStripe();

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

  useEffect(() => {
    if (plansError) {
      handle401Error(plansError as AxiosError);
      return;
    }
    if (currentPlanError) {
      handle401Error(currentPlanError as AxiosError);
      return;
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
    <div className={"bg-gray-100 rounded-md p-4 pt-8"}>
      <div className={"text-center"}>
        <h2 className={"text-2xl font-bold"}>
          Choose your plan to unlock all Rank Tracker features
        </h2>
      </div>
      <div className={"mt-4 flex flex-wrap"}>
        {plans?.map((plan) => (
          <SubscriptionPlan
            key={plan.subscriptionId}
            subscriptionId={plan.subscriptionId}
            maxKeywordsQty={plan.maxKeywordsQty}
            name={plan.name}
            price={plan.amount}
            maxSearchedPages={plan.maxSearchedPages}
          />
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;
