"use client";
import React, { useState } from "react";
import { FiX, FiCalendar, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast"; 

const BookingModal = ({ isOpen, onClose, car, userEmail, onBookingSuccess }) => {
    const [bookingDate, setBookingDate] = useState("");
    const [driverNeeded, setDriverNeeded] = useState("No");
    const [specialNote, setSpecialNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !car) return null;

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!bookingDate) {
            toast.error("Please select a rental date!");
            return;
        }

        setIsSubmitting(true);

        const bookingInfo = {
            carId: car._id,
            carName: car.carName,
            carImage: car.carImage || car.image,
            dailyPrice: car.dailyPrice || car.price,
            pickupLocation: car.pickupLocation || car.location,
            bookingDate: bookingDate,
            driverNeeded: driverNeeded,
            specialNote: specialNote,
            userEmail: userEmail, 
            status: "Confirmed",
            bookedAt: new Date()
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingInfo)
            });

            const data = await response.json();
            if (data.success) {
                setBookingDate("");
                setDriverNeeded("No");
                setSpecialNote("");
                onBookingSuccess();
            } else {
                toast.error("Booking failed: " + data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-slate-100">

                <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
                    <FiX size={18} />
                </button>

                <h2 className="text-xl font-bold text-slate-900 mb-1">Confirm Booking</h2>
                <p className="text-xs text-slate-500 mb-5">
                    Booking <span className="font-semibold text-slate-800">{car.carName}</span> at ${car.dailyPrice || car.price}/day.
                </p>

                <form onSubmit={handleBookingSubmit} className="space-y-4 text-sm">

                    {/* Rental Date */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rental Date</label>
                        <div className="relative">
                            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="date" 
                                required 
                                value={bookingDate} 
                                onChange={(e) => setBookingDate(e.target.value)} 
                                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:border-[#00B488]" 
                            />
                        </div>
                    </div>

                    {/* Driver Needed */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Driver Needed?</label>
                        <select 
                            value={driverNeeded} 
                            onChange={(e) => setDriverNeeded(e.target.value)} 
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 focus:border-[#00B488] focus:outline-none text-xs"
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Special Note */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Special Note</label>
                        <div className="relative">
                            <FiFileText className="absolute left-3 top-3 text-slate-400" />
                            <textarea 
                                rows="3" 
                                value={specialNote} 
                                onChange={(e) => setSpecialNote(e.target.value)} 
                                placeholder="Write any special Note here..." 
                                className="w-full pl-9 pr-4 py-2 border text-slate-800 border-slate-200 rounded-xl focus:border-[#00B488] focus:outline-none placeholder:text-slate-400 text-xs"
                            ></textarea>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full bg-[#00B488] hover:bg-[#009670] text-white font-bold py-3 rounded-xl transition-all text-xs cursor-pointer active:scale-95 shadow-lg shadow-emerald-500/10 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Booking..." : "Confirm Booking "}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookingModal;