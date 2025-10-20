import React, { useState } from "react";
import Button from "../ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/password.service";

export interface ChangeFormData {
  password: string;
  confirmpassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<ChangeFormData>({
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email: string })?.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.password.trim() || !formData.confirmpassword.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      toast.loading("Resetting password...", { id: "reset" });
      await resetPassword({
        email,
        newPassword: formData.password,
        confirmPassword: formData.confirmpassword,
      });
      toast.success("Password reset successfully!", { id: "reset" });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.", { id: "reset" });
    }
  };

  return (
    <div className="w-full max-w-lg p-16 flex flex-col items-center h-full">
      <div className="w-full max-w-xs text-left mb-10">
        <h1 className="text-4xl font-bold mb-2">Reset Password</h1>
        <p className="text-gray-500 text-sm">
          Enter your new password to update your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <div>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full border-b border-gray-300 rounded-none px-0 py-3 text-lg placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-0 transition duration-150"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            className="w-full border-b border-gray-300 rounded-none px-0 py-3 text-lg placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-0 transition duration-150"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
