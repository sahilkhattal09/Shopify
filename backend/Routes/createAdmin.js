const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
mongoose
  .connect("mongodb://localhost:27017/shoppingWebsite", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function createAdmin() {
  const email = "admin@example.com";
  const plainPassword = "Admin@123";

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("❌ Admin already exists");
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new User({
      FirstName: "Admin",
      LastName: "User",
      email: email,
      phonenumber: "9999999999", // dummy number
      Password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully");
    console.log("➡ Email:", email);
    console.log("➡ Password:", plainPassword);
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
