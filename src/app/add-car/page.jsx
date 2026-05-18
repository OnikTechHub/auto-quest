"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlusCircle, FiImage, FiTrendingUp, FiCheckCircle, FiMapPin, FiUsers, FiCpu } from "react-icons/fi";
import { toast } from "react-hot-toast"; 

export default function AddCarPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    carName: "",
    dailyPrice: "",
    carType: "SUV",
    carImage: "",
    seatCapacity: "",
    pickupLocation: "",
    description: "",
    availabilityStatus: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCarData = {
      ...formData,
      dailyPrice: parseFloat(formData.dailyPrice), 
      seatCapacity: parseInt(formData.seatCapacity), 
      bookingCount: 0, 
      createdAt: new Date(), 
    };

    try {
      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalCarData),
      });

      const data = await response.json();

      if (data.success) {
        if (typeof toast !== "undefined") {
          toast.success("Car listing added successfully! 🎉");
        } else {
          alert("Car listing added successfully! 🎉");
        }

        setFormData({
          carName: "",
          dailyPrice: "",
          carType: "SUV",
          carImage: "",
          seatCapacity: "",
          pickupLocation: "",
          description: "",
          availabilityStatus: "Available",
        });

        router.push("/cars"); 
      } else {
        alert(data.message || "Failed to add car.");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      alert("Server connection failed! Make sure your backend server is running on port 5000.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white border border-emerald-500/10 rounded-3xl p-6 sm:p-10 shadow-xl shadow-emerald-500/5">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-[#00B488]/10 rounded-2xl text-[#00B488] mb-4 border border-[#00B488]/20">
            <FiPlusCircle className="text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add a New Car
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Fill in the exact requirements below to list your vehicle.
          </p>
        </div>

        {/* From */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* 1. Car Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Car Name</label>
              <input
                type="text"
                name="carName"
                required
                value={formData.carName}
                onChange={handleChange}
                placeholder="Entre Car Name"
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
              />
            </div>

            {/* 2. Daily Rent Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Daily Rent Price ($)</label>
              <input
                type="number"
                name="dailyPrice"
                required
                value={formData.dailyPrice}
                onChange={handleChange}
                placeholder="Daily Rent Price"
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
              />
            </div>

            {/* 3. Car Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FiCpu className="text-slate-400" /> Car Type
              </label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-all cursor-pointer shadow-inner"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            {/* 4. Seat Capacity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FiUsers className="text-slate-400" /> Seat Capacity
              </label>
              <input
                type="number"
                name="seatCapacity"
                required
                value={formData.seatCapacity}
                onChange={handleChange}
                placeholder="e.g., 4 or 7"
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
              />
            </div>

            {/* 5. Image URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FiImage className="text-slate-400" /> Image URL 
              </label>
              <input
                type="url"
                name="carImage"
                required
                value={formData.carImage}
                onChange={handleChange}
                placeholder="e.g., https://i.ibb.com/..."
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
              />
            </div>

            {/* 6. Pickup Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FiMapPin className="text-slate-400" /> Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                required
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="e.g., Dhaka/Chattogram"
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
              />
            </div>

            {/* 7. Availability Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FiTrendingUp className="text-slate-400" /> Availability Status
              </label>
              <select
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-all cursor-pointer shadow-inner"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* 8. Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Write something about the car features..."
              className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#00B488] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all resize-none shadow-inner"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#00B488] hover:bg-[#009670] text-white font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <FiCheckCircle className="text-lg" />
            Submit Listing
          </button>
        </form>

      </div>
    </div>
  );
}