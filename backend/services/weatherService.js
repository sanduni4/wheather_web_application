const fs = require("fs");
const axios = require("axios");

let cache = null;
let lastFetched = null;

const API_KEY = "f9f667afb3ff626903f5f90b6181005d"; // Your OpenWeather API key

const fetchWeatherData = async () => {
  const now = Date.now();
  const FIVE_MINUTES = 5 * 60 * 1000;

  if (cache && lastFetched && now - lastFetched < FIVE_MINUTES) {
    return cache;
  }

  try {
    // Read cities.json
    const rawData = JSON.parse(fs.readFileSync("./models/cities.json"));
    const cityList = rawData.List;

    // Prepare an array of promises for each city's weather fetch
    const weatherPromises = cityList.map(async (city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=metric&appid=${API_KEY}`;
      console.log("🌐 Requesting:", url);
      
      try {
        const response = await axios.get(url);
        const data = response.data;

        return {
          cityCode: city.CityCode,
          cityName: data.name,
          temp: data.main.temp,
          status: data.weather[0].main,
        };
      } catch (err) {
        console.error(`Failed to fetch weather for ${city.CityName} (${city.CityCode})`);
        console.error(err.message);
        return {
          cityCode: city.CityCode,
          cityName: city.CityName,
          temp: city.Temp || null,
          status: city.Status || "Unknown",
        };
      }
    });

    // Wait for all promises to resolve
    const result = await Promise.all(weatherPromises);

    cache = result;
    lastFetched = now;
    return result;
  } catch (error) {
    console.error("🌩️ Weather API error:");
    if (error.response) {
      console.error("Status Code:", error.response.status);
      console.error("Response Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received from API.");
    } else {
      console.error("Error Message:", error.message);
    }

    throw new Error("Failed to fetch weather data");
  }
};

module.exports = { fetchWeatherData };
