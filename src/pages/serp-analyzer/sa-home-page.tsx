import SaTestingModeBanner from "../../components/pages/sa-testing-mode-banner.tsx";
import SaSubscriptionPlans from "../../components/pages/sa-subscription-plans.tsx";
import SaQuickMenu from "../../components/pages/sa-quick-menu.tsx";

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
