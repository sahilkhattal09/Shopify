const path = require("path");

const Image = require("../models/Image"); // Image model

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    const { file } = req;
    const imageName = path.parse(file.originalname).name;
    const image = new Image({
      name: file.originalname, // You can store the original name or any identifier
      data: file.buffer, // Store image data as Buffer
      contentType: file.mimetype, // MIME type of the image (e.g., image/png)
      price: req.body.price, // Assuming price is passed in the request body
      category: req.body.category,
    });

    await image.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};
// Get Images with Optional Category Filter
exports.getImages = async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params

    let query = {}; // Default: Get all images
    if (category) {
      query.category = category; // Add category filter if provided
    }

    const images = await Image.find(query); // Fetch images based on query
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Convert buffer data to Base64 string
    const base64Image = `data:${image.contentType};base64,${image.data.toString(
      "base64"
    )}`;

    res.json({ imageUrl: base64Image }); // ✅ Send Base64 image URL
  } catch (error) {
    res.status(500).json({ message: "Error fetching image", error });
  }
};
