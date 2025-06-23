// components/admin/TopSellingProducts.tsx
import React from "react";

const topSelling = [
  { name: "Wireless Earbuds", quantity: 120 },
  { name: "Smartwatch", quantity: 95 },
  { name: "Bluetooth Speaker", quantity: 83 },
];

const TopSellingProducts = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full">
      <h3 className="text-lg font-semibold mb-4">📈 Top Selling Products</h3>
      <ul className="space-y-2">
        {topSelling.map((item, index) => (
          <li
            key={index}
            className="flex justify-between text-gray-700 border-b pb-2"
          >
            <span>{item.name}</span>
            <span className="font-medium">{item.quantity} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProducts;
