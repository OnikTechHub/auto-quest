"use client";
import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiMapPin, FiDollarSign, FiX, FiPlus } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const MyCarsPage = () => {
  
  const userEmail = "test@gmail.com"; 

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  
  const initialFormState = {
    carName: "",
    carType: "SUV",
    dailyPrice: "",
    pickupLocation: "",
    carImage: "",
    availabilityStatus: "Available",
    description: "",
    userEmail: userEmail 
  };
  const [formData, setFormData] = useState(initialFormState);

  const fetchMyCars = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/my-cars?email=${userEmail}`);
      const data = await response.json();
      if (data.success) {
        setCars(data.data);
      }
    } catch (error) {
      console.error("Error fetching my cars:", error);
      toast.error("Failed to load your cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  const handleAddClick = () => {
    setFormData(initialFormState); 
    setModalType("add");
    setShowFormModal(true);
  };

  const handleEditClick = (car) => {
    setFormData({ ...car }); 
    setModalType("edit");
    setShowFormModal(true);
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        
        const response = await fetch("http://localhost:5000/api/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          toast.success("New car added to your garage!");
          fetchMyCars();
          setShowFormModal(false);
        } else {
          toast.error("Failed to add car.");
        }
      } else {

        const response = await fetch(`http://localhost:5000/api/cars/${formData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Car details updated successfully!");
          fetchMyCars();
          setShowFormModal(false);
        } else {
          toast.error("Failed to update car.");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${deleteId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Car removed from fleet successfully!");
        setCars(cars.filter((car) => car._id !== deleteId));
      } else {
        toast.error("Failed to delete car.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred during deletion.");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#00B488] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm animate-pulse">Loading your garage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Added Cars</h1>
            
          </div>
          <button 
            onClick={handleAddClick}
            className="inline-flex items-center gap-2 bg-[#00B488] hover:bg-[#009670] text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-emerald-500/10 active:scale-95 transition-all self-start sm:self-center cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> Add New Car
          </button>
        </div>

        {cars.length === 0 ? (

          <div className="text-center bg-white border border-slate-100 rounded-3xl p-12 max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 font-medium mb-4">Manage, update, or expand your personal rental fleet seamlessly.</p>
            
          </div>
        ) : (

          // main car

          <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="p-5">Car Details</th>
                    <th className="p-5">Type</th>
                    <th className="p-5">Price / Day</th>
                    <th className="p-5">Location</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700 text-sm">
                  {cars.map((car) => (
                    <tr key={car._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5 flex items-center gap-4">
                        <img src={car.carImage} alt={car.carName} className="w-16 h-12 object-cover rounded-lg bg-slate-50 border border-slate-100" onError={(e)=>{e.target.src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500"}} />
                        <div>
                          <p className="font-bold text-slate-800">{car.carName}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            car.availabilityStatus === "Available" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                          }`}>{car.availabilityStatus}</span>
                        </div>
                      </td>
                      <td className="p-5 font-medium text-slate-500">{car.carType}</td>
                      <td className="p-5 font-bold text-slate-800">
                        <span className="inline-flex items-center"><FiDollarSign className="text-xs" />{car.dailyPrice}</span>
                      </td>
                      <td className="p-5 text-slate-500 max-w-[150px] truncate">{car.pickupLocation}</td>
                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleEditClick(car)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit Car">
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteClick(car._id)} className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors" title="Delete Car">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* modal 1 */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Are you absolutely sure?</h3>
              <p className="text-slate-500 text-sm mt-2">This vehicle will be permanently removed from your garage registry.</p>
              <div className="flex items-center gap-3 mt-6">
                <button onClick={() => setShowDeleteModal(false)} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-sm transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* model 2 */}

        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative my-auto animate-scaleUp">
              <button onClick={() => setShowFormModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-all">
                <FiX className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-slate-800 mb-6">
                {modalType === "add" ? "Add New Vehicle" : "Update Car Details"}
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Car Name</label>
                  <input type="text" required value={formData.carName} onChange={(e) => setFormData({ ...formData, carName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border text-slate-800 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="e.g., Tesla Model S" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Car Type</label>
                    <select value={formData.carType} onChange={(e) => setFormData({ ...formData, carType: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border text-slate-800 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all cursor-pointer">
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Hatchback">Hatchback</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Daily Price ($)</label>
                    <input type="number" required value={formData.dailyPrice} onChange={(e) => setFormData({ ...formData, dailyPrice: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border text-slate-800 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="Rent cost" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Pickup Location</label>
                  <input type="text" required value={formData.pickupLocation} onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border text-slate-800 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="City or area name" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Car Image URL</label>
                  <input type="url" required value={formData.carImage} onChange={(e) => setFormData({ ...formData, carImage: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border text-slate-800 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all" placeholder="https://..." />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Availability Status</label>
                  <select value={formData.availabilityStatus} onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border text-slate-800 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all cursor-pointer">
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">Description</label>
                  <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border text-slate-800 focus:border-[#00B488] rounded-xl text-sm outline-none transition-all resize-none" placeholder="Provide a brief specifications description..."></textarea>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button type="button" onClick={() => setShowFormModal(false)} className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="w-full py-3 bg-[#00B488] hover:bg-[#009670] text-white font-bold rounded-xl text-sm transition-colors shadow-md">
                    {modalType === "add" ? "Save Vehicle" : "Update Details"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyCarsPage;