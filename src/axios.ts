import axios, { AxiosError } from "axios";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./utils/local-storage.ts";

const axiosInstance = axios.create();

const refreshTokenApi = async (token: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/user-auth/refresh-token`,
    { token },
  );
  return response.data;
};

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    await handleRefreshToken(error);
  },
);

export default axiosInstance;
