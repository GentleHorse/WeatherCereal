"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { useFetchWeatherData } from "@/hook/useFetchWeatherData.js";

export default function ThreeScene() {
  const { isFetching, error, weatherData } = useFetchWeatherData("milan");

  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [2, 7, 2],
        }}
      >
        <Experience weatherData={weatherData}  />
      </Canvas>

      {/* <section className="absolute top-10 left-14">
        {!isFetching &&
          weatherData &&
          weatherData.hourly.map((data, index) => (
            <div key={index} className="mb-10">
              <h1 className="font-bold text-xl">
                {new Date(data.dt * 1000).toString()}
              </h1>
              <p>Weather: {data.weather[0].main}</p>
              <p>Temperature: {data.temp}°C</p>
              <p>Precipitation: {data.rain?.["1h"] || "0.00"} mm/h</p>
            </div>
          ))}
      </section> */}
    </>
  );
}
