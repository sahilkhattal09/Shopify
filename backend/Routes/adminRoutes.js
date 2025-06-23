const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({
    message: "Welcome to the admin dashboard",
    user: req.user,
  });
});

module.exports = router;
