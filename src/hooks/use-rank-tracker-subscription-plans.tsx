import axios from "axios";
import { useAuth } from "./use-auth.tsx";
import { queryOptions } from "@tanstack/react-query";

export type SubscriptionPlan = {
  subscriptionId: string;
  name: string;
  amount: number;
  maxKeywordsQty: number;
  maxSearchedPages: number;
};

export const useRankTrackerSubscriptionPlans = () => {
  const { getAccessToken } = useAuth();

  const retrievePlansFn = async () => {
    const response = await axios.get<SubscriptionPlan[]>(
      `${import.meta.env.VITE_API_URL}/rank-tracker-subscription/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const retrieveCurrenPlanFn = async () => {
    const response = await axios.get<SubscriptionPlan>(
      `${import.meta.env.VITE_API_URL}/rank-tracker-subscription/current-plan`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    return response.data;
  };

  const createSubscriptionPlansQueryOptions = () =>
    queryOptions({
      queryFn: retrievePlansFn,
      queryKey: ["subscriptionPlans"],
    });

  const createCurrentPlanQueryOptions = (
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveCurrenPlanFn,
      queryKey: ["currentPlan"],
      refetchInterval,
    });

  return {
    createSubscriptionPlansQueryOptions,
    createCurrentPlanQueryOptions,
  };
};
