import { RequestAxiosError } from "../types";

export function getErrorMessage(error: RequestAxiosError) {
  return error.response?.data?.message ?? "Ups! Something went wrong";
}
