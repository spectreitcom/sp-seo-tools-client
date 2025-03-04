import { useAuth } from "./use-auth.tsx";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

export type RtSearchEngine = {
  searchEngineId: string;
  name: string;
};

export function useRtSearchEngines() {
  const { getAccessToken } = useAuth();

  const retrieveSearchEnginesFn = async () => {
    const response = await axios.get<RtSearchEngine[]>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/search-engines`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createSearchEnginesQueryOptions = (
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveSearchEnginesFn,
      queryKey: ["rtSearchEngines"],
      refetchInterval,
      enabled,
    });

  return {
    createSearchEnginesQueryOptions,
  };
}
