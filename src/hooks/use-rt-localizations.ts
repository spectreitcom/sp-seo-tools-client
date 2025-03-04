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

  const retrieveLocalizationsFn = async (searchEngineId: string) => {
    const response = await axios.get<RtLocalization[]>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/localizations/${searchEngineId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createLocalizationsQueryOptions = (
    searchEngineId: string,
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () => retrieveLocalizationsFn(searchEngineId),
      queryKey: ["rtLocalizations", searchEngineId],
      enabled,
      refetchInterval,
    });

  return {
    createLocalizationsQueryOptions,
  };
}
