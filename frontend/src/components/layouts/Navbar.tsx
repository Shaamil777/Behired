import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, User } from "lucide-react"; // icons
// import { cn } from "@/lib/utils"; // optional helper if you use shadcn/ui or just remove if not
import { logoutUser } from "@/services/auth.service";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // pages that should show only the logo
  const authRoutes = ["/login", "/register", "/verify-otp", "/forgot-password", "/change-password"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#070707] shadow-lg z-20">
      <div className="container mx-auto h-full flex justify-between items-center px-6">
        {/* Left - Logo */}
        <div
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/home")}
        >
          BeHired
        </div>

        {/* If NOT auth page → show nav links and icons */}
        {!isAuthPage && (
          <div className="flex items-center gap-6">
            {/* Center Links */}
            <div className="flex gap-8 text-white text-base font-medium">
              <Link
                to="/find-jobs"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Find Jobs
              </Link>
              <Link
                to="/applications"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Applications
              </Link>
              <Link
                to="/my-posts"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                My Posts
              </Link>
              <button onClick={logoutUser}>
                logout
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 ml-10">
              <button
                className="p-2 rounded-full hover:bg-gray-800 transition"
                title="Messages"
              >
                <MessageSquare className="text-white w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-800 transition"
                title="Profile"
              >
                <User className="text-white w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
