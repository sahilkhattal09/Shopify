const express = require("express");
const multer = require("multer");
const { uploadImage, getImages } = require("../controllers/imageController");

const router = express.Router();
const upload = multer(); // To handle file uploads

router.post("/upload", upload.single("image"), uploadImage); // POST route for image upload
router.get("/", getImages); // GET route to fetch all images

module.exports = router;
