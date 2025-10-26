import api from "../api/api";

import type { OTPPurpose,VerifyOTPData } from "../types";

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
