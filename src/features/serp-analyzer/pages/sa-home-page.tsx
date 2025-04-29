import SaTestingModeBanner from "../components/sa-testing-mode-banner.tsx";
import SaSubscriptionPlans from "../components/sa-subscription-plans.tsx";
import SaQuickMenu from "../components/sa-quick-menu.tsx";
import { ErrorBoundary } from "../../shared";

function SaHomePage() {
  return (
    <div>
      <ErrorBoundary>
        <SaTestingModeBanner />
      </ErrorBoundary>
      <ErrorBoundary>
        <SaSubscriptionPlans />
      </ErrorBoundary>
      <ErrorBoundary>
        <SaQuickMenu className={"mt-8"} />
      </ErrorBoundary>
    </div>
  );
}

export default SaHomePage;
