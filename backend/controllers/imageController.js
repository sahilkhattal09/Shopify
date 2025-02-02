const Image = require("../models/Image"); // Image model

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    const { file } = req;
    const image = new Image({
      name: file.originalname, // You can store the original name or any identifier
      data: file.buffer, // Store image data as Buffer
      contentType: file.mimetype, // MIME type of the image (e.g., image/png)
      price: req.body.price, // Assuming price is passed in the request body
    });

    await image.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};

// Get Images
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find(); // Fetch all images from the database
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
};
