const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./Routes/auth");
const imageRoutes = require("./Routes/imageRoutes");

const PORT = 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/shoppingWebsite", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
