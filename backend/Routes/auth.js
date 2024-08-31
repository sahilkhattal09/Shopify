const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

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

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error); // Log the error to the console
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, Password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res
        .status(400)
        .json({ FirstName: user.FirstName, message: "Account not found" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(Password, user.Password);

    // If the password does not match
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If everything is okay, return success
    res
      .status(200)
      .json({ message: "Sign in successful", FirstName: user.FirstName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Export the router
module.exports = router;
