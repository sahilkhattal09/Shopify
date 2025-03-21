const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * Generates a JWT token for a user
 * @param {string} userId - The ID of the user
 * @returns {string} A JWT token as a string
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;
