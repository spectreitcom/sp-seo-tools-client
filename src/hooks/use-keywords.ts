import { useAuth } from "./use-auth.ts";
import { queryOptions } from "@tanstack/react-query";
import { CollectionData } from "../types";
import axiosInstance from "../axios.ts";

export type KeywordGrowth = "UP" | "DOWN" | "NO_CHANGE";

export type Keyword = {
  keywordId: string;
  keywordText: string;
  lastIndexedPosition: number;
  localizationCountryCode: string;
  device: string;
  domain: string;
  localizationCountryName: string;
  deviceName: string;
  growth: KeywordGrowth;
};

export type AvailableKeywordsQuantity = {
  maxKeywordsQuantity: number;
  usedKeywordsQuantity: number;
  exceeded: boolean;
};

export type CreateKeywordPayload = {
  domainId: string;
  text: string;
  device: string;
  localizationId: string;
};

export function useKeywords() {
  const { getAccessToken } = useAuth();

  const retrieveKeywordsFn = async (
    page: number,
    searchText: string,
    device: string,
    domainId: string,
    take: number,
    localizationId: string,
  ) => {
    const response = await axiosInstance.get<CollectionData<Keyword>>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/keywords`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        params: {
          page,
          searchText,
          device,
          domainId,
          take,
          localizationId,
        },
      },
    );
    return response.data;
  };

  const addKeywordFn = async (payload: CreateKeywordPayload) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/rank-tracker/keywords`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const deleteKeywordFn = async (keywordId: string) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_URL}/rank-tracker/keywords/${keywordId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const retrieveAvailableKeywordsQuantityFn = async () => {
    const response = await axiosInstance.get<AvailableKeywordsQuantity>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/keywords/available-quantity`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const retrieveKeywordFn = async (keywordId: string) => {
    const response = await axiosInstance.get<Keyword>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/keywords/${keywordId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createKeywordsQueryOptions = (
    page = 1,
    searchText = "",
    device = "",
    domainId = "",
    take = 30,
    localizationId = "",
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () =>
        retrieveKeywordsFn(
          page,
          searchText,
          device,
          domainId,
          take,
          localizationId,
        ),
      queryKey: [
        "keywords",
        page,
        searchText,
        device,
        domainId,
        take,
        localizationId,
      ],
      refetchInterval,
    });

  const createAvailableKeywordsQuantityQueryOptions = (
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: retrieveAvailableKeywordsQuantityFn,
      queryKey: ["availableKeywordsQuantity"],
      refetchInterval,
      enabled,
    });

  const createKeywordQueryOptions = (
    keywordId: string,
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () => retrieveKeywordFn(keywordId),
      queryKey: ["keyword", keywordId],
      refetchInterval,
      enabled,
    });

  return {
    createKeywordsQueryOptions,
    addKeywordFn,
    deleteKeywordFn,
    createAvailableKeywordsQuantityQueryOptions,
    createKeywordQueryOptions,
  };
}
