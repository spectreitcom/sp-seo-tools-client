import { createBrowserRouter } from "react-router";
import DashboardPage from "./pages/dashboard-page.tsx";
import SignInPage from "./pages/sign-in-page.tsx";
import AppLayout from "./layouts/app.layout.tsx";
import { ProtectedRoute } from "./components/protected-route.tsx";
import RtHomePage from "./pages/rank-tracker/rt-home-page.tsx";
import RtLayout from "./layouts/rt-layout.tsx";
import RtSuccessPage from "./pages/rank-tracker/rt-success-page.tsx";
import RtDomainsPage from "./pages/rank-tracker/rt-domains-page.tsx";
import RtKeywordsPage from "./pages/rank-tracker/rt-keywords-page.tsx";
import RtKeywordDetailsPage from "./pages/rank-tracker/rt-keyword-details-page.tsx";
import SaHomePage from "./pages/serp-analyzer/sa-home-page.tsx";

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
        element: <DashboardPage />,
        index: true,
      },
      {
        path: "rank-tracker",
        element: <RtLayout />,
        children: [
          {
            path: "",
            element: <RtHomePage />,
          },
          {
            path: "success",
            element: <RtSuccessPage />,
          },
          {
            path: "domains",
            element: <RtDomainsPage />,
          },
          {
            path: "keywords",
            element: <RtKeywordsPage />,
          },
          {
            path: "keywords/:keywordId",
            element: <RtKeywordDetailsPage />,
          },
        ],
      },
      {
        path: "serp-analyzer",
        element: <RtLayout />,
        children: [
          {
            path: "",
            element: <SaHomePage />,
          },
        ],
      },
    ],
  },
  {
    path: "sign-in",
    element: <SignInPage />,
  },
]);

export default router;
