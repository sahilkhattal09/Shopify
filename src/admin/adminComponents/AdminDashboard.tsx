import React from "react";
import AdminCard from "./cards/AdminCard";
import TopSellingProducts from "./TopSellingProducts";
import ReturnedProductsCard from "./cards/ReturnedProductsCard";
import MostOrderedProductsCard from "./cards/MostOrderedProductsCard";
import { FiPackage } from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-gray-50 overflow-auto h-full">
      {/* Admin Cards */}
      <div className="flex justify-evenly gap-4">
        <AdminCard />

        <ReturnedProductsCard />
        <MostOrderedProductsCard />
      </div>

      {/* Top Selling Products */}
      <div className="mt-12">
        <TopSellingProducts />
      </div>
    </div>
  );
}
