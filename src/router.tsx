import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import AppLayout from "./features/shared/components/app.layout.tsx";
import { ProtectedRoute } from "./features/auth";
import Spinner from "./features/shared/components/loader/spinner.tsx";

const DashboardPage = lazy(
  () => import("./features/dashboard/pages/dashboard-page.tsx"),
);
const SignInPage = lazy(() => import("./features/auth/pages/sign-in-page.tsx"));
const RtHomePage = lazy(
  () => import("./features/rank-tracker/pages/rt-home-page.tsx"),
);
const RtLayout = lazy(
  () => import("./features/shared/components/simple-layout.tsx"),
);
const RtSuccessPage = lazy(
  () => import("./features/rank-tracker/pages/rt-success-page.tsx"),
);
const RtDomainsPage = lazy(
  () => import("./features/rank-tracker/pages/rt-domains-page.tsx"),
);
const RtKeywordsPage = lazy(
  () => import("./features/rank-tracker/pages/rt-keywords-page.tsx"),
);
const RtKeywordDetailsPage = lazy(
  () => import("./features/rank-tracker/pages/rt-keyword-details-page.tsx"),
);
const SaHomePage = lazy(
  () => import("./features/serp-analyzer/pages/sa-home-page.tsx"),
);
const SaSuccessPage = lazy(
  () => import("./features/serp-analyzer/pages/sa-success-page.tsx"),
);
const SaAnalysisPage = lazy(
  () => import("./features/serp-analyzer/pages/sa-analysis-page.tsx"),
);
const SaAnalysisDetailsPage = lazy(
  () => import("./features/serp-analyzer/pages/sa-analysis-details-page.tsx"),
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
            <RtLayout />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <RtHomePage />
              </Suspense>
            ),
          },
          {
            path: "success",
            element: (
              <Suspense fallback={<Spinner />}>
                <RtSuccessPage />
              </Suspense>
            ),
          },
          {
            path: "domains",
            element: (
              <Suspense fallback={<Spinner />}>
                <RtDomainsPage />
              </Suspense>
            ),
          },
          {
            path: "keywords",
            element: (
              <Suspense fallback={<Spinner />}>
                <RtKeywordsPage />
              </Suspense>
            ),
          },
          {
            path: "keywords/:keywordId",
            element: (
              <Suspense fallback={<Spinner />}>
                <RtKeywordDetailsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "serp-analyzer",
        element: (
          <Suspense fallback={<Spinner />}>
            <RtLayout />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <SaHomePage />
              </Suspense>
            ),
          },
          {
            path: "success",
            element: (
              <Suspense fallback={<Spinner />}>
                <SaSuccessPage />
              </Suspense>
            ),
          },
          {
            path: "analysis",
            element: (
              <Suspense fallback={<Spinner />}>
                <SaAnalysisPage />
              </Suspense>
            ),
          },
          {
            path: "analysis/:analysisId",
            element: (
              <Suspense fallback={<Spinner />}>
                <SaAnalysisDetailsPage />
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
      <Suspense fallback={<div>Loading...</div>}>
        <SignInPage />
      </Suspense>
    ),
  },
]);

export default router;
