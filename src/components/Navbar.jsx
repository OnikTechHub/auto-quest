"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoCarSportSharp } from "react-icons/io5";
import { FiLogOut, FiPlusCircle, FiCalendar, FiList, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isLoggedIn = !!session;

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Something went wrong!");
        }
      }
    });
  };
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/cars" },
    { name: "Add Car", href: "/add-car" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <nav className="w-full bg-[#0B132B]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 sm:px-6 py-4 flex items-center justify-between">
      
      
      <div className="flex items-center gap-3">
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1 text-slate-300 hover:text-emerald-400 text-2xl md:hidden transition-colors cursor-pointer z-50"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>


        <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          <IoCarSportSharp className="text-emerald-400 text-2xl sm:text-3xl" />
          AutoQuest
        </Link>
      </div>


      <div className="hidden md:flex items-center gap-8 font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 text-[13px] tracking-wide transition-all duration-200 uppercase ${
                isActive 
                  ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" 
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>


      <div className="flex items-center gap-4">
        {isPending ? (
          <div className="w-20 sm:w-24 h-9 bg-slate-800/60 animate-pulse rounded-xl"></div>
        ) : isLoggedIn ? (
          
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1.5 bg-slate-800/40 hover:bg-slate-800/80 rounded-xl border border-slate-700 transition-all cursor-pointer select-none"
            >
              {user?.image ? (
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-xl object-cover border border-emerald-500/30"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
              )}
              <span className="text-slate-300 text-sm hidden sm:inline px-1">
                {user?.name?.split(" ")[0]}
              </span>
              <FiChevronDown className={`text-slate-400 text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 sm:w-56 bg-[#0B132B] border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                <div className="space-y-0.5 px-2">
                  <Link 
                    href="/add-car" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800/40 rounded-xl transition-all text-sm font-medium"
                  >
                    <FiPlusCircle className="text-lg text-slate-400" />
                    Add Car
                  </Link>

                  <Link 
                    href="/bookings" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800/40 rounded-xl transition-all text-sm font-medium"
                  >
                    <FiCalendar className="text-lg text-slate-400" />
                    My Bookings
                  </Link>

                  <Link 
                    href="/my-added-cars" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800/40 rounded-xl transition-all text-sm font-medium"
                  >
                    <FiList className="text-lg text-slate-400" />
                    My Added Cars
                  </Link>
                </div>

                <div className="border-t border-slate-800/60 mt-2 pt-2 px-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-400 hover:bg-rose-950/20 rounded-xl transition-all text-sm font-medium cursor-pointer text-left"
                  >
                    <FiLogOut className="text-lg" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          
          <Link href="/login">
            <button className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/10 hover:scale-105 transition-all active:scale-95 cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-all duration-300">
          <div 
            ref={mobileMenuRef}
            
            className="w-64 max-w-[80vw] h-full bg-[#0B132B] border-r border-slate-800/80 p-6 flex flex-col justify-between shadow-[5px_0_25px_rgba(0,0,0,0.5)] transform transition-transform duration-300"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-2 text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  <IoCarSportSharp className="text-emerald-400 text-2xl" />
                  AutoQuest
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-rose-400 text-xl transition-colors cursor-pointer"
                >
                  <FiX />
                </button>
              </div>
              
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive 
                          ? "bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20" 
                          : "text-slate-800 hover:bg-slate-800/40 hover:text-emerald-400"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;