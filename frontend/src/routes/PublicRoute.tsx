import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser, getAdmin } from "../utils/tokenUtils";

// Public route for both user and admin
export const PublicRoute: React.FC = () => {
  const user = getUser();
  const admin = getAdmin();
  const token = getToken();

  if (admin && token) return <Navigate to="/admin/dashboard" replace />;
  if (user && token) return <Navigate to="/home" replace />;

  return <Outlet />;
};

// Admin public route (optional, but keeps consistency)
export const AdminPublicRoute: React.FC = () => {
  const admin = getAdmin();
  const token = getToken();
  if (admin && token) return <Navigate to="/admin/dashboard" replace />;
  return <Outlet />;
};

export default PublicRoute;
