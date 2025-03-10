import { useAuth } from "./use-auth.tsx";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

export type RtLocalization = {
  localizationId: string;
  countryCode: string;
  name: string;
};

export function useRtLocalizations() {
  const { getAccessToken } = useAuth();

  const retrieveLocalizationsFn = async () => {
    const response = await axios.get<RtLocalization[]>(
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
