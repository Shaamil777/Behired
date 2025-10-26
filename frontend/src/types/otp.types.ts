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
