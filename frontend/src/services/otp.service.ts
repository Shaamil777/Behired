import api from "../api/api";

export type OTPPurpose = "register" | "forgot-password";

export interface VerifyOTPData {
  email: string;
  otp: string;
  purpose: OTPPurpose;
  firstname?: string;
  lastname?: string;
  password?: string;
  confirmpassword?: string;
}

// Send OTP
export const sentOTP = async (data: { email: string; purpose: OTPPurpose }) => {
  const response = await api.post("/auth/sent-otp", data);
  return response.data;
};

// Verify OTP
export const verifyOTP = async (data: VerifyOTPData) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};
