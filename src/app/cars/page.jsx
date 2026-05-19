"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiMapPin, FiUsers, FiCpu, FiDollarSign, FiInfo } from "react-icons/fi";

const ExploreCarsPage = () => {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cars");
        const data = await response.json();

        if (data.success) {
          setCars(data.data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#00B488] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm animate-pulse">Loading amazing cars for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Our Fleet
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
            Find the perfect vehicle for your next journey. Luxury sedans, spacious SUVs, and more.
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="text-center bg-white border border-slate-100 rounded-3xl p-12 max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 font-medium mb-4">No cars available in the garage right now.</p>
            <a href="/add-car" className="inline-flex bg-[#00B488] hover:bg-[#009670] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all">
              Add Your First Car
            </a>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >

                <div className="relative h-48 w-full bg-slate-50">
                  <img
                    src={car.carImage}
                    alt={car.carName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500";

                    }}
                  />
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${car.availabilityStatus === "Available"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-rose-50 border-rose-200 text-rose-600"
                    }`}>
                    {car.availabilityStatus}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight">{car.carName}</h3>
                      <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                        {car.carType}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{car.description}</p>


                    <div className="grid grid-cols-2 gap-3 mb-6 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <FiUsers className="text-[#00B488]" />
                        <span>{car.seatCapacity} Seats</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <FiMapPin className="text-[#00B488] truncate" />
                        <span className="truncate">{car.pickupLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Daily Rent</span>
                      <div className="flex items-baseline text-slate-900 font-extrabold text-2xl">
                        <FiDollarSign className="text-sm text-slate-500 self-center" />
                        {car.dailyPrice}
                      </div>
                    </div>

                    <Link
                      href={`/cars/${car._id}`}
                      className="flex items-center gap-1.5 bg-[#00B488] hover:bg-[#009670] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-500/10 active:scale-95 transition-all cursor-pointer"
                    >
                      <FiInfo />
                      Details
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ExploreCarsPage;