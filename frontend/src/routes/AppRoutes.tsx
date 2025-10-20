import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ConditionalLayout from "../components/layouts/ConditionalLayout";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../pages/Landing/LandingPage";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <ConditionalLayout>
        <Routes>
          {/* ✅ Root route redirect */}
          <Route
            path="/"
            element={
              token ? <Navigate to="/home" replace /> : <LandingPage />
            }
          />


          {/* ✅ Auth routes */}
          {authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* ✅ User routes (protected) */}
          {userRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))}

          {/* Optional Admin routes */}
          {/* {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))} */}

          {/* ✅ Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ConditionalLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
