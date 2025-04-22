import { useAuth } from "./use-auth.ts";
import axiosInstance from "../axios.ts";
import { CollectionData } from "../types";
import { queryOptions } from "@tanstack/react-query";

export type Analysis = {
  analysisId: string;
  userId: string;
  deviceName: string;
  progress: number;
  localizationName: string;
  localizationCountryCode: string;
  phrase: string;
};

export function useAnalysis() {
  const { getAccessToken } = useAuth();

  const retrieveAnalysisFn = async (
    page: number,
    searchText: string,
    device: string,
    take: number,
    localizationId: string,
  ) => {
    const response = await axiosInstance.get<CollectionData<Analysis>>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/analysis`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        params: {
          page,
          searchText,
          device,
          take,
          localizationId,
        },
      },
    );
    return response.data;
  };

  const createAnalysisQueryOptions = (
    page = 1,
    searchText = "",
    device = "",
    take = 30,
    localizationId = "",
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () =>
        retrieveAnalysisFn(page, searchText, device, take, localizationId),
      queryKey: ["analysis", page, searchText, device, take, localizationId],
      refetchInterval,
    });

  return {
    createAnalysisQueryOptions,
  };
}
