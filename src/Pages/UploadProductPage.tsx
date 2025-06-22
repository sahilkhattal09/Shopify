// src/Pages/Admin/UploadProductPage.tsx
import React, { useState } from "react";
import UploadProduct from "../admin/adminComponents/UploadProduct";

// Import ProductState interface from where it's defined
import { ProductState } from "../admin/adminComponents/UploadProduct";

const UploadProductPage = () => {
  // Initial product state for form fields, with correct types
  const [product, setProduct] = useState<ProductState>({
    name: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: "",
    description: "",
    imageFile: null, // This can be File | null
  });

  return <UploadProduct product={product} setProduct={setProduct} />;
};

export default UploadProductPage;
