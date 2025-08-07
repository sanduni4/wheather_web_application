import { useEffect, useState } from "react";


function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading weather data...</p>;

  return (
    <div className="weather-container">
      <h2>🌍 Global Weather Report</h2>
      <div className="card-grid">
        {weatherData.map((city, index) => (
          <div className="weather-card" key={index}>
            <h3>{city.cityName}</h3>
            <p>🌡 Temp: {city.temp}°C</p>
            <p>🌤 Status: {city.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
