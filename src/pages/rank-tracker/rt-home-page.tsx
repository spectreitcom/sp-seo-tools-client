import TestingModeBanner from "../../components/pages/testing-mode-banner.tsx";
import RtQuickMenu from "../../components/pages/rt-quick-menu.tsx";
import SubscriptionPlans from "../../components/pages/subscription-plans/subscription-plans.tsx";

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
