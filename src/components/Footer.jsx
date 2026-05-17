"use client";
import React from "react";
import Link from "next/link";
import { RiCarLine } from "react-icons/ri";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-[#FDFBF7] border-t border-slate-200/60 pt-16 pb-8 px-6 lg:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                {/* Company Info */}
                <div className="space-y-4 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
                            <RiCarLine className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent tracking-tight">
                            AutoQuest
                        </span>
                    </Link>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">
                        Experience luxury at your fingertips. Rent premium cars securely and travel with complete comfort.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-slate-500 font-medium">
                        <li>
                            <Link href="/" className="hover:text-emerald-600 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-emerald-500 hover:after:w-full after:transition-all">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/cars" className="hover:text-emerald-600 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-emerald-500 hover:after:w-full after:transition-all">
                                Explore Cars
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Fleet Categories */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">Our Fleet</h4>
                    <ul className="space-y-2 text-sm text-slate-500 font-light">
                        <li className="hover:text-emerald-600 cursor-pointer transition-colors">Luxury Sedans</li>
                        <li className="hover:text-emerald-600 cursor-pointer transition-colors">Premium SUVs</li>
                        <li className="hover:text-emerald-600 cursor-pointer transition-colors">Electric Fleets</li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">Follow Us</h4>
                    <p className="text-sm text-slate-500 font-light">Stay connected with our luxury lifestyle updates.</p>
                    <div className="flex items-center gap-3">
                        {[<FaFacebookF />, <FaTwitter />, <FaInstagram />, <FaLinkedinIn />].map((icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-500 flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95 duration-200"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Copyright */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
                <p>© {new Date().getFullYear()} AutoQuest. All rights reserved.</p>
                <p className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-semibold capitalize">
                    Designed with Onik
                </p>
            </div>
        </footer>
    );
}

export default Footer;