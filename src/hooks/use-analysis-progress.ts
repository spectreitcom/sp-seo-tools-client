import { useAuth } from "./use-auth.ts";
import axiosInstance from "../axios.ts";
import { queryOptions } from "@tanstack/react-query";

export type AnalysisProgress = {
  progress: number;
};

export function useAnalysisProgress() {
  const { getAccessToken } = useAuth();

  const retrieveAnalysisProgressFn = async (analysisId: string) => {
    const response = await axiosInstance.get<AnalysisProgress>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer/analysis-progress/${analysisId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createAnalysisProgressQueryOptions = (
    analysisId: string,
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () => retrieveAnalysisProgressFn(analysisId),
      queryKey: ["analysisProgress", analysisId],
      enabled,
      refetchInterval,
    });

  return {
    createAnalysisProgressQueryOptions,
  };
}
