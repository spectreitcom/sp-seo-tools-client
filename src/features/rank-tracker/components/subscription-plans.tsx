import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { AxiosError } from "axios";
import {
  getErrorMessage,
  RequestAxiosError,
  useErrorHandler,
} from "../../shared";
import Spinner from "../../shared/components/loader/spinner.tsx";
import SubscriptionPlan from "../../shared/components/subscription-plan.tsx";
import { useRankTrackerSubscriptionPlans } from "../hooks/use-subscription-plans.ts";
import { useRankTrackerStripe } from "../hooks/use-stripe.ts";
import CurrentSubscriptionBanner from "../../shared/components/current-subscription-banner.tsx";

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
  }, [plansError, currentPlanError, handle401Error]);

  if (plansIsLoading || currentPlanIsLoading)
    return (
      <div className={"bg-gray-100 rounded-md p-4 pt-4"}>
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  if (currentPlan) {
    return (
      <CurrentSubscriptionBanner
        planName={currentPlan.name}
        onManageSubscription={() => mutate()}
        price={currentPlan.amount}
        isLoading={isPending}
      />
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
