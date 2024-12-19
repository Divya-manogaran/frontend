import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import WeatherSearchPage from './components/WeatherSearchPage';
import Favorites from './components/Favorites';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather-search" element={<WeatherSearchPage />} />
        <Route path="/favorite-weather" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
