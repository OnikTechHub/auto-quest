"use client";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiTrash2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Are you absolutely sure?</h3>
        <p className="text-slate-500 text-sm mt-2">This vehicle will be permanently removed from your garage registry.</p>
        <div className="flex items-center gap-3 mt-6">
          <button 
            type="button"
            onClick={onClose} 
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-sm transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onConfirm} 
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;