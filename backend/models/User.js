const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true },
  Password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"], // Only allow "user" or "admin"
    default: "user", // By default, every new account is a user
  },
});

module.exports = mongoose.model("User", userSchema);
