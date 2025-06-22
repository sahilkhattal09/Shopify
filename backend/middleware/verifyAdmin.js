const jwt = require("jsonwebtoken");

// Middleware to verify if the user is admin
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token; // token sent via HTTP-only cookie

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is an admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = decoded; // Save decoded data to req.user
    next();
  } catch (error) {
    console.error("Token error:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;
