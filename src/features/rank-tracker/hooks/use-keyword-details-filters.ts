import { useSearchParams } from "react-router";
import { getFilterValue, getPageValue } from "../../shared";

enum FilterKey {
  PAGE = "page",
  FROM_DATE = "fromDate",
  TO_DATE = "toDate",
}

export function useKeywordDetailsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPage = () => {
    const page = searchParams.get(FilterKey.PAGE);
    return getPageValue(page);
  };

  const updatePage = (page: number) => {
    searchParams.set(FilterKey.PAGE, page.toString());
  };

  const commit = () => {
    setSearchParams(searchParams);
  };

  const getFromDate = () => {
    const fromDate = searchParams.get(FilterKey.FROM_DATE);
    return getFilterValue(fromDate);
  };

  const updateFromDate = (fromDate: string) => {
    searchParams.set(FilterKey.FROM_DATE, fromDate);
  };

  const getToDate = () => {
    const toDate = searchParams.get(FilterKey.TO_DATE);
    return getFilterValue(toDate);
  };

  const updateToDate = (toDate: string) => {
    searchParams.set(FilterKey.TO_DATE, toDate);
  };

  const reset = () => {
    searchParams.set(FilterKey.PAGE, "1");
    searchParams.set(FilterKey.FROM_DATE, "");
    searchParams.set(FilterKey.TO_DATE, "");
  };

  return {
    getPage,
    commit,
    updatePage,
    reset,
    getFromDate,
    updateFromDate,
    getToDate,
    updateToDate,
  };
}
