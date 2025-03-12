import { queryOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axiosInstance from "../axios.ts";
import {
  getAccessToken as getAccessTokenFn,
  getRefreshToken as getRefreshTokenFn,
  removeRefreshToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/local-storage.ts";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type CurrentUser = {
  email: string;
  picture: string | null;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const googleLoginFn = async (token: string) => {
    const response = await axiosInstance.post<AuthResponse>(
      `${import.meta.env.VITE_API_URL}/user-auth/google`,
      {
        token,
      },
    );
    localStorage.setItem("accessToken", response.data.accessToken);
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
  };

  const retrieveCurrentUser = async () => {
    const response = await axiosInstance.get<CurrentUser>(
      `${import.meta.env.VITE_API_URL}/user-auth/me`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const signOut = () => {
    removeAccessToken();
    removeRefreshToken();
    navigate("/sign-in");
  };

  const getAccessToken = () => {
    return getAccessTokenFn();
  };

  const getRefreshToken = () => {
    return getRefreshTokenFn();
  };

  const createCurrentUserQueryOptions = () =>
    queryOptions({
      retry: 4,
      queryFn: retrieveCurrentUser,
      queryKey: ["currentUser"],
    });

  return {
    signOut,
    getAccessToken,
    createCurrentUserQueryOptions,
    googleLoginFn,
    getRefreshToken,
  };
};
