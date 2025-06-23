const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, price, stock, imageUrl, description, category } = req.body;

    const validCategory = await Category.findById(category);
    if (!validCategory) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const product = new Product({
      name,
      price,
      stock,
      imageUrl,
      description,
      category,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, price, stock, imageUrl, description, category } = req.body;

    // 🛑 Validate Category (if updated)
    if (category) {
      const validCategory = await Category.findById(category);
      if (!validCategory) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, imageUrl, description, category },
      { new: true } // Return updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query; // Get search query & pagination params

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } }, // Case-insensitive search in name
          { description: { $regex: search, $options: "i" } }, // Case-insensitive search in description
        ],
      };
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .limit(limit * 1) // Convert limit to number
      .skip((page - 1) * limit) // Skip records for pagination
      .exec();

    const total = await Product.countDocuments(filter); // Total matching products

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
