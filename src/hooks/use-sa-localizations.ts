import { useAuth } from "./use-auth.ts";
import { queryOptions } from "@tanstack/react-query";
import axiosInstance from "../axios.ts";

export type SaLocalization = {
  localizationId: string;
  countryCode: string;
  name: string;
};

export function useSaLocalizations() {
  const { getAccessToken } = useAuth();

  const retrieveLocalizationsFn = async () => {
    const response = await axiosInstance.get<SaLocalization[]>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/localizations`,
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
      queryKey: ["saLocalizations"],
      enabled,
      refetchInterval,
    });

  return {
    createLocalizationsQueryOptions,
  };
}
