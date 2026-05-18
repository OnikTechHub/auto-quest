"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError("");

    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough || !hasUppercase || !hasNumber) {
      setPasswordError("Password must meet all the security requirements below.");
      toast.error("Registration Failed! Check password requirements.", {
        style: { borderRadius: "12px", background: "#334155", color: "#fff" },
      });
      return;
    }

    try {
      setLoading(true);


      const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: photoUrl,
      });

      if (error) {

        toast.error(error.message || "Registration failed! Try again.", {
          style: { borderRadius: "12px", background: "#334155", color: "#fff" },
        });
      } else {

        toast.success("Account Created Successfully! Please login.", {
          duration: 3000,
          style: { borderRadius: "12px", background: "#10B981", color: "#fff", fontWeight: "600" },
        });

        setName("");
        setEmail("");
        setPhotoUrl("");
        setPassword("");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("Sign up error:", err);
      toast.error("An unexpected error occurred.", {
        style: { borderRadius: "12px", background: "#334155", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/login",
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      toast.error("Google Sign-In failed.");
    }
  };

  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center bg-[#FDFBF7] px-4 sm:px-6 relative overflow-hidden py-12">


      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[480px] rounded-[2.5rem] bg-gradient-to-br from-white via-slate-50 to-emerald-500/[0.01] border border-slate-200/60 p-2 shadow-xl relative z-10"
      >
        <div className="w-full rounded-[2.3rem] bg-white p-6 sm:p-10">

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Create <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Account</span>
            </h2>
            <p className="text-sm text-slate-400 font-light">
              Join AutoQuest to unlock premium vehicle rentals
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
              <div className="relative flex items-center group">
                <FiUser className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors text-lg" />
                <input
                  type="text"
                  required
                  disabled={loading}
                  placeholder="Enter Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-light outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Photo URL</label>
              <div className="relative flex items-center group">
                <FiImage className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors text-lg" />
                <input
                  type="url"
                  required
                  disabled={loading}
                  placeholder="Enter Your Photo URL"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-light outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
              <div className="relative flex items-center group">
                <FiMail className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors text-lg" />
                <input
                  type="email"
                  required
                  disabled={loading}
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-light outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password  */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
              <div className="relative flex items-center group">
                <FiLock className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-light outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 font-medium pl-1 pt-1">
                Must be at least 8 characters with 1 uppercase and 1 number
              </p>

              {passwordError && (
                <p className="text-xs text-rose-500 font-semibold pl-1 pt-1">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-sm disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Creating Account..." : "Sign Up"}
                {!loading && <FiArrowRight className="text-base" />}
              </button>
            </div>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-sm text-slate-500 font-light mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-emerald-600 hover:underline">
              Log In
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-slate-100"></div>
            <span className="px-3 text-xs text-slate-400 uppercase tracking-widest font-medium">Or credentials</span>
            <div className="flex-1 border-t border-slate-100"></div>
          </div>

          {/* Social Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-300 shadow-sm active:scale-[0.99]"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

        </div>
      </motion.div>

    </section>
  );
}

export default RegisterPage
