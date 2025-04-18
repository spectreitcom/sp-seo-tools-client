import { useAuth } from "./use-auth.tsx";
import { queryOptions } from "@tanstack/react-query";
import axiosInstance from "../axios.ts";

export type RtSubscriptionPlan = {
  subscriptionId: string;
  name: string;
  amount: number;
  maxKeywordsQty: number;
  maxSearchedPages: number;
};

export const useRankTrackerSubscriptionPlans = () => {
  const { getAccessToken } = useAuth();

  const retrievePlansFn = async () => {
    const response = await axiosInstance.get<RtSubscriptionPlan[]>(
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
    const response = await axiosInstance.get<RtSubscriptionPlan>(
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
      queryKey: ["rtSubscriptionPlans"],
    });

  const createCurrentPlanQueryOptions = (
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveCurrenPlanFn,
      queryKey: ["rtCurrentPlan"],
      refetchInterval,
    });

  return {
    createSubscriptionPlansQueryOptions,
    createCurrentPlanQueryOptions,
  };
};
