import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/components/loader/loader.tsx";
import { useAuth } from "../hooks/use-auth.ts";

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { createCurrentUserQueryOptions } = useAuth();
  const { data: currentUser, isPending } = useQuery(
    createCurrentUserQueryOptions(),
  );

  if (isPending) return <Loader active text={"Please wait..."} />;

  if (!isPending && !currentUser) return <Navigate to={"/sign-in"} replace />;

  return children;
};
