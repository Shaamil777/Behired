import React, { useState } from "react";
import Button from "../ui/Button";
import GoogleButton from "../ui/GoogleButton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {loginUser,googleAuth } from "../../services/auth.service";
import { useGoogleLogin } from "@react-oauth/google";

export interface LoginFormData {
    email:string,
    password:string
}



const LoginForm: React.FC =()=>{
    const [formData,setFormData] = useState<LoginFormData>({email:"",password:""})
    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();

        if(!formData.email || !formData.password){
            toast.error("Please fill all fields")
            return;
        }
        try {
            toast.loading("Logging in...",{id:"login"});;
            const res = await loginUser(formData)
            toast.success("Login successful",{id:"login"})
             // Save JWT token
            localStorage.setItem("token", res.token);

            // Optionally save user info
            localStorage.setItem("user", JSON.stringify(res.user));

            // Redirect after login
            navigate("/home",{replace:true}); 
        } catch (error:any) {
            toast.error(error.response?.data?.message || "Login failed", { id: "login" });  
        }
    }

   const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse: any) => {
        try {
            toast.loading("Signing in with Google...", { id: "google" });

            const idToken = tokenResponse.credential; // ✅ critical fix
            if (!idToken) throw new Error("Google token not found");

            const res = await googleAuth(idToken);

            toast.success("Google login successful!", { id: "google" });
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            navigate("/home", { replace: true });
        } catch (error: any) {
            toast.error("Google login failed", { id: "google" });
        }
    },
    onError: () => toast.error("Google login failed"),
    scope: "openid email profile",
});


    return (
        // --- Main Container: Replicates the central white panel area ---
        <div className="w-full max-w-lg p-16 flex flex-col items-center h-full">

           
            {/* Welcome Text - MODIFIED FOR LEFT ALIGNMENT */}
            {/* Added max-w-xs and text-left to align with the form below */}
            <div className="w-full max-w-xs text-left mb-10">
                <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-500 text-sm">
                    Doesn't have an account? 
                    {/* The link is styled blue and bold/medium weight */}
                    <a onClick={()=>navigate('/register')} className="text-blue-600 font-medium hover:underline ml-1">
                        Sign Up
                    </a>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 px-0 py-3 focus:border-blue-600 outline-none"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 px-0 py-3 focus:border-blue-600 outline-none"
                required
            />
           
            <Button type="submit">Login</Button>
            </form>
             <a
                        onClick={()=>navigate('/forgot-password')}
                        className="text-gray-700 hover:text-blue-600 mt-5 hover:underline"
                    >
                        Forgot Password?
                    </a>
            {/* OR Separator */}
            <div className="flex items-center w-full max-w-xs my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">or register with</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="w-full max-w-xs">
                <GoogleButton onClick={()=>googleLogin()} text="Sign in with Google" />
            </div>
        </div>
    );
}

export default LoginForm;