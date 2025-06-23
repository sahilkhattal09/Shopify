import React from "react";
import { FiRotateCcw } from "react-icons/fi";

const returnedProducts = [
  { name: "Fitness Tracker", returns: 12 },
  { name: "Wireless Charger", returns: 9 },
  { name: "LED Monitor", returns: 5 },
];

const ReturnedProductsCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <FiRotateCcw className="text-red-500 text-xl" />
        <h3 className="text-lg font-semibold text-gray-800">
          Returned Products
        </h3>
      </div>

      <ul className="space-y-3">
        {returnedProducts.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between text-gray-700 border-b pb-2"
          >
            <span>{item.name}</span>
            <span className="font-medium">{item.returns} returns</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReturnedProductsCard;
