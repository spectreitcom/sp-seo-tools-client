import { useAuth } from "../../auth";
import axiosInstance from "../../../axios.ts";
import { RtLocalization } from "../types";
import { queryOptions } from "@tanstack/react-query";

export function useRtLocalizations() {
  const { getAccessToken } = useAuth();

  const retrieveLocalizationsFn = async () => {
    const response = await axiosInstance.get<RtLocalization[]>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/localizations`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createLocalizationsQueryOptions = (
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveLocalizationsFn,
      queryKey: ["rtLocalizations"],
      enabled,
      refetchInterval,
    });

  return {
    createLocalizationsQueryOptions,
  };
}
