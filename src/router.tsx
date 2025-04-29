import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import AppLayout from "./features/shared/components/app.layout.tsx";
import { ProtectedRoute } from "./features/auth";
import Spinner from "./features/shared/components/loader/spinner.tsx";

const DashboardPage = lazy(
  () => import("./features/dashboard/pages/dashboard-page.tsx"),
);
const SignInPage = lazy(() => import("./features/auth/pages/sign-in-page.tsx"));
const RankTrackerHomePage = lazy(
  () => import("./features/rank-tracker/pages/home-page.tsx"),
);
const SimpleLayout = lazy(
  () => import("./features/shared/components/simple-layout.tsx"),
);
const RankTrackerSuccessPage = lazy(
  () => import("./features/rank-tracker/pages/success-page.tsx"),
);
const RankTrackerDomainsPage = lazy(
  () => import("./features/rank-tracker/pages/domains-page.tsx"),
);
const RankTrackerKeywordsPage = lazy(
  () => import("./features/rank-tracker/pages/keywords-page.tsx"),
);
const RankTrackerKeywordDetailsPage = lazy(
  () => import("./features/rank-tracker/pages/keyword-details-page.tsx"),
);
const SerpAnalyzerHomePage = lazy(
  () => import("./features/serp-analyzer/pages/home-page.tsx"),
);
const SerpAnalyzerSuccessPage = lazy(
  () => import("./features/serp-analyzer/pages/success-page.tsx"),
);
const SerpAnalyzerAnalysisPage = lazy(
  () => import("./features/serp-analyzer/pages/analysis-page.tsx"),
);
const SerpAnalyzerAnalysisDetailsPage = lazy(
  () => import("./features/serp-analyzer/pages/analysis-details-page.tsx"),
);

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardPage />
          </Suspense>
        ),
        index: true,
      },
      {
        path: "rank-tracker",
        element: (
          <Suspense fallback={<Spinner />}>
            <SimpleLayout />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <RankTrackerHomePage />
              </Suspense>
            ),
          },
          {
            path: "success",
            element: (
              <Suspense fallback={<Spinner />}>
                <RankTrackerSuccessPage />
              </Suspense>
            ),
          },
          {
            path: "domains",
            element: (
              <Suspense fallback={<Spinner />}>
                <RankTrackerDomainsPage />
              </Suspense>
            ),
          },
          {
            path: "keywords",
            element: (
              <Suspense fallback={<Spinner />}>
                <RankTrackerKeywordsPage />
              </Suspense>
            ),
          },
          {
            path: "keywords/:keywordId",
            element: (
              <Suspense fallback={<Spinner />}>
                <RankTrackerKeywordDetailsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "serp-analyzer",
        element: (
          <Suspense fallback={<Spinner />}>
            <SimpleLayout />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <SerpAnalyzerHomePage />
              </Suspense>
            ),
          },
          {
            path: "success",
            element: (
              <Suspense fallback={<Spinner />}>
                <SerpAnalyzerSuccessPage />
              </Suspense>
            ),
          },
          {
            path: "analysis",
            element: (
              <Suspense fallback={<Spinner />}>
                <SerpAnalyzerAnalysisPage />
              </Suspense>
            ),
          },
          {
            path: "analysis/:analysisId",
            element: (
              <Suspense fallback={<Spinner />}>
                <SerpAnalyzerAnalysisDetailsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "sign-in",
    element: (
      <Suspense fallback={<Spinner />}>
        <SignInPage />
      </Suspense>
    ),
  },
]);

export default router;
