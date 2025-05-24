import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/LogIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard";
import Cart from "./Pages/Cart";
import UploadProduct, {
  ProductState,
} from "./admin/adminComponents/ProductUpload";
import AdminRoutes from "./admin/AdminRoutes";
import React, { useState } from "react";

export default function App() {
  // Define the product state here
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
            <AdminRoutes>
              <UploadProduct product={product} setProduct={setProduct} />
            </AdminRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
