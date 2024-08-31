const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/auth");

const PORT = 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/shoppingWebsite", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
