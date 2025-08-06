const fs = require("fs");
const axios = require("axios");

let cache = null;
let lastFetched = null;

const API_KEY = "3175ae43020e34d0663f0113e20fa6c0";



const fetchWeatherData = async () => {
    const now = Date.now();
    const FIVE_MINUTES = 5 * 60 * 1000;

    if (cache && lastFetched && now - lastFetched < FIVE_MINUTES) {
        return cache;
    }

    try {
        const rawData = JSON.parse(fs.readFileSync("./models/cities.json"));
        const ids = rawData.List.map(city => Number(city.CityCode)).join(",");


        const url = `https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${API_KEY}`;
        console.log("Requesting:", url); 

        const response = await axios.get(url);

        const result = response.data.list.map(city => ({
            name: city.name,
            temp: city.main.temp,
            description: city.weather[0].description,
        }));

        cache = result;
        lastFetched = now;
        
        return result;

    } catch (error) {
        // Log actual API error
        console.error("Weather API error:", error.response?.data || error.message);
        throw new Error("Failed to fetch weather data");
    }
};


module.exports = { fetchWeatherData };
