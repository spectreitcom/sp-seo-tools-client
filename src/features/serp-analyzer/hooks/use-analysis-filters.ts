import { useSearchParams } from "react-router";
import { getFilterValue, getPageValue } from "../../shared";

enum FilterKey {
  SEARCH_TEXT = "searchText",
  PAGE = "page",
  DEVICE = "device",
  LOCALIZATION_ID = "localizationId",
}

export function useAnalysisFilters() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    searchText: "",
    device: "",
    localizationId: "",
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

  const getDevice = () => {
    const device = searchParams.get(FilterKey.DEVICE);
    return getFilterValue(device);
  };

  const updateDevice = (device: string) => {
    searchParams.set(FilterKey.DEVICE, device);
  };

  const getLocalizationId = () => {
    const localizationId = searchParams.get(FilterKey.LOCALIZATION_ID);
    return getFilterValue(localizationId);
  };

  const updateLocalizationId = (localizationId: string) => {
    searchParams.set(FilterKey.LOCALIZATION_ID, localizationId);
  };

  const reset = () => {
    searchParams.set(FilterKey.SEARCH_TEXT, "");
    searchParams.set(FilterKey.PAGE, "1");
    searchParams.set(FilterKey.DEVICE, "");
    searchParams.set(FilterKey.LOCALIZATION_ID, "");
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
    getLocalizationId,
    updateLocalizationId,
  };
}
