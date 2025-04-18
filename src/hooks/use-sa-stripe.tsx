import { useAuth } from "./use-auth.tsx";
import axiosInstance from "../axios.ts";

export type CreateCheckoutSessionResponse = {
  sessionUrl: string;
};

export type CreateSessionPortalResponse = {
  url: string;
};

export const useSaStripe = () => {
  const { getAccessToken } = useAuth();

  const createCheckoutSession = async (subscriptionId: string) => {
    const response = await axiosInstance.post<CreateCheckoutSessionResponse>(
      `${import.meta.env.VITE_API_URL}/serp-analyzer-payments/create-checkout-session`,
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
      `${import.meta.env.VITE_API_URL}/serp-analyzer-payments/create-session-portal`,
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
