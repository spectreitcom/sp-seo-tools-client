import { useAuth } from "./use-auth.tsx";
import { CollectionData } from "../types";
import { queryOptions } from "@tanstack/react-query";
import axiosInstance from "../axios.ts";

export type Domain = {
  domainId: string;
  domain: string;
  keywordsCount: number;
};

export function useDomains() {
  const { getAccessToken } = useAuth();

  const retrieveDomainsFn = async (
    page: number,
    searchText: string,
    take: number,
  ) => {
    const response = await axiosInstance.get<CollectionData<Domain>>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/domains`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        params: {
          page,
          searchText,
          take,
        },
      },
    );

    return response.data;
  };

  const addDomainFn = async (domain: string) => {
    const response = await axiosInstance.post<{ domain: string }>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/domains`,
      { domain },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const removeDomainFn = async (domainId: string) => {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_API_URL}/rank-tracker/domains/${domainId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const retrieveDomainFn = async (domainId: string) => {
    const response = await axiosInstance.get<Domain>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/domains/${domainId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createDomainsQueryOptions = (
    page = 1,
    searchText = "",
    take = 30,
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () => retrieveDomainsFn(page, searchText, take),
      queryKey: ["domains", page, searchText, take],
      refetchInterval,
      enabled,
    });

  const createDomainQueryOptions = (
    domainId = "",
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () => retrieveDomainFn(domainId),
      queryKey: ["domain", domainId],
      refetchInterval,
      enabled,
    });

  return {
    createDomainsQueryOptions,
    addDomainFn,
    removeDomainFn,
    createDomainQueryOptions,
  };
}
