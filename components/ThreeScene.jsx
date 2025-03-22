"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { useFetchWeatherData } from "@/hook/useFetchWeatherData.js";

export default function ThreeScene() {
  const { isFetching, error, weatherData } = useFetchWeatherData("tokyo");

  return (
    <>
      <Canvas camera={{ position: [2, 2, 2] }}>
        <Experience />
      </Canvas>

      <section className="absolute top-10 left-14">
        {!isFetching &&
          weatherData &&
          weatherData.hourly.map((data, index) => (
            <div key={index} className="mb-10">
              <h1 className="font-bold text-xl">
                {new Date(data.dt * 1000).toString()}
              </h1>
              <p>Weather: {data.weather[0].main}</p>
              <p>Temperature: {data.temp}°C</p>
              <p>Humidity: {data.humidity}%</p>
              <p>Wind Speed: {data.wind_speed}MPH</p>
            </div>
          ))}
      </section>
    </>
  );
}
