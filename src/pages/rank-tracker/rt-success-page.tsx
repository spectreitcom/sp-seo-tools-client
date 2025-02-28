import Spinner from "../../components/loader/spinner.tsx";
import { useRankTrackerSubscriptionPlans } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

function RtSuccessPage() {
  const { createCurrentPlanQueryOptions } = useRankTrackerSubscriptionPlans();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    navigate("/rank-tracker");
  }

  const { data: currentPlan } = useQuery(createCurrentPlanQueryOptions(3000));

  useEffect(() => {
    if (currentPlan) {
      navigate("/rank-tracker");
    }
  }, [currentPlan]);

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
