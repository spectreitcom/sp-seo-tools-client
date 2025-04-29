import axiosInstance from "../../../axios";
import {
  AddCompetitorPayload,
  Analysis,
  AnalysisDetails,
  AnalysisUsage,
  CreateAnalysisPayload,
} from "../types";
import { queryOptions } from "@tanstack/react-query";
import { useAuth } from "../../auth";
import { CollectionData } from "../../shared";

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
