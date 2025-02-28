import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import router from "./router.tsx";
import { Toaster } from "react-hot-toast";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <StrictMode>
        <RouterProvider router={router} />
        <Toaster />
      </StrictMode>
    </GoogleOAuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
