"use client";
import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-gradient-to-tr from-[#F4F1EA] via-[#FDFBF7] to-[#EBF3F0] overflow-hidden px-6 lg:px-16 py-12">
      
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-emerald-500/[0.08] blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-600/[0.06] blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* Left Side: Text Content */}
        <div className="space-y-6 text-left order-2 lg:order-1">

          {/*  Badge */}
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-600/10 text-emerald-700 border border-emerald-600/20 shadow-sm">
              Premium Car Rental Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-800 leading-tight">
            Find, Book, and Rent a Car in{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Easy Steps
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
            AutoQuest offers secure, reliable, and premium car rental services. Explore our wide range of fleets tailored to match your journeys and lifestyles perfectly.
          </p>

          {/* Explore Cars Button*/}
          <div className="pt-4">
            <Link href="/cars">
              <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]">
                Explore Cars
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Car Image  */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 w-full max-w-[530px] mx-auto group">
          
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 via-emerald-500/5 to-teal-600/10 rounded-[2.5rem] blur-3xl group-hover:scale-105 transition-all duration-700 pointer-events-none"></div>

          <div className="relative p-1.5 rounded-[2.5rem] bg-gradient-to-br from-white via-slate-200/60 to-emerald-500/10 shadow-xl transition-all duration-500 w-full overflow-hidden border border-slate-200/40">
            
            <div className="relative rounded-[2.3rem] bg-white/70 p-3 backdrop-blur-xl border border-white/60 overflow-hidden shadow-inner">

              <img
                src="https://i.ibb.co/xKg3ZBsD/home-car.jpg" 
                alt="Premium Luxury Car"
                className="relative z-10 w-full h-auto object-cover rounded-[1.8rem] transform group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}