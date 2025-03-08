const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getImages,
  getImageById,
} = require("../controllers/imageController");

const router = express.Router();

// Multer storage setup (store images in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Image Upload Route
router.post("/upload", upload.single("image"), uploadImage);

// Get Images Route (fetch all images or by category)
router.get("/", getImages);
router.get("/:id", getImageById);

module.exports = router;
