"use client";
import React from "react";
import Link from "next/link";
import { FiEye, FiCalendar, FiDollarSign } from "react-icons/fi";

// ডামি কার ডাটা (পরবর্তীতে MongoDB থেকে আসবে)
const dummyCars = [
  {
    _id: "1",
    carModel: "Tesla Model S Plaid",
    dailyPrice: 120,
    availability: "Available",
    vehicleRegNumber: "REG-2026-XYZ",
    imageUrl: "https://images.unsplash.com/photo-1617469767053-d3b508a04665?w=600&auto=format&fit=crop&q=80",
    dateAdded: "2026-05-15",
    bookingCount: 12
  },
  {
    _id: "2",
    carModel: "Audi R8 Coupe",
    dailyPrice: 150,
    availability: "Available",
    vehicleRegNumber: "REG-2026-ABC",
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80",
    dateAdded: "2026-05-16",
    bookingCount: 8
  },
  {
    _id: "3",
    carModel: "BMW M4 Competition",
    dailyPrice: 110,
    availability: "Unavailable",
    vehicleRegNumber: "REG-2026-M4C",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80",
    dateAdded: "2026-05-17",
    bookingCount: 5
  }
];

export default function FeaturedCars() {
  return (
    <section className="w-full py-20 px-6 lg:px-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-600/10 text-emerald-700 border border-emerald-600/20">
              Our Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
              Explore Our <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">Available Cars</span>
            </h2>
            <p className="text-slate-500 max-w-md font-light">
              Select from our premium range of vehicles. Impeccable condition and guaranteed safety for your ultimate comfort.
            </p>
          </div>
          
          <Link href="/cars">
            <button className="px-6 py-3 border border-slate-300 hover:border-emerald-500 hover:text-emerald-600 text-slate-700 font-semibold rounded-xl transition-all text-sm shadow-sm">
              View All Cars
            </button>
          </Link>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyCars.map((car) => (
            <div 
              key={car._id}
              className="group relative rounded-[2rem] bg-white border border-slate-200/60 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Car Image Wrapper */}
                <div className="relative w-full h-48 rounded-[1.5rem] overflow-hidden bg-slate-100 mb-5">
                  <img 
                    src={car.imageUrl} 
                    alt={car.carModel}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
                    car.availability === "Available" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {car.availability}
                  </span>
                </div>

                {/* Car Info */}
                <div className="space-y-3 px-1">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {car.carModel}
                  </h3>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-emerald-500" />
                      {new Date(car.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono text-[11px]">
                      {car.vehicleRegNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between px-1">
                <div>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Daily Rate</p>
                  <p className="text-xl font-black text-slate-800 flex items-center">
                    <FiDollarSign className="text-emerald-500 text-lg -mr-0.5" />
                    {car.dailyPrice}
                    <span className="text-xs text-slate-400 font-normal">/day</span>
                  </p>
                </div>

                <Link href={`/cars/${car._id}`}>
                  <button className="p-3 bg-slate-50 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 text-slate-600 hover:text-white rounded-xl shadow-sm transition-all duration-300 border border-slate-200/60 hover:border-transparent">
                    <FiEye className="text-lg" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}