import { useSearchParams } from "react-router";
import { getFilterValue, getPageValue } from "../../shared";

enum FilterKey {
  SEARCH_TEXT = "searchText",
  PAGE = "page",
}

export function useDomainsFilters() {
  const [searchParams, setSearchParams] = useSearchParams({
    searchText: "",
    page: "1",
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

  const reset = () => {
    searchParams.set(FilterKey.SEARCH_TEXT, "");
    searchParams.set(FilterKey.PAGE, "1");
  };

  const getPage = () => {
    const page = searchParams.get(FilterKey.PAGE);
    return getPageValue(page);
  };

  const updatePage = (page: number) => {
    searchParams.set(FilterKey.PAGE, page.toString());
  };

  return {
    getSearchText,
    updateSearchText,
    commit,
    reset,
    getPage,
    updatePage,
  };
}
