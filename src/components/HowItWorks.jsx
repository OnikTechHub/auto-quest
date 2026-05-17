"use client";
import React from "react";
import { FiMapPin, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion"; 

const steps = [
  {
    id: 1,
    icon: <FiMapPin className="text-2xl text-emerald-600" />,
    title: "Choose Location",
    desc: "Select your pickup location and browse from our top-notch premium fleet close to you."
  },
  {
    id: 2,
    icon: <FiCalendar className="text-2xl text-emerald-600" />,
    title: "Pick-Up Date",
    desc: "Select your ideal date range and customize your booking period with full flexibility."
  },
  {
    id: 3,
    icon: <FiCheckCircle className="text-2xl text-emerald-600" />,
    title: "Book Your Car",
    desc: "Confirm your secure booking, unlock your car, and enjoy your premium journey smoothly."
  }
];

export default function HowItWorks() {
    
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="w-full py-20 px-6 lg:px-16 bg-[#F8F6F0]/60 relative overflow-hidden border-t border-b border-slate-200/40">
      <div className="max-w-7xl mx-auto">
        

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-xl mx-auto mb-16 space-y-3"
        >
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-600/10 text-emerald-700 border border-emerald-600/20">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Rent a Car in <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">3 Easy Steps</span>
          </h2>
          <p className="text-slate-500 font-light">
            Our premium booking workflow is streamlined to save your time and give you the ultimate hassle-free experience.
          </p>
        </motion.div>

        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              variants={fadeInUp}
              className="group relative rounded-[2rem] bg-white border border-slate-200/50 p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
            >
              {/* Step Number Badge */}
              <span className="absolute top-4 right-6 font-mono text-4xl font-black text-slate-200/60 group-hover:text-emerald-500/10 transition-colors">
                0{step.id}
              </span>

              {/* Icon Box */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDFBF7] to-[#F1EDE4] border border-slate-200/60 flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}