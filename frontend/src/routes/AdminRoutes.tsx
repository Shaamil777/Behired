import React from "react";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminPublicRoute } from "./PublicRoute";
import AdminLayout from "../components/layouts/admin/AdminLayout";


// Lazy load pages
const AdminLogin = React.lazy(() => import("../pages/Admin/Auth/AdminLogin"));
const AdminDashboard = React.lazy(() => import("../pages/Admin/AdminDashboard"));
const UserManagement = React.lazy(() => import("../pages/Admin/UserManagement"));
// const PostsManagement = React.lazy(() => import("../pages/Admin/PostsManagement"));
// const ReportsManagement = React.lazy(() => import("../pages/Admin/ReportsManagement"));
// const ApplicationsManagement = React.lazy(() => import("../pages/Admin/ApplicationsManagement"));
// const SubscriptionsManagement = React.lazy(() => import("../pages/Admin/SubscriptionsManagement"));
// const InterviewsManagement = React.lazy(() => import("../pages/Admin/InterviewsManagement"));

export const AdminRoutes = () => (
  <Route path="/admin">
    {/* Public Admin Routes */}
    <Route element={<AdminPublicRoute />}>
      <Route path="login" element={<AdminLogin />} />
    </Route>

    {/* Protected Admin Routes with Layout */}
    <Route element={<ProtectedRoute role="admin" />}>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="usermanagement" element={<UserManagement />} />
        {/* <Route path="posts" element={<PostsManagement />} />
        <Route path="reports" element={<ReportsManagement />} />
        <Route path="applications" element={<ApplicationsManagement />} />
        <Route path="subscriptions" element={<SubscriptionsManagement />} />
        <Route path="interviews" element={<InterviewsManagement />} /> */}
      </Route>
    </Route>
  </Route>
);