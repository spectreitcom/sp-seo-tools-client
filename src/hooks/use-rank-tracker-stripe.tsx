import { useAuth } from "./use-auth.tsx";
import axiosInstance from "../axios.ts";

export type CreateCheckoutSessionResponse = {
  sessionUrl: string;
};

export type CreateSessionPortalResponse = {
  url: string;
};

export const useRankTrackerStripe = () => {
  const { getAccessToken } = useAuth();

  const createCheckoutSession = async (subscriptionId: string) => {
    const response = await axiosInstance.post<CreateCheckoutSessionResponse>(
      `${import.meta.env.VITE_API_URL}/rank-tracker-subscription/create-checkout-session`,
      {
        subscriptionId,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  const createSessionPortal = async () => {
    const response = await axiosInstance.post<CreateSessionPortalResponse>(
      `${import.meta.env.VITE_API_URL}/rank-tracker-subscription/create-session-portal`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  return {
    createCheckoutSession,
    createSessionPortal,
  };
};
