"use client";
import React, { useState, useEffect } from "react";
import { FiCalendar, FiTrash2, FiEdit2, FiCheck, FiX, FiClock } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); 
  const [editDate, setEditDate] = useState("");
  
  const userEmail = "onikdas.dev@gmail.com"; 
  
  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings?email=${userEmail}`);
      const data = await response.json();
      if (data.success) {
        setBookings(data.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateDate = async (id) => {
    if (!editDate) return;
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newDate: editDate })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Booking date updated successfully! 📅");
        setEditingId(null);
        fetchBookings(); 
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update date");
    }
  };

  const handleCancelBooking = async (id, carName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Cancelled booking for ${carName}`);
        fetchBookings(); 
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#00B488] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">My Bookings</h1>
        <p className="text-sm text-slate-500 mb-8">Manage your booked vehicles, modify rental schedules, or cancel reservations.</p>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-medium mb-4">You haven't booked any cars yet!</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100">
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Car Image</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Car Name</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Date</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Price</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-5">
                        <div className="w-16 h-12 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-1">
                          <img src={booking.carImage} alt={booking.carName} className="w-full h-full object-contain" />
                        </div>
                      </td>
                      
                      <td className="p-5 font-bold text-slate-800 text-sm">{booking.carName}</td>
                      
                      <td className="p-5 text-sm">
                        {editingId === booking._id ? (
                          <div className="flex items-center gap-2">
                            <input 
                              type="date" 
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#00B488]"
                            />
                            <button onClick={() => handleUpdateDate(booking._id)} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 hover:bg-emerald-100"><FiCheck size={14}/></button>
                            <button onClick={() => setEditingId(null)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 hover:bg-rose-100"><FiX size={14}/></button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 font-medium text-slate-600">
                            <FiCalendar className="text-slate-400" />
                            {booking.bookingDate}
                          </div>
                        )}
                      </td>
                      
                      <td className="p-5 text-sm font-semibold text-slate-700">${booking.dailyPrice}</td>
                      
                      <td className="p-5">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          <FiClock size={11} />
                          {booking.status || "Confirmed"}
                        </span>
                      </td>
                      
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => handleCancelBooking(booking._id, booking.carName)}
                          className="inline-flex items-center justify-center p-2.5 bg-rose-50 border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/10 active:scale-95 transition-all cursor-pointer"
                          title="Cancel Booking"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;