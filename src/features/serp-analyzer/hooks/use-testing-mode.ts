import { queryOptions } from "@tanstack/react-query";
import { useAuth } from "../../auth";
import axiosInstance from "../../../axios.ts";

type ExpiresAt = {
  value: number;
};

export type SaUserTestingModeInfoResponse = {
  isActive: boolean;
  canActivate: boolean;
  expiresAt: ExpiresAt | null;
};

export function useSaTestingMode() {
  const { getAccessToken } = useAuth();

  const retrieveUserTestingModeInfoFn = async () => {
    const response = await axiosInstance.get<SaUserTestingModeInfoResponse>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/testing-mode/user-info`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    return response.data;
  };

  const activateFn = async () => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/testing-mode/activate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    return response.data;
  };

  const createUserTestingModeQueryOptions = (
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveUserTestingModeInfoFn,
      queryKey: ["userTestingModeInfo"],
      refetchInterval,
      enabled,
    });

  return {
    activateFn,
    createUserTestingModeQueryOptions,
  };
}
