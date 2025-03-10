import { useSearchParams } from "react-router";
import { getFilterValue, getPageValue } from "../utils/filters.ts";

enum FilterKey {
  SEARCH_TEXT = "searchText",
  PAGE = "page",
  DOMAIN_ID = "domainId",
  DEVICE = "device",
}

export function useKeywordsFilters() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    searchText: "",
    device: "",
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

  const reset = () => {
    searchParams.set(FilterKey.SEARCH_TEXT, "");
    searchParams.set(FilterKey.PAGE, "1");
    searchParams.set(FilterKey.DEVICE, "");
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
    getDomainId,
    updateDomainId,
  };
}
