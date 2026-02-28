import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser, getAdmin, isTokenExpired, logout } from "../utils/tokenUtils";

interface ProtectedRouteProps {
  role: "user" | "admin";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const token = getToken();

  // Expired token
  if (token && isTokenExpired(token)) {
    logout();
    const redirectPath = role === "admin" ? "/admin/login" : "/login";
    return <Navigate to={redirectPath} replace />;
  }

  let isAuthenticated = false;

  if (role === "user") {
    const user = getUser();
    if (user) {
      if (user.isActive === false) {
        logout();
        return <Navigate to="/login" replace />;
      }
      isAuthenticated = !!token;
    }
  } else if (role === "admin") {
    isAuthenticated = !!getAdmin() && !!token;
  }

  const redirectPath = role === "admin" ? "/admin/login" : "/login";

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};
