import React, { useRef, useState } from "react";
import axios from "axios";
import TextField from "../../Components/UI/Textfield/Textfield";
import Button from "../../Components/UI/Button/Button";

export interface ProductState {
  name: string;
  price: string;
  stock: string;
  imageUrl: string;
  category: string;
  description: string;
  imageFile: File | null;
}

interface UploadProductProps {
  product: ProductState;
  setProduct: React.Dispatch<React.SetStateAction<ProductState>>;
}

const UploadProduct: React.FC<UploadProductProps> = ({
  product,
  setProduct,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct((prev) => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("description", product.description);
    formData.append("category", product.category);

    if (product.imageFile) {
      formData.append("image", product.imageFile);
    } else if (product.imageUrl) {
      formData.append("imageUrl", product.imageUrl);
    }

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");

      setProduct({
        name: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: "",
        description: "",
        imageFile: null,
      });
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white border rounded-md shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
        />
        <TextField
          label="Category ID"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
        />

        {/* Drag-and-Drop File Upload */}
        <div
          className={`w-full border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {product.imageFile ? (
            <p className="text-sm text-green-700 font-medium">
              Selected: {product.imageFile.name}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Drag & drop image here, or click to select
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadProduct;
