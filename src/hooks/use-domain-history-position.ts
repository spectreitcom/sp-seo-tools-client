import axiosInstance from "../axios.ts";
import { useAuth } from "./use-auth.tsx";
import { queryOptions } from "@tanstack/react-query";
import { CollectionData } from "../types";

export type DomainPositionHistory = {
  domainPositionId: string;
  createdAt: string;
  position: number;
};

export function useDomainHistoryPosition() {
  const { getAccessToken } = useAuth();

  const retrieveDomainHistoryPositionFn = async (
    keywordId: string,
    fromDate: string | null,
    toDate: string | null,
    take: number,
    page: number,
  ) => {
    const response = await axiosInstance.get<
      CollectionData<DomainPositionHistory>
    >(
      `${import.meta.env.VITE_API_URL}/rank-tracker/domain-history-position/${keywordId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        params: {
          page,
          take,
          fromDate,
          toDate,
        },
      },
    );
    return response.data;
  };

  const createDomainHistoryPositionQueryOptions = (
    keywordId: string,
    fromDate: string | null,
    toDate: string | null,
    take: number,
    page: number,
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () =>
        retrieveDomainHistoryPositionFn(
          keywordId,
          fromDate,
          toDate,
          take,
          page,
        ),
      queryKey: [
        "domainHistoryPosition",
        keywordId,
        fromDate,
        toDate,
        take,
        page,
      ],
      enabled,
      refetchInterval,
    });

  const createDomainHistoryPositionChartQueryOptions = (
    keywordId: string,
    fromDate: string | null,
    toDate: string | null,
    take: number,
    page: number,
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () =>
        retrieveDomainHistoryPositionFn(
          keywordId,
          fromDate,
          toDate,
          take,
          page,
        ),
      queryKey: [
        "domainHistoryPositionChart",
        keywordId,
        fromDate,
        toDate,
        take,
        page,
      ],
      enabled,
      refetchInterval,
    });

  return {
    createDomainHistoryPositionQueryOptions,
    createDomainHistoryPositionChartQueryOptions,
  };
}
