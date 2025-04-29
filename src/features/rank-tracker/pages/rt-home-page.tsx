import RtTestingModeBanner from "../components/rt-testing-mode-banner.tsx";
import RtSubscriptionPlans from "../components/rt-subscription-plans.tsx";
import RtQuickMenu from "../components/rt-quick-menu.tsx";
import { ErrorBoundary } from "../../shared";

function RtHomePage() {
  return (
    <div>
      <ErrorBoundary>
        <RtTestingModeBanner className={"mb-4"} />
      </ErrorBoundary>
      <ErrorBoundary>
        <RtSubscriptionPlans />
      </ErrorBoundary>
      <ErrorBoundary>
        <RtQuickMenu className={"mt-8"} />
      </ErrorBoundary>
    </div>
  );
}

export default RtHomePage;
