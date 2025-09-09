import React, { Suspense, lazy, type ReactNode } from "react";
import GuestOnlyRoute from "./guest";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
// Lazy-loaded pages
const SignIn = lazy(() => import("../view/login"));
const Unauthorized = lazy(() => import("../components/unauthorized"));
const Dashboard = lazy(() => import("../view/dashboard"));
const Chatbot = lazy(() => import("../view/chatbot"));
const Profile = lazy(() => import("../view/profile"));
const Shopify = lazy(() => import("../view/shopify"));
const Amazon = lazy(() => import("../view/amazon"));
const AmazonDashboard = lazy(() => import("../view/amazon/amazoneDashboard"));
const ShopifyDashboard = lazy(() => import("../view/shopify/shopigyDashboard"));
const UploadFile = lazy(() => import("../view/uploadSheet"));
const ProductDetails = lazy(() => import("../view/dashboard/details"));
const RootLayout = lazy(() => import("../layout/RootLayout"));

// Fallback loader
const CenteredCircularProgress: React.FC = () => (
  <div className="loading-container">
    <CircularProgress />
  </div>
);

// Route item interface
export interface RouteItem {
  path: string;
  element: ReactNode;
  children?: RouteItem[];
}

export const RouteConfig = (): {
  routesForAuthenticatedOnly: RouteItem[];
  routesForNotAuthenticatedOnly: RouteItem[];
} => {
  const { sheetData, setSheetData } = useAuth();
  const routesForAuthenticatedOnly: RouteItem[] = [
    {
      path: "/",
      element: (
        <Suspense fallback={<CenteredCircularProgress />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        { path: "/dashboard", element: <Dashboard sheetData={sheetData} /> },
        { path: "/chatbot", element: <Chatbot /> },
        { path: "/profile", element: <Profile /> },
        { path: "/amazon", element: <Amazon /> },
        { path: "/amazon/dashboard", element: <AmazonDashboard /> },
        { path: "/shopify", element: <Shopify /> },
        { path: "/shopify/dashboard", element: <ShopifyDashboard /> },

        {
          path: "/upload",
          element: <UploadFile setSheetData={setSheetData} />,
        },
        {
          path: "/dashboard/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly: RouteItem[] = [
    {
      path: "/",
      element: (
        <Suspense fallback={<CenteredCircularProgress />}>
          <GuestOnlyRoute />
        </Suspense>
      ),
      children: [
        { path: "/login", element: <SignIn /> },
        { path: "*", element: <Unauthorized /> },
      ],
    },
  ];

  return {
    routesForAuthenticatedOnly,
    routesForNotAuthenticatedOnly,
  };
};
