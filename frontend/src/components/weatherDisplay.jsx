// frontend/src/components/weatherDisplay.jsx
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import "../App.css";

function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [error, setError] = useState(null);

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        // Get the access token from Auth0
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE || 'https://weather-api',
            scope: "openid profile email",
          },
        });

        // Fetch weather data with the token
        const response = await fetch("http://localhost:5000/weather", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed. Please log in again.');
          } else if (response.status === 403) {
            throw new Error('Access denied. You do not have permission to access this resource.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [getAccessTokenSilently, isAuthenticated]);

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
  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
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

  if (error) {
    return (
      <div className="weather-container">
        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          textAlign: 'center',
          margin: '2rem auto',
          maxWidth: '500px',
        }}>
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                  <span className="detailed-weather-status">{selectedCity.description || selectedCity.status}</span>
                </div>
                
                <div className="detailed-temperature-section">
                  <h1 className="detailed-main-temp">{Math.round(selectedCity.temp)}°C</h1>
                  <div className="detailed-temp-range">
                    <p>Temp Min: {Math.round(selectedCity.temp_min) || 'N/A'}°C</p>
                    <p>Temp Max: {Math.round(selectedCity.temp_max) || 'N/A'}°C</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Card Footer */}
            <div className="detailed-card-footer">
              <div className="detailed-weather-details">
                <div className="detailed-detail-item">
                  <p className="detailed-detail-label">Pressure:</p>
                  <p className="detailed-detail-value">{selectedCity.pressure || 'N/A'}hPa</p>
                  <p className="detailed-detail-label">Humidity:</p>
                  <p className="detailed-detail-value">{selectedCity.humidity || 'N/A'}%</p>
                  <p className="detailed-detail-label">Visibility:</p>
                  <p className="detailed-detail-value">{selectedCity.visibility ? Math.round(selectedCity.visibility / 1000) : 'N/A'}km</p>
                </div>
                
                <div className="detailed-wind-section">
                  <span className="detailed-wind-icon">🌬️</span>
                  <div>
                    <p className="detailed-wind-value">{selectedCity.wind_speed || 'N/A'}m/s {selectedCity.wind_deg || ''}°</p>
                  </div>
                </div>
                
                <div className="detailed-sun-times">
                  <p className="detailed-detail-label">Sunrise:</p>
                  <p className="detailed-detail-value">{formatTime(selectedCity.sunrise)}</p>
                  <p className="detailed-detail-label">Sunset:</p>
                  <p className="detailed-detail-value">{formatTime(selectedCity.sunset)}</p>
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
      {user && (
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.9)', 
          textAlign: 'center', 
          marginBottom: '1rem',
          fontSize: '1.1rem'
        }}>
          Welcome, {user.name}! 🌟
        </p>
      )}

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
                  <span className="weather-status">{city.description || city.status}</span>
                </div>
                
                <div className="temperature-section">
                  <h2 className="main-temp">{Math.round(city.temp)}°C</h2>
                  <p className="temp-range">
                    Temp Min: {city.temp_min ? Math.round(city.temp_min) : 'N/A'}°C<br />
                    Temp Max: {city.temp_max ? Math.round(city.temp_max) : 'N/A'}°C
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="weather-card-footer">
              <div className="weather-details">
                <div className="detail-item">
                  <p className="detail-label">Pressure:</p>
                  <p className="detail-value">{city.pressure || 'N/A'}hPa</p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Humidity:</p>
                  <p className="detail-value">{city.humidity || 'N/A'}%</p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Visibility:</p>
                  <p className="detail-value">{city.visibility ? Math.round(city.visibility / 1000) : 'N/A'}km</p>
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
                      <p className="detail-value">{city.wind_speed || 'N/A'}m/s {city.wind_deg || ''}°</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && weatherData.length > 0 && (
        <div style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '1.1rem'
        }}>
          No cities found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;