"use client";
import React from "react";
import { FiShield, FiZap, FiSettings, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion"; 

const features = [
  {
    id: 1,
    icon: <FiShield className="text-2xl text-emerald-600" />,
    title: "Fully Insured",
    desc: "Every vehicle in our fleet comes with comprehensive insurance coverage included."
  },
  {
    id: 2,
    icon: <FiZap className="text-2xl text-emerald-600" />,
    title: "Instant Booking",
    desc: "Book your car in under 2 minutes. No paperwork, no waiting, just driving."
  },
  {
    id: 3,
    icon: <FiSettings className="text-2xl text-emerald-600" />,
    title: "24/7 Roadside",
    desc: "Our support team is always on standby, ready to assist anywhere, anytime."
  },
  {
    id: 4,
    icon: <FiDollarSign className="text-2xl text-emerald-600" />,
    title: "Best Price",
    desc: "We guarantee the most competitive rates with no hidden fees or surprises."
  }
];

const WhyChooseUs = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="w-full py-16 px-6 lg:px-16 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 space-y-2"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Why Auto Quest
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight uppercase">
            BUILT FOR <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">DRIVERS</span>
          </h2>
        </motion.div>

        {/* Features Layout Container  */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="w-full rounded-[2.5rem] bg-gradient-to-br from-white via-slate-50 to-emerald-500/[0.02] border border-slate-200/60 p-2 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-[2.3rem] bg-white divide-y lg:divide-y-0 lg:divide-x divide-slate-100 overflow-hidden">
            
            {features.map((feature) => (
              
              <motion.div 
                key={feature.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="p-8 hover:bg-gradient-to-b hover:from-transparent hover:to-emerald-500/[0.02] transition-all duration-300 group flex flex-col items-start text-left"
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDFBF7] to-[#F1EDE4] border border-slate-200/50 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-bold text-slate-800 mb-2 tracking-tight group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default WhyChooseUs;