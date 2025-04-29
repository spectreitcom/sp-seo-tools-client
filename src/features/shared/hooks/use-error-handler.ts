import { AxiosError } from "axios";
import { useNavigate } from "react-router";

/**
 * A hook that provides error handling utilities for API requests
 * 
 * @returns {Object} An object containing error handling functions
 * @returns {Function} handle401Error - A function to handle 401 Unauthorized errors by redirecting to the sign-in page
 * 
 * @example
 * // In a component
 * const { handle401Error } = useErrorHandler();
 * 
 * // When making an API request
 * try {
 *   const data = await fetchData();
 *   // Process data
 * } catch (error) {
 *   handle401Error(error);
 *   // Handle other errors
 * }
 */
export function useErrorHandler() {
  const navigate = useNavigate();

  /**
   * Handles 401 Unauthorized errors by redirecting to the sign-in page
   * 
   * @param {AxiosError | null | undefined} error - The error object from an API request
   */
  const handle401Error = (error: AxiosError | null | undefined) => {
    if (error && error.status === 401) {
      navigate("/sign-in");
    }
  };

  return {
    handle401Error,
  };
}
