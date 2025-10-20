import React from "react";
import { motion } from "framer-motion";

const IntroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#080808] overflow-hidden flex items-center justify-center px-8 py-20">
      

      {/* Content Container */}
      <div id="about" className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <motion.div
            className="relative bg-[#1a1a1a] rounded-3xl p-10 border border-gray-800/50 backdrop-blur-sm overflow-hidden group cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 60px rgba(72, 224, 164, 0.3)",
              borderColor: "rgba(72, 224, 164, 0.5)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#48E0A4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl font-bold text-[#48E0A4] mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Vision
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                To be the global leader in connecting talent with opportunity, creating a future where every individual can find meaningful work and every company can build a diverse, exceptional team. We envision a world where the hiring process is seamless, equitable, and driven by purpose, empowering people to achieve their career goals and helping businesses thrive.
              </motion.p>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#48E0A4]/5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="relative bg-[#1a1a1a] rounded-3xl p-10 border border-gray-800/50 backdrop-blur-sm overflow-hidden group cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 60px rgba(200, 150, 50, 0.3)",
              borderColor: "rgba(200, 150, 50, 0.5)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C89632]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl font-bold text-[#C89632] mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Mission
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Our mission is to empower both job seekers and employers through a purpose-driven platform. For job seekers, we provide the tools, resources, and access to opportunities needed to build a fulfilling career path. For employers, we offer a dynamic and intelligent solution to efficiently identify, attract, and hire the best talent. We are dedicated to simplifying the complexities of the hiring process and fostering a community built on growth, connection, and success.
              </motion.p>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C89632]/5 rounded-tr-full transform -translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;