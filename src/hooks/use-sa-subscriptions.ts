import { useAuth } from "./use-auth.ts";
import axiosInstance from "../axios.ts";
import { queryOptions } from "@tanstack/react-query";

export type SaSubscriptionPlan = {
  subscriptionId: string;
  analysisPerMonth: number;
  searchedPages: number;
  amount: number;
  name: string;
};

export const useSaSubscriptions = () => {
  const { getAccessToken } = useAuth();

  const retrievePlansFn = async () => {
    const response = await axiosInstance.get<SaSubscriptionPlan[]>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer-subscription`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const retrieveCurrentPlanFn = async () => {
    const response = await axiosInstance.get<SaSubscriptionPlan>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer-subscription/current-plan`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createSubscriptionPlansQueryOptions = (
    refetchInterval: false | number = false,
    enabled = true,
  ) =>
    queryOptions({
      queryFn: retrievePlansFn,
      queryKey: ["saSubscriptionPlans"],
      refetchInterval,
      enabled,
    });

  const createCurrentPlanQueryOptions = (
    refetchInterval: false | number = false,
    enabled = true,
  ) =>
    queryOptions({
      queryFn: retrieveCurrentPlanFn,
      queryKey: ["saCurrentPlan"],
      refetchInterval,
      enabled,
    });

  return {
    createSubscriptionPlansQueryOptions,
    createCurrentPlanQueryOptions,
  };
};
