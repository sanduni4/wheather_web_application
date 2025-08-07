import { useEffect, useState } from "react";
import "../App.css";

function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search state
  const [selectedCity, setSelectedCity] = useState(null); // For detailed view

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

  // Function to get weather icon based on status
  const getWeatherIcon = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('clear')) return '☀️';
    if (statusLower.includes('cloud')) return '☁️';
    if (statusLower.includes('rain')) return '🌧️';
    if (statusLower.includes('thunderstorm')) return '⛈️';
    if (statusLower.includes('snow')) return '❄️';
    if (statusLower.includes('mist') || statusLower.includes('fog') || statusLower.includes('haze')) return '🌫️';
    return '🌤️'; // default
  };

  // Function to format time
  const formatTime = (timeString) => {
    if (!timeString) return '';
    // Assuming timeString is in format like "6:05am" 
    return timeString;
  };

  // Function to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    const date = now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    return `${time}, ${date}`;
  };

  // Function to handle card click
  const handleCardClick = (city) => {
    setSelectedCity(city);
  };

  // Function to close detailed view
  const handleCloseDetail = () => {
    setSelectedCity(null);
  };

  const filteredData = weatherData.filter(city =>
    city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading">Loading weather data...</p>;

  // If a city is selected, show detailed view
  if (selectedCity) {
    return (
      <div className="weather-container">
        <div className="detailed-view">
          <div className={`detailed-weather-card weather-card-${selectedCity.status.toLowerCase().replace(/\s+/g, "-")}`}>
            {/* Back button */}
            <button className="back-btn" onClick={handleCloseDetail}>
              ← 
            </button>
            
            {/* Detailed Card Header */}
            <div className="detailed-card-header">
              <h2 className="detailed-city-name">{selectedCity.cityName}</h2>
              <p className="detailed-date-time">{getCurrentDateTime()}</p>
              
              <div className="detailed-weather-main">
                <div className="detailed-weather-left">
                  <span className="detailed-weather-icon">{getWeatherIcon(selectedCity.status)}</span>
                  <span className="detailed-weather-status">{selectedCity.status}</span>
                </div>
                
                <div className="detailed-temperature-section">
                  <h1 className="detailed-main-temp">{selectedCity.temp}°C</h1>
                  <div className="detailed-temp-range">
                    <p>Temp Min: {selectedCity.temp_min || '25'}°C</p>
                    <p>Temp Max: {selectedCity.temp_max || '28'}°C</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Card Footer */}
            <div className="detailed-card-footer">
              <div className="detailed-weather-details">
                <div className="detailed-detail-item">
                  <p className="detailed-detail-label">Pressure:</p>
                  <p className="detailed-detail-value">{selectedCity.pressure}hPa</p>
                  <p className="detailed-detail-label">Humidity:</p>
                  <p className="detailed-detail-value">{selectedCity.humidity}%</p>
                  <p className="detailed-detail-label">Visibility:</p>
                  <p className="detailed-detail-value">{selectedCity.visibility}km</p>
                </div>
                
                <div className="detailed-wind-section">
                  <span className="detailed-wind-icon">🌬️</span>
                  <div>
                    <p className="detailed-wind-value">{selectedCity.wind_speed}m/s {selectedCity.wind_deg}°</p>
                  </div>
                </div>
                
                <div className="detailed-sun-times">
                  <p className="detailed-detail-label">Sunrise:</p>
                  <p className="detailed-detail-value">{formatTime(selectedCity.sunrise) || '6:05am'}</p>
                  <p className="detailed-detail-label">Sunset:</p>
                  <p className="detailed-detail-value">{formatTime(selectedCity.sunset) || '6:05am'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-container">
      <h1>⛅ Weather App</h1>

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
            className={`weather-card weather-card-${city.status.toLowerCase().replace(/\s+/g, "-")}`}
            key={index}
            onClick={() => handleCardClick(city)}
            style={{ cursor: 'pointer' }}
          >
            {/* Card Header */}
            <div className="weather-card-header">
              <button className="close-btn" onClick={(e) => {
                e.stopPropagation();
                // You can add delete functionality here if needed
              }}>×</button>
              
              <h3 className="city-name">{city.cityName}</h3>
              <p className="date-time">{getCurrentDateTime()}</p>
              
              <div className="weather-main">
                <div className="weather-icon-status">
                  <span className="weather-icon">{getWeatherIcon(city.status)}</span>
                  <span className="weather-status">{city.status}</span>
                </div>
                
                <div className="temperature-section">
                  <h2 className="main-temp">{city.temp}°C</h2>
                  <p className="temp-range">
                    Temp Min: {city.temp_min || 'N/A'}°C<br />
                    Temp Max: {city.temp_max || 'N/A'}°C
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="weather-card-footer">
              <div className="weather-details">
                <div className="detail-item">
                  <p className="detail-label">Pressure:</p>
                  <p className="detail-value">{city.pressure}hPa</p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Humidity:</p>
                  <p className="detail-value">{city.humidity}%</p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Visibility:</p>
                  <p className="detail-value">{city.visibility}km</p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Sunrise:</p>
                  <p className="detail-value">{formatTime(city.sunrise)}</p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Sunset:</p>
                  <p className="detail-value">{formatTime(city.sunset)}</p>
                </div>
                
                <div className="detail-item">
                  <div className="wind-section">
                    <span className="wind-icon">🌬️</span>
                    <div>
                      <p className="detail-label">Wind:</p>
                      <p className="detail-value">{city.wind_speed}m/s {city.wind_deg}°</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;