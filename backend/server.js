const express = require("express");
const cors = require("cors");
const weatherRoute = require("./routes/weatherRouter");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "Weather API Server is running!",
    endpoints: {
      weather: "/weather - Get all cities weather data",
      health: "/health - Server health check"
    },
    status: "OK"
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString() 
  });
});

// Weather routes
app.use("/weather", weatherRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Weather endpoint: http://localhost:${PORT}/weather`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});