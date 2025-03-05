export function getPageValue(currentPage: string | null, defaultValue = 1) {
  if (!currentPage) {
    return defaultValue;
  }
  const pageNumber = parseInt(currentPage);
  if (isNaN(pageNumber)) {
    return defaultValue;
  }
  return pageNumber;
}

export function getFilterValue(filter: string | null, defaultValue = "") {
  if (!filter) {
    return defaultValue;
  }
  return filter;
}
