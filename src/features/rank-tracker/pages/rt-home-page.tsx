import RtTestingModeBanner from "../components/rt-testing-mode-banner.tsx";
import RtSubscriptionPlans from "../components/rt-subscription-plans.tsx";
import RtQuickMenu from "../components/rt-quick-menu.tsx";

function RtHomePage() {
  return (
    <div>
      <RtTestingModeBanner className={"mb-4"} />
      <RtSubscriptionPlans />
      <RtQuickMenu className={"mt-8"} />
    </div>
  );
}

export default RtHomePage;
