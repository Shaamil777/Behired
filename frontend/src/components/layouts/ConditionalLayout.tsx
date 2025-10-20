import React from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "./MainLayout";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Pages that don't need the main layout
  const noLayoutRoutes = ["/"];
  
  if (noLayoutRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }
  
  return <MainLayout>{children}</MainLayout>;
};

export default ConditionalLayout;