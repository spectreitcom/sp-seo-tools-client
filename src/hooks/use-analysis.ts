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
  hasError: boolean;
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

export type PageData = {
  pageId: string;
  url: string;
  position: number;
  factors: Record<string, number>;
  hasError: boolean;
};

export type FactorsCollection = {
  label: string;
  factors: { label: string; key: string }[];
}[];

export type AnalysisDetails = {
  analysisId: string;
  phrase: string;
  localizationName: string;
  localizationCountryCode: string;
  deviceName: string;
  pages: PageData[];
  factorsCollection: FactorsCollection;
};

export type AddCompetitorPayload = {
  analysisId: string;
  url: string;
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

  const retrieveAnalysisDetailsFn = async (analysisId: string) => {
    const response = await axiosInstance.get<AnalysisDetails>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/analysis/${analysisId}`,
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

  const addCompetitorFn = async (payload: AddCompetitorPayload) => {
    const response = await axiosInstance.post<void>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/analysis/${payload.analysisId}/add-competitor`,
      { url: payload.url },
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

  const createAnalysisDetailsQueryOptions = (
    analysisId: string,
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () => retrieveAnalysisDetailsFn(analysisId),
      queryKey: ["analysisDetails", analysisId],
      enabled,
      refetchInterval,
    });

  return {
    createAnalysisQueryOptions,
    createUsageQueryOptions,
    createAnalysisFn,
    createAnalysisDetailsQueryOptions,
    addCompetitorFn,
  };
}
