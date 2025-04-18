import { useAuth } from "./use-auth.tsx";
import axiosInstance from "../axios.ts";
import { queryOptions } from "@tanstack/react-query";

type ExpiresAt = {
  value: number;
};

export type RtUserTestingModeInfoResponse = {
  isActive: boolean;
  canActivate: boolean;
  expiresAt: ExpiresAt | null;
};

export function useRtTestingMode() {
  const { getAccessToken } = useAuth();

  const retrieveUserTestingModeInfoFn = async () => {
    const response = await axiosInstance.get<RtUserTestingModeInfoResponse>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/testing-mode/user-info`,
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
      `${import.meta.env.VITE_API_URL}/rank-tracker/testing-mode/activate`,
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
