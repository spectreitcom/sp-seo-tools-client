import { useAuth } from "./use-auth.ts";
import { queryOptions } from "@tanstack/react-query";
import axiosInstance from "../axios.ts";

export type SaDevice = { label: string; value: string };

export function useSaDevices() {
  const { getAccessToken } = useAuth();

  const retrieveDevicesFn = async () => {
    const response = await axiosInstance.get<SaDevice[]>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/devices`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createDevicesQueryOptions = (
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveDevicesFn,
      queryKey: ["saDevices"],
      enabled,
      refetchInterval,
    });

  return {
    createDevicesQueryOptions,
  };
}
