"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // Better Auth ক্লায়েন্ট ইম্পোর্ট

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!", {
          style: {
            borderRadius: "12px",
            background: "#334155",
            color: "#fff",
            fontSize: "14px",
          },
        });
      } else {
        toast.success("Welcome Back! Login Successful.", {
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#10B981",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
          },
        });

        setEmail("");
        setPassword("");
        
        setTimeout(() => {
          router.push("/");
          router.refresh(); 
        }, 1200);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      toast.error("Google Sign-In failed.");
    }
  };

  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 relative overflow-hidden py-6 sm:py-12">


      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[440px] rounded-[1.8rem] sm:rounded-[2.5rem] bg-gradient-to-br from-white via-slate-50 to-emerald-500/[0.01] border border-slate-200/60 p-1 sm:p-2 shadow-xl relative z-10"
      >
        <div className="w-full rounded-[1.6rem] sm:rounded-[2.3rem] bg-white p-5 sm:p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center space-y-1.5 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Welcome <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Back</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Enter your details to access your premium fleet
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
            {/* Email Input */}
            <div className="space-y-1 sm:space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
              <div className="relative flex items-center group">
                <FiMail className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors text-base sm:text-lg" />
                <input 
                  type="email" 
                  required
                  disabled={loading}
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3.5 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-light outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
              </div>
              <div className="relative flex items-center group">
                <FiLock className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors text-base sm:text-lg" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  disabled={loading}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 sm:pl-11 pr-11 sm:pr-12 py-2.5 sm:py-3.5 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-light outline-none transition-all disabled:opacity-50"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-base sm:text-lg" /> : <FiEye className="text-base sm:text-lg" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1 sm:pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-xs sm:text-sm disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
                {!loading && <FiArrowRight className="text-sm sm:text-base" />}
              </button>
            </div>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-xs sm:text-sm text-slate-500 font-light mt-6 sm:mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-emerald-600 hover:underline">
              Sign up 
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-5 sm:my-6">
            <div className="flex-1 border-t border-slate-100"></div>
            <span className="px-2 sm:px-3 text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-medium">Or email</span>
            <div className="flex-1 border-t border-slate-100"></div>
          </div>

          {/* Social  Button */}
          <button 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2.5 sm:gap-3 px-4 py-3 sm:py-3.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-300 shadow-sm active:scale-[0.99]"
          >
            <FcGoogle className="text-lg sm:text-xl" />
            Sign in with Google
          </button>

        </div>
      </motion.div>
    </section>
  );
};

export default LoginPage;