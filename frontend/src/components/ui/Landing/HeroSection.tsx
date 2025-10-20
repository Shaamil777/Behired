    import React from "react";
    import { motion } from "framer-motion";
    import team from '../../../assets/Images/team.jpg'
    import typing from '../../../assets/Images/typing.jpg'
    import womanlaptop from '../../../assets/Images/woman-laptop.jpg'
    import { useNavigate } from "react-router-dom";


    const HeroSection: React.FC = () => {
        const navigate = useNavigate()
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-between px-24">
        {/* === Animated Background Glows === */}
        <motion.div
        className="absolute bottom-[-15%] left-[-15%] w-[60vw] h-[60vw] bg-[#48E0A4] opacity-40 rounded-full blur-[250px]" // Adjusted size, opacity, and position
        animate={{ x: ["0%", "3%", "0%"], y: ["0%", "3%", "0%"], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[-15%] right-[-15%] w-[60vw] h-[60vw] bg-[#C89632] opacity-40 rounded-full blur-[250px]" // Adjusted size, opacity, and position
        animate={{ x: ["0%", "-3%", "0%"], y: ["0%", "-3%", "0%"], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
        <div id="home" className="absolute inset-0 bg-black/70" />

        {/* === LEFT SECTION (Text + Buttons) === */}
        <div className="relative z-10 w-1/2 space-y-6">
            <h1 className="text-6xl font-extrabold text-white leading-tight">
            The Easiest Way to Get Your <br />
            <span className="text-[#48E0A4]">New Job</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-md">
            Work with talented people at the most affordable price to get the most
            out of your time and cost.
            </p>

            <div className="flex gap-4 mt-10">
            <button className="px-8 py-3 rounded-full bg-[#48E0A4] font-semibold text-black shadow-lg hover:scale-105 transition">
                Explore More
            </button>
            <button onClick={()=>navigate('/register')} className="px-8 py-3 rounded-full border border-gray-500 text-white font-semibold hover:bg-white/10 transition">
                Get Started
            </button>
            </div>
        </div>

        {/* === RIGHT SECTION (Image Collage) === */}
        <div className="relative z-10 w-1/2 flex justify-end items-center">
            <div className="flex items-center gap-6">
            {/* Tall rounded-left image */}
            <div className='h-[500px] w-[250px] rounded-tl-[120px] rounded-br-[120px] rounded-tr-[120px] overflow-hidden bg-gray-800'>
                <img
                src={womanlaptop}
                alt="Working woman"
                className="w-full h-full object-cover"
                />
            </div>

            {/* Two circular images stacked vertically */}
            <div className="flex flex-col justify-between h-[500px] gap-6">
                <div className="w-[220px] h-[220px] rounded-tl-[120px] rounded-tr-[120px]  rounded-br-[120px] overflow-hidden bg-gray-800">
                <img
                    src={typing}
                    alt="Typing on laptop"
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="w-[220px] h-[220px] rounded-tr-[120px] rounded-br-[120px] rounded-bl-[120px] overflow-hidden bg-gray-800">
                <img
                    src={team}
                    alt="Team working"
                    className="w-full h-full object-cover"
                />
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default HeroSection;
