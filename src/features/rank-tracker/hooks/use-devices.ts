import { useAuth } from "../../auth";
import axiosInstance from "../../../axios.ts";
import { RtDevice } from "../types";
import { queryOptions } from "@tanstack/react-query";

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
