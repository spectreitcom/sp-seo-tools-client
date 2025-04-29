import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useErrorHandler } from "../../shared";
import Spinner from "../../shared/components/loader/spinner.tsx";
import { useRankTrackerSubscriptionPlans } from "../hooks/use-subscription-plans.ts";

function RtSuccessPage() {
  const { createCurrentPlanQueryOptions } = useRankTrackerSubscriptionPlans();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handle401Error } = useErrorHandler();

  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    navigate("/rank-tracker");
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
      navigate("/rank-tracker");
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

export default RtSuccessPage;
