import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// User pages
import LandingPage from "../pages/Landing/LandingPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import VerifyOtpPage from "../pages/Auth/VerifyOtpPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ChangePasswordPage from "../pages/Auth/ChangePasswordPage";

// Admin pages
import AdminLogin from "../pages/Admin/Auth/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserManagement from "../pages/Admin/UserManagement";

// Layouts & Route guards
import ConditionalLayout from "../components/layouts/ConditionalLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute, AdminPublicRoute } from "./PublicRoute";
import AdminLayout from "../components/layouts/admin/AdminLayout";

import { getToken, getUser, getAdmin } from "../utils/tokenUtils";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* ======================= */}
      {/* User Routes */}
      {/* ======================= */}
      <Route path="/" element={<ConditionalLayout />}>
        {/* Landing page */}
        <Route
          index
          element={
            getUser() && getToken() ? (
              <Navigate to="/home" replace />
            ) : (
              <LandingPage />
            )
          }
        />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute role="user" />}>
          <Route path="home" element={<HomePage />} />
          {/* Add more protected user routes here */}
        </Route>

        {/* Public User Routes */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>

      {/* ======================= */}
      {/* Admin Routes */}
      {/* ======================= */}
      <Route path="/admin">

        {/* Public admin routes */}
        <Route element={<AdminPublicRoute />}>
          <Route path="login" element={<AdminLogin />} />
        </Route>

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute role="admin" />}>
         <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="usermanagement" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>

      {/* ======================= */}
      {/* Fallback Route */}
      {/* ======================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
