import React from "react";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { ROUTES } from "./routeConfig";

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import("../pages/User/Landing/LandingPage"));
const HomePage = React.lazy(() => import("../pages/User/HomePage"));
const LoginPage = React.lazy(() => import("../pages/User/Auth/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/User/Auth/RegisterPage"));
const VerifyOtpPage = React.lazy(() => import("../pages/User/Auth/VerifyOtpPage"));
const ForgotPasswordPage = React.lazy(() => import("../pages/User/Auth/ForgotPasswordPage"));
const ChangePasswordPage = React.lazy(() => import("../pages/User/Auth/ChangePasswordPage"));

export const UserRoutes = () => (
  <>
    {/* Public User Routes */}
    <Route element={<PublicRoute />}>
      <Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.USER.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.USER.VERIFY_OTP} element={<VerifyOtpPage />} />
      <Route path={ROUTES.USER.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.USER.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
    </Route>

    {/* Protected User Routes */}
    <Route element={<ProtectedRoute role="user" />}>
      <Route path={ROUTES.USER.HOME} element={<HomePage />} />
      {/* Add more protected routes here */}
    </Route>
  </>
);
