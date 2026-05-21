"use client";
import React from "react";
import { FiX } from "react-icons/fi";

const CarFormModal = ({ isOpen, onClose, modalType, formData, setFormData, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative my-auto">
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-all"
        >
          <FiX className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-800 mb-6">
          {modalType === "add" ? "Add New Vehicle" : "Update Car Details"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Car Name</label>
            <input type="text" required value={formData.carName} onChange={(e) => setFormData({ ...formData, carName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="e.g., Tesla Model S" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Car Type</label>
              <select value={formData.carType} onChange={(e) => setFormData({ ...formData, carType: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all cursor-pointer">
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Daily Price ($)</label>
              <input type="number" required value={formData.dailyPrice} onChange={(e) => setFormData({ ...formData, dailyPrice: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="Rent cost" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Pickup Location</label>
            <input type="text" required value={formData.pickupLocation} onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="City or area name" />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Car Image URL</label>
            <input type="url" required value={formData.carImage} onChange={(e) => setFormData({ ...formData, carImage: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="https://..." />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Availability Status</label>
            <select value={formData.availabilityStatus} onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all cursor-pointer">
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Description</label>
            <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all resize-none" placeholder="Provide a brief specifications description..."></textarea>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="w-full py-3 bg-[#00B488] hover:bg-[#009670] text-white font-bold rounded-xl text-sm transition-colors shadow-md"
            >
              {modalType === "add" ? "Save Vehicle" : "Update Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarFormModal;