import axios, { AxiosError } from "axios";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./features/shared";

/**
 * A configured Axios instance for making API requests
 * This instance includes interceptors for handling authentication token refresh
 */
const axiosInstance = axios.create();

/**
 * Calls the API to refresh an authentication token
 * 
 * @param {string} token - The refresh token to use for obtaining a new access token
 * @returns {Promise<{accessToken: string, refreshToken: string}>} The new access and refresh tokens
 */
const refreshTokenApi = async (token: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/user-auth/refresh-token`,
    { token },
  );
  return response.data;
};

/**
 * Handles 401 Unauthorized errors by attempting to refresh the authentication token
 * 
 * @param {AxiosError} error - The error from a failed API request
 * @returns {Promise<void>} A promise that resolves when token refresh is complete
 */
const handleRefreshToken = async (error: AxiosError) => {
  if (error.status === 401) {
    const currentRefreshToken = getRefreshToken();

    if (currentRefreshToken) {
      const { accessToken, refreshToken } =
        await refreshTokenApi(currentRefreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }
};

/**
 * Response interceptor that handles token refresh for 401 errors
 * 
 * This interceptor passes through successful responses unchanged,
 * but attempts to refresh the authentication token when a 401 error occurs
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    await handleRefreshToken(error);
  },
);

export default axiosInstance;
