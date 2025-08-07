// backend/server.js
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const weatherRouter = require("./routes/weatherRouter");
const authRouter = require("./routes/authRouter");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend origins
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/weather", weatherRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Weather API with Auth0 is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});