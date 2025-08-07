const express = require("express");
const cors = require("cors");
const weatherRoute = require("./routes/weatherRouter");
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "Weather API Server is running!",
    endpoints: {
      weather: "/weather - Get all cities weather data"
    },
    status: "OK"
  });
});


app.use("/weather", weatherRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Weather endpoint: http://localhost:${PORT}/weather`);
});