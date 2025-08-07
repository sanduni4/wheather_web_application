import { useEffect, useState } from "react";
import "../App.css";

function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search state

  useEffect(() => {
    fetch("http://localhost:5000/weather")
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  }, []);

  const filteredData = weatherData.filter(city =>
    city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading weather data...</p>;

  return (
    <div className="weather-container">
      <h1> ⛅ Weather App </h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search city..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">Search</button>
      </div>


      <div className="card-grid">
        {filteredData.map((city, index) => (
          <div
            className={`weather-card-${city.status.toLowerCase().replace(/\s+/g, "-")}`}
            key={index}
          >
            <h3>{city.cityName}</h3>
            <p>🌡 Temp: {city.temp}°C</p>
            <p>🌤 Status: {city.status}</p>

            <div className="description-container">
            <p>pressure:{city.pressure}</p>
            <p>humidity:{city.humidity}</p>
            <p>visibility:{city.visibility}</p>
            <p>sunset:{city.sunset}</p>
            <p>sunrise:{city.sunrise}</p>
            <p>wind_speed:{city.wind_speed}</p>
            <p>wind_deg:{city.wind_deg}</p>
            </div>
          </div>

          

        ))}
      </div>
    </div>

  );
}

export default WeatherDisplay;
