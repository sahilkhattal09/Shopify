import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../Components/Productlist/ProductList";
import { Product } from "../types/productType"; // ✅ Ensure correct path

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]); // ✅ Typed state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchQuery) return;

    const controller = new AbortController();
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:5000/products?search=${searchQuery}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Error fetching products. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [searchQuery]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : "No search query provided"}
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </div>
  );
};

export default SearchResults;
