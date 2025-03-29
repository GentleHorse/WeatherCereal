"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { useFetchWeatherData } from "@/hook/useFetchWeatherData.js";
import { APP_STATE, useStore } from "@/stores/store.js";

const CITY_NAME = "Paris";

export default function ThreeScene() {
  const { isFetching, error, weatherData } = useFetchWeatherData(CITY_NAME);

  const { appState, changeAppState } = useStore((state) => state);

  console.log(appState);

  return (
    <>
      <Canvas
        flat
        shadows
        gl={{ antialias: false }}
        camera={{ position: [10, 25, 25], near: 10, far: 55, fov: 12 }}
      >
        <Experience weatherData={weatherData} city={CITY_NAME} />
      </Canvas>

      <section className="absolute top-0">
        <button
          className="m-2 p-2 rounded-xl bg-pink-900 text-pink-200"
          onClick={() => {
            changeAppState(APP_STATE.PLAY);
          }}
        >
          Play
        </button>
        <button
          className="m-2 p-2 rounded-xl bg-amber-600 text-amber-200"
          onClick={() => {
            changeAppState(APP_STATE.TEMP);
          }}
        >
          Temp
        </button>
        <button
          className="m-2 p-2 rounded-xl bg-blue-950 text-blue-200"
          onClick={() => {
            changeAppState(APP_STATE.PRECIPITATION);
          }}
        >
          Precipitation
        </button>
      </section>

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
