import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage } from "react-icons/fi";

const AdminCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/product-upload");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <FiPackage className="text-blue-500 text-xl" />
        <h3 className="text-lg font-semibold text-gray-800">Products</h3>
      </div>

      <p className="text-sm text-gray-700 mb-4">Add and manage store items</p>

      <button
        onClick={handleClick}
        className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Upload Product
      </button>
    </div>
  );
};

export default AdminCard;
