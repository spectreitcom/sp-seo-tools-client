import SaTestingModeBanner from "../components/sa-testing-mode-banner.tsx";
import SaSubscriptionPlans from "../components/sa-subscription-plans.tsx";
import SaQuickMenu from "../components/sa-quick-menu.tsx";

function SaHomePage() {
  return (
    <div>
      <SaTestingModeBanner />
      <SaSubscriptionPlans />
      <SaQuickMenu className={"mt-8"} />
    </div>
  );
}

export default SaHomePage;
