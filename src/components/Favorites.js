import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate();

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);

      // Fetch weather data for each city
      const fetchWeatherData = async () => {
        const data = {};
        for (const city of storedFavorites) {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/weather/forecast?city=${city}`
            );
            data[city] = response.data.main.temp; // Store temperature by city
          } catch (error) {
            console.error(`Error fetching weather for ${city}:`, error);
            data[city] = "N/A"; // Handle error by setting temperature to "N/A"
          }
        }
        setWeatherData(data);
      };

      fetchWeatherData();
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      setFavorites([]); // Fallback to empty array if parsing fails
    }
  }, []);

  // Remove a city from favorites
  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter((item) => item !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Update weather data
    const updatedWeatherData = { ...weatherData };
    delete updatedWeatherData[city];
    setWeatherData(updatedWeatherData);
  };

  return (
    <div className="favorites-page" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {favorites.map((city, index) => (
            <li
              key={`${city}-${index}`} // Ensure unique key by combining city name and index
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "#f9f9f9",
              }}
            >
              <span>
                {city} -{" "}
                {weatherData[city] !== undefined
                  ? `${Math.round(weatherData[city] - 273.15)}°C`
                  : "Loading..."}
              </span>
              <button
                onClick={() => removeFavorite(city)}
                style={{
                  background: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Weather Search
      </button>
    </div>
  );
};

export default FavoritesPage;
