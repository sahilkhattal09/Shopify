import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage } from "react-icons/fi"; // Product icon

const AdminCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/product-upload");
  };

  return (
    <div className="relative w-52 h-64 text-white cursor-pointer group">
      {/* Glow Layer */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 blur-xl opacity-70 group-hover:scale-105 transition-transform duration-500"></div>

      {/* Card Content */}
      <div className="relative z-10 h-full w-full bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FiPackage className="text-blue-500 text-xl" />
            <h3 className="text-lg font-bold text-black">Products</h3>
          </div>
          <p className="text-sm text-gray-700">Add and manage store items</p>
        </div>

        <button
          onClick={handleClick}
          className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
        >
          Upload Product
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
