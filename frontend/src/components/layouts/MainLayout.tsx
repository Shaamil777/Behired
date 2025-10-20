import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main page content with top padding equal to navbar height */}
      <main className="flex-1 pt-16 bg-background">
        {children}
      </main>

      {/* Footer (optional) */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
