import { useEffect, useState } from 'react';

function App() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/weather')
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Weather Info</h1>
      {weather.map((city, index) => (
        <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h2>{city.name}</h2>
          <p>Temperature: {city.temp}°C</p>
          <p>Condition: {city.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
