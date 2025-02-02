// src/Services/StaticUtils.ts

const API_BASE_URL = "http://localhost:5000/api"; // Change this to your production URL when needed

const StaticUtils = {
  accountsURL: `${API_BASE_URL}/auth`, // URL for authentication-related endpoints
  productsURL: `${API_BASE_URL}/products`, // URL for product-related endpoints (add this if you implement products)
  // Add more URLs as needed
};

export default StaticUtils;
