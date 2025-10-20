import React from "react";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import VerifyOtpPage from "../pages/Auth/VerifyOtpPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ChangePasswordPage from "../pages/Auth/ChangePasswordPage";
import LandingPage from "../pages/Landing/LandingPage";

export const authRoutes = [
    { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/verify-otp", element: <VerifyOtpPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/change-password", element: <ChangePasswordPage /> },
];
