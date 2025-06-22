// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/LogIn";
import Dashboard from "./Pages/Dashboard";
import Cart from "./Pages/Cart";
import UploadProduct, {
  ProductState,
} from "./admin/adminComponents/UploadProduct";

// You need to create this page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Unauthorized from "./Pages/Unauthorized";
import ProtectedRoute from "./Routes/protectedRoute";
import AdminDashboard from "./admin/adminComponents/AdminDashboard";

export default function App() {
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
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/admin/product-upload"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UploadProduct product={product} setProduct={setProduct} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}
