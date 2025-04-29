import { useErrorHandler, useSaStripe, useSaSubscriptions } from "../../hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RequestAxiosError } from "../../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/get-error-message.ts";
import { useEffect } from "react";
import { AxiosError } from "axios";
import Spinner from "../ui/loader/spinner.tsx";
import CurrentSubscriptionBanner from "./current-subscription-banner.tsx";
import SubscriptionPlan from "./subscription-plan.tsx";

function SaSubscriptionPlans() {
  const { createSubscriptionPlansQueryOptions, createCurrentPlanQueryOptions } =
    useSaSubscriptions();
  const { handle401Error } = useErrorHandler();
  const { createCheckoutSession, createSessionPortal } = useSaStripe();

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

  const { mutate: createSession, isPending: createSessionIsPending } =
    useMutation({
      mutationFn: createSessionPortal,
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error: RequestAxiosError) => {
        handle401Error(error);
        toast.error(getErrorMessage(error));
      },
    });

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
      <div className={"rounded-md pt-4"}>
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  if (currentPlan) {
    return (
      <CurrentSubscriptionBanner
        planName={currentPlan.name}
        price={currentPlan.amount}
        onManageSubscription={() => createSession()}
        isLoading={createSessionIsPending}
      />
    );
  }

  return (
    <div>
      <h2 className={"text-2xl font-semibold"}>
        Choose a plan to unlock all features
      </h2>

      <div className={"flex gap-x-16 mt-8"}>
        {plans?.map((plan) => (
          <SubscriptionPlan
            key={plan.subscriptionId}
            title={plan.name}
            price={plan.amount}
            onChoosePlan={() => createCheckout(plan.subscriptionId)}
            isLoading={createCheckoutIsPending}
            features={[
              `Search results: top ${plan.searchedPages * 10}`,
              `Analysis per month: ${plan.analysisPerMonth}`,
              "All localizations",
              "All devices",
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default SaSubscriptionPlans;
