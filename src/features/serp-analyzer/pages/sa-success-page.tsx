import { useSaSubscriptions } from "../hooks/use-sa-subscriptions.ts";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";
import Spinner from "../../shared/components/loader/spinner.tsx";
import { useErrorHandler } from "../../shared";

function SaSuccessPage() {
  const { createCurrentPlanQueryOptions } = useSaSubscriptions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handle401Error } = useErrorHandler();

  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    navigate("/serp-analyzer");
  }

  const { data: currentPlan, error } = useQuery(
    createCurrentPlanQueryOptions(3000),
  );

  useEffect(() => {
    if (error) {
      handle401Error(error as AxiosError);
    }
  }, [error, handle401Error]);

  useEffect(() => {
    if (currentPlan) {
      navigate("/serp-analyzer");
    }
  }, [currentPlan, navigate]);

  return (
    <div>
      <div className={"text-center"}>
        <h1 className={"text-2xl"}>Thank you for you trust!</h1>
      </div>
      <div className={"text-center mt-8"}>
        Please wait... We are checking your payment
      </div>
      <div className={"mt-8 flex justify-center"}>
        <Spinner />
      </div>
    </div>
  );
}

export default SaSuccessPage;
