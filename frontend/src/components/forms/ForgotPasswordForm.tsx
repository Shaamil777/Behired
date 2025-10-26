import React, { useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sentOTP } from "../../services/otp.service";

export interface ForgotFormData {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<ForgotFormData>({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      toast.loading("Sending OTP...", { id: "otp" });
      await sentOTP({ email: formData.email, purpose: "forgot-password" });
      toast.success("OTP sent! Check your email.", { id: "otp" });
      navigate("/verify-otp", { state: { userData: { email: formData.email }, purpose: "forgot-password" } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP.", { id: "otp" });
    }
  };

  return (
    <div className="w-full max-w-lg p-16 flex flex-col items-center h-full">
      {/* Title */}
      <div className="w-full max-w-xs text-left mb-10">
        <h1 className="text-4xl font-bold mb-2">Forgot Password?</h1>
        <p className="text-gray-500 text-sm">
          Enter your email to receive a 6-digit OTP
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border-b border-gray-300 rounded-none px-0 py-3 text-lg placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-0 transition duration-150"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit">Receive OTP</Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
