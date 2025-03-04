import { useAuth } from "./use-auth.tsx";
import axios from "axios";
import { CollectionData } from "../types";
import { queryOptions } from "@tanstack/react-query";

export type Domain = {
  domainId: string;
  domain: string;
  keywordsCount: number;
};

export function useDomains() {
  const { getAccessToken } = useAuth();

  const retrieveDomainsFn = async (page: number, searchText: string) => {
    const response = await axios.get<CollectionData<Domain>>(
      `${import.meta.env.VITE_API_URL}/rank-tracker/domains`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        params: {
          page,
          searchText,
        },
      },
    );

    return response.data;
  };

  const addDomainFn = async (domain: string) => {
    const response = await axios.post<{ domain: string }>(
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
    const response = await axios.delete(
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
    enabled = true,
    refetchInterval: false | number = false,
  ) =>
    queryOptions({
      queryFn: () => retrieveDomainsFn(page, searchText),
      queryKey: ["domains", page, searchText],
      refetchInterval,
      enabled,
    });

  return {
    createDomainsQueryOptions,
    addDomainFn,
    removeDomainFn,
  };
}
