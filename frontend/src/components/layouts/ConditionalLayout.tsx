import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const ConditionalLayout: React.FC = () => {
  const location = useLocation();
  
  // Routes where we don't want to show the MainLayout navbar
  const routesWithoutNavbar = ["/"];
  const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
      <main className={shouldShowNavbar ? "flex-1 pt-16" : "flex-1"}>
        <Outlet />
      </main>
    </div>
  );
};

export default ConditionalLayout;