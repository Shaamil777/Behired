    import React, { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";

    const LandingNavbar: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Check if scrolled past top (for background)
        if (currentScrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        // Check scroll direction for visibility
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past 100px
            setVisible(false);
        } else {
            // Scrolling up
            setVisible(true);
        }

        setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ease-in-out ${
            visible ? "translate-y-0" : "-translate-y-full"
        } ${
            scrolled
            ? " backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
        >
        <div className="container mx-auto h-full flex justify-between items-center px-6">
            {/* Logo */}
            <div
            className="text-3xl font-bold text-white cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
            BeHired
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
            <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-gray-300 transition-colors duration-200 text-base font-medium"
            >
                Home
            </button>
            <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-gray-300 transition-colors duration-200 text-base font-medium"
            >
                About
            </button>
            <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-gray-300 transition-colors duration-200 text-base font-medium"
            >
                Contact
            </button>
            <button
                onClick={() => scrollToSection("pricing")}
                className="text-white hover:text-gray-300 transition-colors duration-200 text-base font-medium"
            >
                Pricing
            </button>
            </div>

            {/* Sign In Button */}
            <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md"
            >
            Sign In
            </button>
        </div>
        </nav>
    );
    };

    export default LandingNavbar