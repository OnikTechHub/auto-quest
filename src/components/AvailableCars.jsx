"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

const AvailableCarsSection = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAvailableCars = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`);
                const data = await response.json();

                if (data.success) {
                    const availableCars = data.data.filter(
                        (car) =>
                            (car.availabilityStatus || car.availability) ===
                            "Available"
                    );

                    setCars(availableCars);
                }
            } catch (error) {
                console.error("Error fetching available cars:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableCars();
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#F7F5F0]">
            {/* Heading */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-stone-900 tracking-tight">
                        Available Cars
                    </h2>
                </div>

                <p className="text-stone-500 text-sm font-semibold max-w-md">
                    Explore our curated list of immediately available vehicles.
                    Inspected for safety, loaded with modern premium tech
                    features.
                </p>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-[32px] p-6 border border-stone-200/40 space-y-4 animate-pulse"
                        >
                            <div className="w-full h-48 bg-stone-100 rounded-2xl"></div>
                            <div className="h-6 bg-stone-100 rounded-lg w-2/3"></div>
                            <div className="h-4 bg-stone-100 rounded-lg w-1/2"></div>
                            <div className="h-12 bg-stone-100 rounded-xl w-full"></div>
                        </div>
                    ))}
                </div>
            ) : cars.length === 0 ? (
                /* Empty State */
                <div className="text-center bg-white rounded-[32px] p-16 border border-stone-200/40 shadow-sm">
                    <p className="text-stone-500 font-bold">
                        No cars are currently available. Please check back
                        later!
                    </p>
                </div>
            ) : (
                /* Cars Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.slice(0, 6).map((car) => (
                        <div
                            key={car._id}
                            className="bg-white border border-stone-200/40 rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div>
                                {/* Image Card */}
                                <div className="relative bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                    
                                    {/* Available Badge */}
                                    <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-emerald-100 z-10">
                                        {car.availabilityStatus ||
                                            car.availability}
                                    </span>

                                    {/* Car Image */}
                                    <img
                                        src={car.carImage || car.image}
                                        alt={car.carName}
                                        className="h-56 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Car Details */}
                                <div className="space-y-2 mt-5 mb-6">
                                    <div className="flex justify-between items-start gap-3">
                                        <h3 className="text-xl font-black text-stone-900 tracking-tight">
                                            {car.carName}
                                        </h3>

                                        <span className="bg-stone-100 text-stone-700 text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap">
                                            {car.carType || car.type}
                                        </span>
                                    </div>

                                    <p className="text-stone-400 text-xs font-medium line-clamp-2">
                                        {car.description ||
                                            "Premium rental option with unmatched comfort and top-tier driving mechanics."}
                                    </p>

                                    {/* Bottom Info */}
                                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100 text-stone-500 text-xs font-semibold">
                                        <div className="flex items-center gap-1.5">
                                            <FaLocationDot className="w-3.5 h-3.5 text-[#829E2C]" />

                                            <span>
                                                {car.pickupLocation ||
                                                    car.location}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 justify-end">
                                            <span className="text-stone-800 text-base font-black">
                                                $
                                                {car.dailyPrice || car.price}
                                            </span>

                                            <span className="text-stone-400 text-[10px]">
                                                /day
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* View Details  */}
                            <Link
                                href={`/cars/${car._id}`}
                                className="w-full text-center bg-stone-900 hover:bg-stone-800 text-white text-xs font-black py-3.5 rounded-xl transition-all shadow-sm tracking-wide block uppercase"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default AvailableCarsSection;