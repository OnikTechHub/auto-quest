"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiCarLine } from "react-icons/ri";

export default function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = false; 

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/cars" },
  ];

  return (
    <nav className="w-full bg-[#0B132B]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-wider bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        <RiCarLine className="text-emerald-400 text-3xl" />
        AutoQuest
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors hover:text-emerald-400 ${
              pathname === link.href ? "text-emerald-400 font-semibold" : "text-slate-300"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Login Button */}
      <div className="flex items-center gap-4">
        <Link href="/login">
          <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/10 hover:scale-105 transition-all active:scale-95">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}