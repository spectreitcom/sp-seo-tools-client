import axios from "axios";
import { queryOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export type AuthResponse = {
  accessToken: string;
};

export type CurrentUser = {
  email: string;
  picture: string | null;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const googleLoginFn = async (token: string) => {
    const response = await axios.post<AuthResponse>(
      `${import.meta.env.VITE_API_URL}/user-auth/google`,
      {
        token,
      },
    );
    localStorage.setItem("accessToken", response.data.accessToken);
  };

  const retrieveCurrentUser = async () => {
    const response = await axios.get<CurrentUser>(
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
    localStorage.removeItem("accessToken");
    navigate("/sign-in");
  };

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const createCurrentUserQueryOptions = () =>
    queryOptions({
      queryFn: retrieveCurrentUser,
      queryKey: ["currentUser"],
    });

  return {
    signOut,
    getAccessToken,
    createCurrentUserQueryOptions,
    googleLoginFn,
  };
};
