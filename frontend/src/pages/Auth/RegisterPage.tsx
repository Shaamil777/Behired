import React, { useEffect } from "react";

import RegisterForm from "../../components/forms/RegisterForm";
import image from "../../assets/Images/AuthCover.jpg"
import { useNavigate } from "react-router-dom";

const RegisterPage:React.FC = () =>{
    
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token")
            if(token){
                navigate('/home',{replace:true})
            }
        
    },[navigate])

    return (
        // Set the entire page background to the requested color
        <div className="h-[calc(100vh-4rem)] flex bg-[#f0f5fA] ">
            
            {/* RIGHT SECTION: IMAGE/PROMO AREA - Now padded on all sides */}
            {/* The container takes the full height, and 'p-12' creates the padding/margin effect */}
            <div className="hidden md:flex md:w-1/2 relative p-4 sm:p-8 lg:p-12 items-center justify-center"> 
                
                {/* Inner Dark Content Box: Fills the padded space, applies the dark background, and uses rounded corners */}
                <div className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden flex flex-col justify-end shadow-2xl">
                    
                    {/* Image Placeholder with Dark Overlay Effect */}
                    <img 
                        src={image} 
                        alt="Abstract professional illustration" 
                        className="absolute inset-0 w-full h-full object-cover" 
                        // Note: The 'image' variable in the code is currently importing 'react.svg'.
                        // You should replace this in your project with the actual background image path.
                    />

                    {/* Text Overlay */}
                    <div className="relative p-12 text-white z-10">
                        <h2 className="text-5xl font-bold mb-4">
                            Find your dream job faster.
                        </h2>
                        <p className="text-lg text-gray-300">
                            Thousands of opportunities tailored to your skills.
                        </p>
                    </div>
                </div>
            </div>

            {/* LEFT SECTION: LOGIN FORM AREA (Retaining bg-white for the card-on-background effect) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16">
                
                {/* Form Content Wrapper */}
                <div className="w-full max-w-md">
                    
                    

                    {/* LoginForm Component */}
                    <RegisterForm  />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
