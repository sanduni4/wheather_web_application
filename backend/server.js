const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const PORT = 5000;
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace this

let cache = null;
let lastFetched = null;

// ✅ Use cors middleware here
app.use(cors());

app.get('/weather', async (req, res) => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  if (cache && lastFetched && now - lastFetched < fiveMinutes) {
    return res.json(cache);
  }

  try {
    const cities = JSON.parse(fs.readFileSync('./cities.json'));
    const cityIds = cities.map(c => c.CityCode).join(',');
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${API_KEY}`
    );

    const result = response.data.list.map(city => ({
      name: city.name,
      temp: city.main.temp,
      description: city.weather[0].description
    }));

    cache = result;
    lastFetched = now;

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
