"use client";
import { useState } from "react";
import axios from "axios";
import { FaMagnifyingGlass, FaWind, FaDroplet } from "react-icons/fa6";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

interface WeatherMiniProps {
  apiKey: string;
  accessKey: string; // Chave da Unsplash
}

export default function WeatherMini({ apiKey, accessKey }: WeatherMiniProps) {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [background, setBackground] = useState<string>("");

  const getWeatherData = async (city: string) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    try {
      const res = await axios.get(apiWeatherURL);
      setWeatherData(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  const fetchPhotos = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`
      );
      const data = response.data;
      if (data.results.length > 0) {
        setBackground(data.results[0].urls.regular);
      }
    } catch (error) {
      console.error("Error fetching Unsplash photo:", error);
      setBackground("");
    }
  };

  const handleSearch = () => {
    if (city) {
      getWeatherData(city);
      fetchPhotos(city);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="bg-dark-blue/20 p-4 rounded-lg flex flex-col items-center justify-between h-full bg-cover bg-center"
      style={{ backgroundImage: background ? `url(${background})` : "none" }}
    >
      <div className="flex items-center w-full mb-4">
        <input
          type="text"
          placeholder="Digite uma cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          className="p-2 border border-neon-blue/20 rounded-l text-neon-blue bg-dark-bg flex-1 text-sm"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-neon-green text-dark-blue rounded-r hover:bg-neon-pink transition-colors"
        >
          <FaMagnifyingGlass />
        </button>
      </div>
      {weatherData && (
        <div className="text-center text-neon-blue w-full">
          <div className="flex items-center justify-center mb-2">
            <img
              src={`https://flagsapi.com/${weatherData.sys.country}/flat/32.png`}
              alt={`${weatherData.sys.country} flag`}
              className="mr-2"
            />
            <p className="text-lg font-bold">{weatherData.name}</p>
          </div>
          <p className="text-xl">{Math.round(weatherData.main.temp)}°C</p>
          <div className="flex items-center justify-center mb-2">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className="mr-1"
            />
            <p className="text-sm capitalize">
              {weatherData.weather[0].description}
            </p>
          </div>
          <div className="flex justify-around text-sm">
            <p className="flex items-center">
              <FaDroplet className="mr-1" />
              {weatherData.main.humidity}%
            </p>
            <p className="flex items-center">
              <FaWind className="mr-1" />
              {weatherData.wind.speed} km/h
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
