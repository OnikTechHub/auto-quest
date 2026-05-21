"use client";
import React, { useState, useEffect } from "react";
import { FiCalendar, FiDollarSign, FiTrash2, FiClock, FiUser } from "react-icons/fi"; 
import { authClient } from "@/lib/auth-client"; 
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const MyBookingsPage = () => {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) {
      if (!authLoading) setLoading(false);
      return;
    }

    const fetchMyBookings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings?email=${session.user.email}`);
        const data = await response.json();
        
        if (data.success) {
          const sortedBookings = data.data.sort((a, b) => b._id.localeCompare(a._id));
          setBookings(sortedBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [session, authLoading]);

  const handleCancelBooking = async (bookingId) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success || response.ok) {
        toast.success("Booking cancelled successfully! ");
        setBookings((prevBookings) => prevBookings.filter((b) => b._id !== bookingId));
      } else {
        toast.error(data.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Something went wrong!");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-[#00B488] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm animate-pulse">Fetching your bookings...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl max-w-sm shadow-sm border border-slate-100">
          <p className="text-slate-500 font-medium mb-4">Please log in to view your bookings!</p>
          <Link href="/login" className="bg-[#00B488] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/10 block text-center">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster /> 

      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Bookings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track your active vehicle reservations.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center bg-white border border-slate-100 rounded-3xl p-12 shadow-sm">
            <p className="text-slate-500 font-medium mb-4">You haven't booked any vehicles yet! </p>
            <Link href="/cars" className="inline-flex bg-[#00B488] hover:bg-[#009670] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/10">
              Explore Cars
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Vehicle</th>
                    <th className="py-4 px-6">Booking Date</th>
                    <th className="py-4 px-6">Driver</th> 
                    <th className="py-4 px-6">Total Price</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                      
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-3">
                          <img 
                            src={booking.carImage || booking.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500"} 
                            alt={booking.carName} 
                            className="w-12 h-8 object-contain bg-slate-50 rounded border border-slate-100"
                          />
                          <span>{booking.carName}</span>
                        </div>
                      </td>
                      
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-slate-600">
                          <FiCalendar className="text-[#00B488]" />
                          <span>{booking.bookingDate || new Date().toLocaleDateString()}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        {booking.driverNeeded === "Yes" || booking.driverNeeded === true ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold px-2.5 py-0.5 rounded-md">
                            <FiUser /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium text-xs bg-slate-100 px-2.5 py-0.5 rounded-md">
                            No
                          </span>
                        )}
                      </td>
                      
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div className="flex items-baseline">
                          <FiDollarSign className="text-xs text-slate-400 self-center" />
                          {booking.dailyPrice || booking.price}
                        </div>
                      </td>
                      
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Confirmed
                        </span>
                      </td>
                      
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-sm border border-rose-100 cursor-pointer active:scale-95"
                          title="Cancel Booking"
                        >
                          <FiTrash2 size={16} />
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