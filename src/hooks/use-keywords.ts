import { useAuth } from "./use-auth.tsx";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";
import { CollectionData } from "../types";

export type Keyword = {
  keywordId: string;
  keywordText: string;
  lastIndexedPosition: number;
  localizationCountryCode: string;
  searchEngineName: string;
  device: string;
  domain: string;
  localizationCountryName: string;
  deviceName: string;
};

export type CreateKeywordPayload = {
  domainId: string;
  text: string;
  searchEngineId: string;
  device: string;
  localizationId: string;
};

export function useKeywords() {
  const { getAccessToken } = useAuth();

  const retrieveDomainsFn = async (
    page: number,
    searchText: string,
    device: string,
    searchEngineId: string,
    domainId: string,
  ) => {
    const response = await axios.get<CollectionData<Keyword>>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/keywords`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        params: {
          page,
          searchText,
          device,
          searchEngineId,
          domainId,
        },
      },
    );
    return response.data;
  };

  const addKeywordFn = async (payload: CreateKeywordPayload) => {
    const response = await axios.post(
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
    const response = await axios.delete(
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
    searchEngineId = "",
    domainId = "",
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () =>
        retrieveDomainsFn(page, searchText, device, searchEngineId, domainId),
      queryKey: [
        "keywords",
        page,
        searchText,
        device,
        searchEngineId,
        domainId,
      ],
      refetchInterval,
    });

  return {
    createKeywordsQueryOptions,
    addKeywordFn,
    deleteKeywordFn,
  };
}
