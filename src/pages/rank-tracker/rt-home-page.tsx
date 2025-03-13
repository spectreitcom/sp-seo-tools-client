import SubscriptionPlans from "../../components/subscription-plans/subscription-plans.tsx";
import TestingModeBanner from "../../components/testing-mode-banner.tsx";
import RtQuickMenu from "../../components/rt-quick-menu.tsx";

function RtHomePage() {
  return (
    <div>
      <TestingModeBanner className={"mb-4"} />
      <SubscriptionPlans />
      <RtQuickMenu className={"mt-8"} />
    </div>
  );
}

export default RtHomePage;
