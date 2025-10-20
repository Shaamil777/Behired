import React from "react";
import { motion } from "framer-motion";
import account from '../../../assets/icons/Account.png'
import realtime from '../../../assets/icons/realtime.png'
import simple from '../../../assets/icons/simple.png'
import transparent from '../../../assets/icons/transparent.png'

interface FeatureProps {
  icon: string; // Path to your icon image
  title: string;
  description: string;
  color: string;
}

const OverviewSection: React.FC = () => {
  const features: FeatureProps[] = [
    {
      icon: account, // Replace with: icon1
      title: "All-in-One Account",
      description: "Whether you are an employer and apply as a candidate — with the same profile.",
      color: "#48E0A4"
    },
    {
      icon: transparent, // Replace with: icon2
      title: "Transparent & Fair",
      description: "No middlemen, no hidden charges — direct connections only.",
      color: "#48E0A4"
    },
    {
      icon: realtime, // Replace with: icon3
      title: "Real-Time Tracking",
      description: "Stay updated on every application with statuses like pending, accepted, or interview scheduled.",
      color: "#48E0A4"
    },
    {
      icon: simple, // Replace with: icon4
      title: "Simple & Fast",
      description: "From posting to hiring, the process is streamlined and hassle-free.",
      color: "#48E0A4"
    }
  ];

  const quotes = [
    {
      text: "Opportunities don't happen, you create them.",
      author: "Chris Grosser",
      color: "#48E0A4"
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein",
      color: "#48E0A4"
    },
    {
      text: "Luck is what happens when preparation meets opportunity.",
      author: "Confucius",
      color: "#48E0A4"
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#080808] overflow-hidden flex items-center justify-center px-8 py-20">
     
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <motion.p
            className="text-[#48E0A4] text-sm font-semibold tracking-wider uppercase mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            — PLATFORM OVERVIEW
          </motion.p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Main Heading */}
            <div>
              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Find the perfect{" "}
                <span className="text-[#48E0A4]">talent.</span> Without the headache.
              </motion.h1>
              
              <motion.p
                className="text-gray-400 text-lg leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our platform makes hiring effortless by connecting you with skilled professionals directly, cutting out delays, high costs, and unnecessary steps.
              </motion.p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm overflow-hidden group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(72, 224, 164, 0.2)",
                      borderColor: "rgba(72, 224, 164, 0.5)"
                    }}
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#48E0A4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        {feature.icon && (
                          <img 
                            src={feature.icon} 
                            alt={feature.title}
                            className="w-6 h-6 object-contain"
                            style={{ filter: 'brightness(0) saturate(100%) invert(79%) sepia(27%) saturate(1234%) hue-rotate(102deg) brightness(95%) contrast(92%)' }}
                          />
                        )}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Quote Cards */}
            <div className="flex flex-col gap-6 justify-center">
              {quotes.map((quote, index) => (
                <motion.div
                  key={index}
                  className="relative bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800/50 backdrop-blur-sm overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(72, 224, 164, 0.2)",
                    borderColor: "rgba(72, 224, 164, 0.5)"
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#48E0A4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <p className="text-white text-xl font-medium mb-4 leading-relaxed">
                      "{quote.text}"
                    </p>
                    <p className="text-[#48E0A4] font-semibold">
                      — {quote.author}
                    </p>
                  </div>

                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#48E0A4]/5 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;