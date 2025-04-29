import TestingModeBanner from "../components/testing-mode-banner.tsx";
import SubscriptionPlans from "../components/subscription-plans.tsx";
import QuickMenu from "../components/quick-menu.tsx";
import { ErrorBoundary } from "../../shared";

function HomePage() {
  return (
    <div>
      <ErrorBoundary>
        <TestingModeBanner className={"mb-4"} />
      </ErrorBoundary>
      <ErrorBoundary>
        <SubscriptionPlans />
      </ErrorBoundary>
      <ErrorBoundary>
        <QuickMenu className={"mt-8"} />
      </ErrorBoundary>
    </div>
  );
}

export default HomePage;
