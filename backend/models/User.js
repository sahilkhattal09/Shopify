const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true }, // Ensure this matches the field name in your frontend
  Password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
