import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP, sentOTP } from "../../services/otp.service";
import toast from "react-hot-toast";
import { setToken,setAdmin,setRole, setUser } from "../../utils/tokenUtils";

const VerifyOTPForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, purpose } = (location.state as any) || {};

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(300);
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setResendEnabled(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (!userData || !purpose) return;

    try {
      const data = {
        email: userData.email,
        otp: enteredOtp,
        purpose,
        ...(purpose === "register"
          ? {
              firstname: userData.firstname,
              lastname: userData.lastname,
              password: userData.password,
              confirmpassword: userData.confirmpassword,
            }
          : {}),
      };
      const response = await verifyOTP(data);

      if(response?.token){
        localStorage.setItem('token',response.token)
          if(response.user){
             setUser(response.user);
             setRole(response.user.role || "user");
          }
      }

      if (purpose === "register") {
        toast.success("OTP verified! Account created successfully.");
        navigate("/home");
      } else if (purpose === "forgot-password") {
        navigate("/change-password", { state: { email: userData.email } });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to verify OTP");
    }
  };

  const handleResend = async () => {
    if (!userData || !purpose) return;
    try {
      toast.loading("Sending OTP...", { id: "otp" });
      await sentOTP({ email: userData.email, purpose });
      toast.success("OTP resent successfully!", { id: "otp" });
      setTimeLeft(300);
      setResendEnabled(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP", { id: "otp" });
    }
  };

  return (
    <div className="w-full max-w-lg p-16 flex flex-col items-center h-full">
      <div className="w-full max-w-xs text-left mb-10">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Verify Your Email</h1>
        <p className="text-gray-500 text-sm">
          We've sent a 6-digit code to{" "}
          <span className="font-medium text-gray-700">{userData?.email || "your email"}</span>.
        </p>
      </div>

      <div className="w-full max-w-xs flex justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-14 text-center text-xl font-bold border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 outline-none transition duration-150"
          />
        ))}
      </div>

      <Button type="button" onClick={handleVerify}>
        Verify
      </Button>

      <p className="text-gray-500 text-sm mt-5 text-center">
        Didn't receive the code?{" "}
        <span
          className={`text-blue-600 font-medium hover:underline cursor-pointer ${
            !resendEnabled ? "pointer-events-none opacity-50" : ""
          }`}
          onClick={resendEnabled ? handleResend : undefined}
        >
          Resend OTP {!resendEnabled && `(${formatTime(timeLeft)})`}
        </span>
      </p>

      <p className="text-gray-500 text-sm text-center mt-2">
        Wrong email?{" "}
        <span
          className="text-blue-600 font-medium hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Go back to edit
        </span>
      </p>
    </div>
  );
};

export default VerifyOTPForm;
