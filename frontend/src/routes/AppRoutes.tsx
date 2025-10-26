import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ConditionalLayout from "../components/layouts/ConditionalLayout";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { ROUTES } from "./routeConfig";
import { getToken, getUser } from "../utils/tokenUtils";

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Landing page
const LandingPage = React.lazy(() => import("../pages/User/Landing/LandingPage"));

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* User Routes with Conditional Layout */}
        <Route path="/" element={<ConditionalLayout />}>
          {/* Landing page with redirect logic */}
          <Route
            index
            element={
              getUser() && getToken() ? (
                <Navigate to={ROUTES.USER.HOME} replace />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* All user routes */}
          {UserRoutes()}
        </Route>

        {/* Admin Routes */}
        {AdminRoutes()}

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.USER.LANDING} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;