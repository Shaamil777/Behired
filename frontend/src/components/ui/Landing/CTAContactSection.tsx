import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTAContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <section className="relative w-full bg-[#080808] overflow-hidden">
      {/* CTA Section */}
      <div id="contact" className="relative border-t border-b border-[#48E0A4]/30 py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Find Your Next Opportunity?
          </motion.h2>
          
          <motion.p
            className="text-gray-400 text-lg mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of job seekers and employers who are transforming their careers and teams. Your next great hire or dream job is just a click away.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-4 bg-[#48E0A4] text-black font-bold text-lg rounded-lg shadow-lg hover:shadow-[#48E0A4]/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(72, 224, 164, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate("/login")}
            >
              Find a Job
            </motion.button>
            
            <motion.button
              className="px-8 py-4 bg-transparent text-white font-bold text-lg rounded-lg border-2 border-[#48E0A4] hover:bg-[#48E0A4]/10 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(72, 224, 164, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate("/login")}
            >
              Post a Job
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative border-b border-[#48E0A4]/30 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                Whether you're a job seeker or an employer, we're here to help you every step of the way. Send us a message or find us at the contact points below.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  className="flex items-start gap-4 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#48E0A4]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#48E0A4]/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-[#48E0A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                    <p className="text-gray-400">info@yourjobplatform.com</p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="flex items-start gap-4 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#48E0A4]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#48E0A4]/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-[#48E0A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-gray-400">+1 (123) 456-7890</p>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  className="flex items-start gap-4 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#48E0A4]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#48E0A4]/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-[#48E0A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Visit us</h3>
                    <p className="text-gray-400">123 Talent Ave, Suite 400, Jobtown, NY 10001</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#48E0A4] focus:ring-1 focus:ring-[#48E0A4] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  />
                  
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#48E0A4] focus:ring-1 focus:ring-[#48E0A4] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>

                <motion.input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#48E0A4] focus:ring-1 focus:ring-[#48E0A4] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                />

                <motion.textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#48E0A4] focus:ring-1 focus:ring-[#48E0A4] transition-all duration-300 resize-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                />

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full px-8 py-4 bg-[#48E0A4] text-black font-bold text-lg rounded-lg shadow-lg hover:shadow-[#48E0A4]/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(72, 224, 164, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-1 h-8 bg-[#48E0A4]" />
      <div className="absolute top-0 left-0 w-8 h-1 bg-[#48E0A4]" />
      <div className="absolute top-0 right-0 w-1 h-8 bg-[#48E0A4]" />
      <div className="absolute top-0 right-0 w-8 h-1 bg-[#48E0A4]" />
      <div className="absolute bottom-0 left-0 w-1 h-8 bg-[#48E0A4]" />
      <div className="absolute bottom-0 left-0 w-8 h-1 bg-[#48E0A4]" />
      <div className="absolute bottom-0 right-0 w-1 h-8 bg-[#48E0A4]" />
      <div className="absolute bottom-0 right-0 w-8 h-1 bg-[#48E0A4]" />
    </section>
  );
};

export default CTAContactSection;