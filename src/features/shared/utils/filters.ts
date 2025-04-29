/**
 * Parses a string value to an integer page number
 * 
 * @param {string | null} currentPage - The page number as a string, typically from URL query parameters
 * @param {number} defaultValue - The default page number to return if parsing fails, defaults to 1
 * @returns {number} The parsed page number or the default value
 * 
 * @example
 * // Returns 5
 * getPageValue("5");
 * 
 * @example
 * // Returns 1 (default value)
 * getPageValue(null);
 * 
 * @example
 * // Returns 1 (default value)
 * getPageValue("not-a-number");
 */
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

/**
 * Returns a filter value or a default value if the filter is null or undefined
 * 
 * @param {string | null} filter - The filter value, typically from URL query parameters
 * @param {string} defaultValue - The default value to return if filter is null or undefined, defaults to empty string
 * @returns {string} The filter value or the default value
 * 
 * @example
 * // Returns "active"
 * getFilterValue("active");
 * 
 * @example
 * // Returns "" (default value)
 * getFilterValue(null);
 * 
 * @example
 * // Returns "all"
 * getFilterValue(null, "all");
 */
export function getFilterValue(filter: string | null, defaultValue = "") {
  if (!filter) {
    return defaultValue;
  }
  return filter;
}
