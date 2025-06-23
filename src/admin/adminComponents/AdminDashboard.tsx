import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AppBar from "./AppBar";
import AdminCard from "./AdminCard";
import UploadProduct, { ProductState } from "./UploadProduct";

export default function AdminDashboard() {
  const [product, setProduct] = useState<ProductState>({
    name: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: "",
    description: "",
    imageFile: null,
  });

  return (
    <div className="h-screen flex flex-col">
      {/* Top App Bar */}
      <AppBar />

      {/* Sidebar + Content (side by side) */}
      <div className="flex flex-1">
        {/* Sidebar - fixed width */}
        <div className="w-64">
          <AdminSidebar />
        </div>

        {/* Content area - fills remaining space */}
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">
          <AdminCard />
        </div>
      </div>
    </div>
  );
}
