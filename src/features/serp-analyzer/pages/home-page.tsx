import { ErrorBoundary } from "../../shared";
import SaTestingModeBanner from "../components/testing-mode-banner.tsx";
import SaSubscriptionPlans from "../components/subscription-plans.tsx";
import SaQuickMenu from "../components/quick-menu.tsx";

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
