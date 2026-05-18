"use client";
import React from "react";
import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion"; 

const NotFound = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#FDFBF7] px-6 relative overflow-hidden">
      

      <div className="max-w-xl text-center space-y-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block"
        >
          <h1 className="text-[9rem] sm:text-[12rem] font-black tracking-tighter leading-none bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent opacity-20 select-none">
            404
          </h1>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="space-y-3"
        >
          <p className="text-lg font-bold text-slate-700">Oops! Page Not Found</p>
          <p className="text-slate-500 font-light max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
            The premium route you are looking for doesn't exist or has been moved to another journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
        
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm">
              <FiHome className="text-base" />
              Back to Home
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default NotFound; 