import SubscriptionPlans from "../../components/subscription-plans/subscription-plans.tsx";
import TestingModeBanner from "../../components/testing-mode-banner.tsx";

function RtHomePage() {
  return (
    <div>
      <TestingModeBanner className={"mb-4"} />
      <SubscriptionPlans />
    </div>
  );
}

export default RtHomePage;
