import { useAuth } from "./use-auth.tsx";
import { queryOptions } from "@tanstack/react-query";
import axiosInstance from "../axios.ts";

export type RtDevice = { label: string; value: string };

export function useRtDevices() {
  const { getAccessToken } = useAuth();

  const retrieveDevicesFn = async () => {
    const response = await axiosInstance.get<RtDevice[]>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/devices`,
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
      queryKey: ["rtDevices"],
      enabled,
      refetchInterval,
    });

  return {
    createDevicesQueryOptions,
  };
}
