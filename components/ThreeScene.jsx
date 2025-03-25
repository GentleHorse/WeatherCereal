"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { useFetchWeatherData } from "@/hook/useFetchWeatherData.js";

const CITY_NAME = "Amsterdam";

export default function ThreeScene() {
  const { isFetching, error, weatherData } = useFetchWeatherData(CITY_NAME);

  return (
    <>
      <Canvas
        flat
        shadows
        gl={{ antialias: false }}
        camera={{ position: [-20, 25, -10], near: 30, far: 55, fov: 12 }}
      >
        <Experience weatherData={weatherData} city={CITY_NAME} />
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
