import { useAuth } from "./use-auth.tsx";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

export type RtDevice = { label: string; value: string };

export function useRtDevices() {
  const { getAccessToken } = useAuth();

  const retrieveDevicesFn = async () => {
    const response = await axios.get<RtDevice[]>(
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
