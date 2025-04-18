import SaTestingModeBanner from "../../components/pages/sa-testing-mode-banner.tsx";
import SaSubscriptionPlans from "../../components/pages/sa-subscription-plans/sa-subscription-plans.tsx";

function SaHomePage() {
  return (
    <div>
      <SaTestingModeBanner />
      <SaSubscriptionPlans />
    </div>
  );
}

export default SaHomePage;
