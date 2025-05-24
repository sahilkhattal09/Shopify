import React from "react";
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
  imageFile: File | null; // Allow imageFile to be a File or null
}
interface UploadProductProps {
  product: ProductState;
  setProduct: React.Dispatch<React.SetStateAction<ProductState>>;
}

const UploadProduct: React.FC<UploadProductProps> = ({
  product,
  setProduct,
}) => {
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

      // Reset form after submission
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
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>
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
          value={product.price}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          type="number"
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

        {/* File Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadProduct;
