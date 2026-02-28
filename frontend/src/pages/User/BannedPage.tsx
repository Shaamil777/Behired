import React, { useEffect } from "react";
import { AlertTriangle, Mailbox, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/utils/tokenUtils";

const BannedPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user tokens when they land on the banned page
        logout();
    }, []);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#070707] flex items-center justify-center p-6 bg-gradient-to-b from-[#070707] to-[#110000]">
            <div className="max-w-xl w-full bg-[#111111]/90 backdrop-blur-xl border border-red-900/40 rounded-3xl p-10 shadow-[0_0_80px_rgba(220,38,38,0.1)] text-center flex flex-col items-center">

                {/* Pulsing Alert Icon */}
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-red-600/20 rounded-full animate-ping opacity-75"></div>
                    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-red-500/10 to-red-900/20 rounded-full border border-red-500/30">
                        <AlertTriangle className="w-12 h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Account Suspended</h1>

                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full mb-6 relative"></div>

                <p className="text-gray-300 mb-2 leading-relaxed text-lg">
                    Your BeHired account has been permanently restricted due to violations of our Community Guidelines and Terms of Service.
                </p>

                <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-md">
                    If you believe this action was taken in error or if you need to retrieve your personal data, please reach out to our support team.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button
                        onClick={() => window.location.href = "mailto:support@behired.com"}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                    >
                        <Mailbox className="w-5 h-5" />
                        Contact Support
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannedPage;
