import React from "react";
import { motion } from "framer-motion";

interface StepProps {
  number: string;
  title: string;
  description: string;
  delay: number;
}

const StepsSection: React.FC = () => {
  const steps: StepProps[] = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Get started in just a few minutes by setting up both your Job Seeker and Employer profiles under one account. Highlight your skills, experience, and availability while also preparing to post job openings whenever you need talent.",
      delay: 0.2
    },
    {
      number: "2",
      title: "Explore Opportunities & Talent",
      description: "Easily switch between your profiles to browse jobs that match your skills or discover candidates that fit your company's needs. With powerful filters and smart matching, you'll always find the right fit.",
      delay: 0.3
    },
    {
      number: "3",
      title: "Apply, Post & Connect",
      description: "As a job seeker, apply to openings directly with your profile. As an employer, post new roles and connect with potential hires instantly. Real-time alerts keep you updated so you never miss an opportunity.",
      delay: 0.4
    },
    {
      number: "4",
      title: "Finalize With Confidence",
      description: "Once a connection is made, manage the next steps with ease. Apply, accept offers, and start working—or schedule interviews, review applications, and onboard new hires—all within the same platform.",
      delay: 0.5
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#080808] overflow-hidden flex items-center justify-center px-8 py-20">
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Path to Success: <span className="text-[#48E0A4]">Simple Steps</span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800/50 backdrop-blur-sm overflow-hidden group cursor-pointer ${
                index === 3 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: step.delay }}
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
                {/* Step Number */}
                <motion.div
                  className="text-[#48E0A4] text-6xl font-bold mb-6 leading-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: step.delay + 0.2 }}
                  viewport={{ once: true }}
                >
                  {step.number}
                </motion.div>

                {/* Step Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-4 leading-tight">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#48E0A4]/5 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-500" />
              
              {/* Top corner glow */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-[#48E0A4]/10 blur-2xl rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;