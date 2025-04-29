import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import AppLayout from "./layouts/app.layout.tsx";
import { ProtectedRoute } from "./components/protected-route.tsx";
import Spinner from "./components/ui/loader/spinner.tsx";

const DashboardPage = lazy(() => import("./pages/dashboard-page.tsx"));
const SignInPage = lazy(() => import("./pages/sign-in-page.tsx"));
const RtHomePage = lazy(() => import("./pages/rank-tracker/rt-home-page.tsx"));
const RtLayout = lazy(() => import("./layouts/rt-layout.tsx"));
const RtSuccessPage = lazy(
  () => import("./pages/rank-tracker/rt-success-page.tsx"),
);
const RtDomainsPage = lazy(
  () => import("./pages/rank-tracker/rt-domains-page.tsx"),
);
const RtKeywordsPage = lazy(
  () => import("./pages/rank-tracker/rt-keywords-page.tsx"),
);
const RtKeywordDetailsPage = lazy(
  () => import("./pages/rank-tracker/rt-keyword-details-page.tsx"),
);
const SaHomePage = lazy(() => import("./pages/serp-analyzer/sa-home-page.tsx"));
const SaSuccessPage = lazy(
  () => import("./pages/serp-analyzer/sa-success-page.tsx"),
);
const SaAnalysisPage = lazy(
  () => import("./pages/serp-analyzer/sa-analysis-page.tsx"),
);
const SaAnalysisDetailsPage = lazy(
  () => import("./pages/serp-analyzer/sa-analysis-details-page.tsx"),
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
