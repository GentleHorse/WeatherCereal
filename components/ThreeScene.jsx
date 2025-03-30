"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { useFetchWeatherData } from "@/hook/useFetchWeatherData.js";
import { APP_STATE, useStore } from "@/stores/store.js";
import Modal from "./modal/Modal.jsx";

const CITY_NAME = "Paris";

export default function ThreeScene() {
  const { isFetching, error, weatherData } = useFetchWeatherData(CITY_NAME);
  const { appState, changeAppState } = useStore((state) => state);
  const [open, setOpen] = useState(false);

  function modalCloseHandler() {
    setOpen(false);
    changeAppState(APP_STATE.PLAY);
  }

  useEffect(() => {
    if (appState === APP_STATE.MENU) setOpen(true);
  }, [appState]);

  console.log(appState);
  console.log(open);

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

      <Modal
        open={open}
        onClose={modalCloseHandler}
        className="absolute m-auto w-[90vw] h-[90vh] pt-[5vh] rounded-2xl backdrop-blur-md bg-[#C1C1C1]/45"
      >
        <h1>This is modal</h1>
        <button className="focus:outline-none" onClick={modalCloseHandler}>Close</button>
      </Modal>

      <section className="absolute top-0">
        <button
          className="focus:outline-none m-2 p-2 rounded-xl bg-emerald-800 text-emerald-200"
          onClick={() => {
            changeAppState(APP_STATE.MENU);
          }}
        >
          Menu
        </button>
        <button
          className="focus:outline-none m-2 p-2 rounded-xl bg-pink-900 text-pink-200"
          onClick={() => {
            changeAppState(APP_STATE.PLAY);
          }}
        >
          Play
        </button>
        <button
          className="focus:outline-none m-2 p-2 rounded-xl bg-amber-600 text-amber-200"
          onClick={() => {
            changeAppState(APP_STATE.TEMP);
          }}
        >
          Temp
        </button>
        <button
          className="focus:outline-none m-2 p-2 rounded-xl bg-blue-950 text-blue-200"
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
