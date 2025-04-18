import { useAuth } from "./use-auth.ts";
import axiosInstance from "../axios.ts";

export type CreateSaCheckoutSessionResponse = {
  sessionUrl: string;
};

export type CreateSaSessionPortalResponse = {
  url: string;
};

export function useSaStripe() {
  const { getAccessToken } = useAuth();

  const createCheckoutSession = async (subscriptionId: string) => {
    const response = await axiosInstance.post<CreateSaCheckoutSessionResponse>(
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
    const response = await axiosInstance.post<CreateSaSessionPortalResponse>(
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
}
