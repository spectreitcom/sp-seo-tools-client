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

export type AnalysisUsage = {
  monthlyLimit: number;
  usedQuota: number;
};

export type CreateAnalysisPayload = {
  keyword: string;
  localizationId: string;
  device: string;
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

  const retrieveUsageFn = async () => {
    const response = await axiosInstance.get<AnalysisUsage>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/analysis/usage`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createAnalysisFn = async (payload: CreateAnalysisPayload) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/analysis`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createUsageQueryOptions = (
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveUsageFn,
      queryKey: ["analysisUsage"],
      refetchInterval,
      enabled,
    });

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
    createUsageQueryOptions,
    createAnalysisFn,
  };
}
