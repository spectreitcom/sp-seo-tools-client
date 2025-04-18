import RtTestingModeBanner from "../../components/pages/rt-testing-mode-banner.tsx";
import RtQuickMenu from "../../components/pages/rt-quick-menu.tsx";
import SubscriptionPlans from "../../components/pages/subscription-plans/subscription-plans.tsx";

function RtHomePage() {
  return (
    <div>
      <RtTestingModeBanner className={"mb-4"} />
      <SubscriptionPlans />
      <RtQuickMenu className={"mt-8"} />
    </div>
  );
}

export default RtHomePage;
