import React, { useState } from "react";
import Button from "../ui/Button";
import GoogleButton from "../ui/GoogleButton";
import { useNavigate } from "react-router-dom";
import { sentOTP } from "../../services/otp.service";
import toast from "react-hot-toast";
import { googleAuth } from "../../services/auth.service";
import { useGoogleLogin } from "@react-oauth/google";

interface RegisterFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required.";
    else if (!/^[A-Za-z]+$/.test(formData.firstname.trim()))
      newErrors.firstname = "First name should contain only letters.";

    if (!formData.lastname.trim())
      newErrors.lastname = "Last name is required.";
    else if (!/^[A-Za-z]+$/.test(formData.lastname.trim()))
      newErrors.lastname = "Last name should contain only letters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!formData.password) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must have 8+ chars, uppercase, lowercase, number & symbol.";

    if (!formData.confirmpassword)
      newErrors.confirmpassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmpassword)
      newErrors.confirmpassword = "Passwords do not match.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) setTimeout(() => setErrors({}), 5000);

    return Object.keys(newErrors).length === 0;
  };

  const handleSentOTP = async () => {
    if (!validateForm()) {
      toast.error("Please review the highlighted fields and try again.");
      return;
    }

    try {
      toast.loading("Sending OTP...", { id: "otp" });
      await sentOTP({ email: formData.email, purpose: "register" });
      toast.success("OTP sent successfully! Check your email.", { id: "otp" });
      navigate("/verify-otp", { state: { userData: formData, purpose: "register" } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP.", { id: "otp" });
    }
  };

  const googleRegister = useGoogleLogin({
    onSuccess:async (tokenResponse)=>{
      try {
        toast.loading("Registering with Google...", { id: "google" });
      const res = await googleAuth(tokenResponse.access_token);
      toast.success("Account created successfully!", { id: "google" });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/home", { replace: true });
      } catch (error:any) {
         toast.error("Google signup failed", { id: "google" });
      }
    },
    onError: () => toast.error("Google signup failed"),
  })

  return (
    <div className="w-full max-w-lg p-16 flex flex-col items-center h-full">
      <div className="w-full max-w-xs text-left mb-10">
        <h1 className="text-4xl font-bold mb-2">Create an account</h1>
        <p className="text-gray-500 text-sm">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline ml-1 cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>

      <form className="w-full max-w-xs space-y-4">
        {["firstname", "lastname", "email", "password", "confirmpassword"].map(
          (field) => (
            <div key={field} className="relative">
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace("password", " Password")
                }
                className={`w-full border-b ${
                  errors[field]
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-600"
                } rounded-none px-0 py-3 text-lg placeholder-gray-400 outline-none focus:ring-0 transition duration-150`}
                required
                value={formData[field as keyof RegisterFormData]}
                onChange={handleChange}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          )
        )}

        <Button type="button" onClick={handleSentOTP}>
          Create Account
        </Button>
      </form>

      <div className="flex items-center w-full max-w-xs my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">or register with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="w-full max-w-xs">
        <GoogleButton onClick={()=>googleRegister()} text="Sign up with Google" />
      </div>

    </div>
  );
};

export default RegisterForm;
