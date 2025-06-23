const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("Received data:", req.body); // Log the incoming data

  const { FirstName, LastName, email, phonenumber, Password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log("Hashed password:", hashedPassword); // Log the hashed password

    // Create a new user
    const newUser = new User({
      FirstName,
      LastName,
      email,
      phonenumber, // Match this with your schema
      Password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    const token = generateToken(newUser._id);

    // Send token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error); // Log the error to the console
    res.status(500).json({ error: "Internal server error" });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { email, Password } = req.body;

  try {
    if (!email || !Password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Sign in successful",
      user: {
        id: user._id,
        FirstName: user.FirstName,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}); // ← Make sure this closes the `router.post(...)` function

// ✅ Final closing bracket for the file
module.exports = router;
