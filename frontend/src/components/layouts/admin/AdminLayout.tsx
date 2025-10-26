
import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  FileText,
  BarChart,
  CreditCard,
  Calendar,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../../routes/routeConfig";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: ROUTES.ADMIN.DASHBOARD },
    { icon: Users, label: "User Management", path: ROUTES.ADMIN.USER_MANAGEMENT },
    // { icon: FileText, label: "Posts Management", path: ROUTES.ADMIN.POSTS },
    // { icon: BarChart, label: "Report Management", path: ROUTES.ADMIN.REPORTS },
    // { icon: CreditCard, label: "Application Management", path: ROUTES.ADMIN.APPLICATIONS },
    // { icon: Calendar, label: "Subscription Management", path: ROUTES.ADMIN.SUBSCRIPTIONS },
    // { icon: Calendar, label: "Interview Management", path: ROUTES.ADMIN.INTERVIEWS },
  ];

  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");

  useEffect(() => {
    const currentItem = menuItems.find((item) => location.pathname === item.path);
    if (currentItem) {
      setActiveMenu(currentItem.label);
    }
  }, [location.pathname]);

  const handleMenuClick = (path: string, label: string) => {
    setActiveMenu(label);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate(ROUTES.ADMIN.LOGIN);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="text-white text-xl font-bold">LOGO</div>
        </div>

        <nav className="p-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.label;

            return (
              <button
                key={index}
                onClick={() => handleMenuClick(item.path, item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-gray-400 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-semibold">{activeMenu}</h1>

            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </button>

              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;