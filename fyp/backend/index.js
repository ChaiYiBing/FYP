const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});