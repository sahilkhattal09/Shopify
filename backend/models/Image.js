const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer, // This will be your image data, in base64 or binary format
  contentType: String, // Type of the image (e.g., 'image/jpeg', 'image/png')
  price: Number, // The price associated with the product
  category: String,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
