import { useSearchParams } from "react-router";
import { getFilterValue, getPageValue } from "../utils/filters.ts";

enum FilterKey {
  SEARCH_TEXT = "searchText",
  PAGE = "page",
  DOMAIN_ID = "domainId",
  DEVICE = "device",
  SEARCH_ENGINE_ID = "searchEngineId",
}

export function useKeywordsFilters() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    searchText: "",
    device: "",
    searchEngineId: "",
    domainId: "",
  });

  const getSearchText = () => {
    const searchText = searchParams.get(FilterKey.SEARCH_TEXT);
    return getFilterValue(searchText);
  };

  const updateSearchText = (searchText: string) => {
    searchParams.set(FilterKey.SEARCH_TEXT, searchText);
  };

  const commit = () => {
    setSearchParams(searchParams);
  };

  const getPage = () => {
    const page = searchParams.get(FilterKey.PAGE);
    return getPageValue(page);
  };

  const updatePage = (page: number) => {
    searchParams.set(FilterKey.PAGE, page.toString());
  };

  const getDomainId = () => {
    const domainId = searchParams.get(FilterKey.DOMAIN_ID);
    return getFilterValue(domainId);
  };

  const updateDomainId = (domainId: string) => {
    searchParams.set(FilterKey.DOMAIN_ID, domainId);
  };

  const getDevice = () => {
    const device = searchParams.get(FilterKey.DEVICE);
    return getFilterValue(device);
  };

  const updateDevice = (device: string) => {
    searchParams.set(FilterKey.DEVICE, device);
  };

  const getSearchEngineId = () => {
    const searchEngineId = searchParams.get(FilterKey.SEARCH_ENGINE_ID);
    return getFilterValue(searchEngineId);
  };

  const updateSearchEngineId = (searchEngineId: string) => {
    searchParams.set(FilterKey.SEARCH_ENGINE_ID, searchEngineId);
  };

  const reset = () => {
    searchParams.set(FilterKey.SEARCH_TEXT, "");
    searchParams.set(FilterKey.PAGE, "1");
    searchParams.set(FilterKey.DEVICE, "");
    searchParams.set(FilterKey.SEARCH_ENGINE_ID, "");
    searchParams.set(FilterKey.DOMAIN_ID, "");
  };

  return {
    commit,
    updateSearchText,
    getSearchText,
    getPage,
    updatePage,
    reset,
    getDevice,
    updateDevice,
    getSearchEngineId,
    updateSearchEngineId,
    getDomainId,
    updateDomainId,
  };
}
