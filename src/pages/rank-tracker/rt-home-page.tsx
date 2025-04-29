import RtTestingModeBanner from "../../components/pages/rt-testing-mode-banner.tsx";
import RtQuickMenu from "../../components/pages/rt-quick-menu.tsx";
import RtSubscriptionPlans from "../../components/pages/rt-subscription-plans.tsx";

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
