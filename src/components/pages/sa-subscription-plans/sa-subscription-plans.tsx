import SubscriptionPlan from "../subscription-plan.tsx";
import { useErrorHandler, useSaSubscriptions } from "../../../hooks";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/loader/spinner.tsx";
import { useEffect } from "react";
import { AxiosError } from "axios";
import CurrentSubscriptionBanner from "../current-subscription-banner.tsx";

function SaSubscriptionPlans() {
  const { createSubscriptionPlansQueryOptions, createCurrentPlanQueryOptions } =
    useSaSubscriptions();
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
      <div className={"rounded-md pt-4"}>
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  if (currentPlan) {
    return (
      <CurrentSubscriptionBanner
        planName={currentPlan.name}
        price={currentPlan.amount}
        onManageSubscription={() => {}}
        isLoading={false}
      />
    );
  }

  return (
    <div className={"mt-8"}>
      <h2 className={"text-2xl font-semibold"}>
        Choose a plan to unlock all features
      </h2>

      <div className={"flex gap-x-16 mt-8"}>
        {plans?.map((plan) => (
          <SubscriptionPlan
            key={plan.subscriptionId}
            title={plan.name}
            price={plan.amount}
            onChoosePlan={() => {}}
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
