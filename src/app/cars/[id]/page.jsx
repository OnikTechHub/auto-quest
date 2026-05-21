"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiMapPin, FiUsers, FiDollarSign, FiBookmark, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; 

const CarDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, isPending: authLoading } = authClient.useSession();
  const loggedInUserEmail = session?.user?.email;

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setCar(data.data);
        } else {
          console.error("Backend error message:", data.message);
          toast.error(data.message || "Failed to load vehicle details.");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to load vehicle details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
    
  }, [id]);

  const handleBookingClick = () => {
    
    if (!session) {
      toast.error("Please log in first to book this vehicle! 🔒");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }
    setIsModalOpen(true);
  };

  const handleBookingSuccess = () => {
    toast.success(`Successfully booked ${car?.carName} 🎉`, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "white",
        color: "#0f172a",
        fontWeight: "600",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        padding: "16px"
      },
    });

    setCar((prevCar) => prevCar ? ({
      ...prevCar,
      bookingCount: (prevCar.bookingCount || 0) + 1,
    }) : null);

    setIsModalOpen(false);

    setTimeout(() => {
      router.push("/my-bookings");
    }, 2000);
  };

  if (authLoading || (loading && !car)) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-[#00B488] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm animate-pulse">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl max-w-sm shadow-sm border border-slate-100">
          <p className="text-slate-500 font-medium mb-4">Vehicle information not found!</p>
          <Link href="/cars" className="bg-[#00B488] text-white px-4 py-2 rounded-xl text-sm font-bold">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster /> 

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/cars" className="inline-flex items-center gap-2 text-slate-600 hover:text-[#00B488] font-semibold text-sm mb-6 transition-colors cursor-pointer">
          <FiArrowLeft /> Back to Explore
        </Link>

        {/* Details Card */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">

          {/* Left Column: Image Block */}
          <div className="relative h-64 md:h-full min-h-[300px] w-full bg-[#F8FAFC] rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
            <img src={car.carImage} alt={car.carName} className="w-full h-full object-contain" />
            <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${
              car.availabilityStatus === "Available" || car.availability === "Available" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                : "bg-rose-50 border-rose-200 text-rose-600"
            }`}>
              {car.availabilityStatus || car.availability || "Available"}
            </span>
          </div>

          {/* Right Column: Information Block */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-emerald-50 text-[#00B488] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-emerald-200/50">
                  {car.carType || car.type}
                </span>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Booked: {car.bookingCount || 0} times
                </span>
              </div>

              {/* Title & Description */}
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">{car.carName}</h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{car.description}</p>

              {/* Specifications */}
              <div className="space-y-3.5 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <div className="p-2 bg-slate-50 rounded-lg text-[#00B488]"><FiUsers /></div>
                  <span>Seating Capacity: <strong className="text-slate-900">{car.seatCapacity} Persons</strong></span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <div className="p-2 bg-slate-50 rounded-lg text-[#00B488]"><FiMapPin /></div>
                  <span>Pickup Location: <strong className="text-slate-900">{car.pickupLocation || car.location}</strong></span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Price & Action Button */}
            <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4 mt-auto">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Daily Rental Price</span>
                <div className="flex items-baseline text-slate-900 font-black text-3xl">
                  <FiDollarSign className="text-lg text-slate-500 self-center" />
                  {car.dailyPrice || car.price}
                </div>
              </div>

              <button
                onClick={handleBookingClick}
                disabled={car.availabilityStatus === "Unavailable" || car.availability === "Unavailable"}
                className={`flex items-center gap-2 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm cursor-pointer active:scale-95 ${
                  car.availabilityStatus !== "Unavailable" && car.availability !== "Unavailable"
                    ? "bg-[#00B488] hover:bg-[#009670] text-white shadow-emerald-500/10"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <FiBookmark />
                Book Now
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal Setup */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={car}
        userEmail={loggedInUserEmail}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}

export default CarDetailsPage;