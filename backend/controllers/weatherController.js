const { fetchWeatherData } = require("../services/weatherService");

const getWeather = async (req, res) => {
  try {
    const data = await fetchWeatherData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { getWeather };
