import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const mostOrdered = [
  { name: "Wireless Mouse", orders: 180 },
  { name: "Gaming Keyboard", orders: 145 },
  { name: "Noise Cancelling Headphones", orders: 132 },
];

const MostOrderedProductsCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <FiShoppingCart className="text-green-500 text-xl" />
        <h3 className="text-lg font-semibold text-gray-800">
          Most Ordered Products
        </h3>
      </div>

      <ul className="space-y-3">
        {mostOrdered.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between text-gray-700 border-b pb-2"
          >
            <span>{item.name}</span>
            <span className="font-medium">{item.orders} orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostOrderedProductsCard;
