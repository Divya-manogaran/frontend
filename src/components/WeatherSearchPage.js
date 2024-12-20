import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/WeatherSearch.css';

const WeatherSearchPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  // Fetch weather data from the API
  const searchWeather = async () => {
    if (!city) {
      alert("Please enter a city.");
      return;
    }

    try {
      const response = await axios.get(
        `https://backend-2-0acq.onrender.com/api/weather/forecast?city=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching weather data.");
    }
  };

  // Add city to favorites
  const addToFavorites = () => {
    if (!city) {
      alert("Please search for a city before adding to favorites.");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${city} added to favorites!`);
    } else {
      alert(`${city} is already in favorites.`);
    }
  };

  return (
    <div className="weather-search">
      <h2>Search Weather</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={searchWeather}>Search</button>

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </div>
      )}
<br></br>
      <button onClick={() => navigate("/favorite-weather")}>
        Go to Favorites
      </button>
    </div>
  );
};

export default WeatherSearchPage;
