import { useAuth } from "../../auth";
import axiosInstance from "../../../axios.ts";
import { RtSubscriptionPlan } from "../types";
import { queryOptions } from "@tanstack/react-query";

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
