"use client";
import React, { useState } from "react";
import { FiX, FiCalendar } from "react-icons/fi";


export default function BookingModal({ isOpen, onClose, car, userEmail, onBookingSuccess }) {
    const [bookingDate, setBookingDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !car) return null;

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!bookingDate) {
            alert("Please select a booking date!");
            return;
        }

        setIsSubmitting(true);

        const bookingInfo = {
            carId: car._id,
            carName: car.carName,
            carImage: car.carImage,
            dailyPrice: car.dailyPrice,
            pickupLocation: car.pickupLocation,
            bookingDate: bookingDate,
            userEmail: userEmail,
            status: "Confirmed",
            bookedAt: new Date()
        };

        try {
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingInfo)
            });

            const data = await response.json();
            if (data.success) {
                onBookingSuccess();
            } else {
                alert("Booking failed: " + data.message);
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 relative">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-colors"
                >
                    <FiX size={18} />
                </button>

                <h2 className="text-xl font-bold text-slate-900 mb-2">Confirm Your Booking</h2>
                <p className="text-xs text-slate-500 mb-6">
                    You are booking <span className="font-semibold text-slate-800">{car.carName}</span> at ${car.dailyPrice}/day.
                </p>

                <form onSubmit={handleBookingSubmit} className="space-y-4">

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Email</label>
                        <input
                            type="email"
                            value={userEmail}
                            disabled
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-medium text-sm cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Rental Date</label>
                        <div className="relative">
                            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="date"
                                required
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-[#00B488] transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00B488] hover:bg-[#009670] text-white font-bold py-3.5 rounded-xl mt-2 shadow-md shadow-emerald-500/10 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </button>
                </form>
            </div>
        </div>
    );
}