import { RequestAxiosError } from "../types";

/**
 * Extracts a human-readable error message from an Axios error response
 * 
 * @param {RequestAxiosError} error - The Axios error object from a failed request
 * @returns {string} The error message from the response, or a default message if not available
 * 
 * @example
 * // Assuming error.response.data.message exists
 * // Returns "Invalid credentials"
 * getErrorMessage(error);
 * 
 * @example
 * // Assuming error.response.data.message doesn't exist
 * // Returns "Ups! Something went wrong"
 * getErrorMessage(error);
 */
export function getErrorMessage(error: RequestAxiosError) {
  return error.response?.data?.message ?? "Ups! Something went wrong";
}
