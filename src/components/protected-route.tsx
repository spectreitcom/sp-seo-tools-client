import { ReactNode } from "react";
import { useAuth } from "../hooks";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loader from "./ui/loader/loader.tsx";

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
