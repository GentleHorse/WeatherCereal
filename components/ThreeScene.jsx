"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { APP_STATE, useStore } from "@/stores/store.js";
import Modal from "./modal/Modal.jsx";

export default function ThreeScene() {
  const { appState, changeAppState } = useStore((state) => state);
  const [city, setCity] = useState("");
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [weather, setWeather] = useState();
  const [open, setOpen] = useState(false);
  const [showDataRelatedModels, setShowDataRelatedModels] = useState(true);

  function modalCloseHandler() {
    setOpen(false);
    changeAppState(APP_STATE.PLAY);
  }

  useEffect(() => {
    if (appState === APP_STATE.MENU) setOpen(true);
  }, [appState]);

  function cityInputHandler(event) {
    setCity(event.target.value);
  }

  async function changeCity() {
    setIsFetching(true);
    setShowDataRelatedModels(false);

    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setShowDataRelatedModels(true);
        modalCloseHandler();
      } else {
        setError({ message: data.message || "Error fetching weather data" });
      }
    } catch (error) {
      setError({ message: error.message || "Failed to fetch weather data" });
    }

    setIsFetching(false);
  }

  console.log(appState);

  return (
    <>
      <Canvas
        flat
        shadows
        gl={{ antialias: false }}
        camera={{ position: [10, 25, 25], near: 10, far: 55, fov: 12 }}
      >
        <Experience
          weatherData={weather}
          city={city.toUpperCase()}
          showDataRelatedModels={showDataRelatedModels}
        />
      </Canvas>

      <Modal
        open={open}
        onClose={modalCloseHandler}
        className="absolute m-auto w-[90vw] h-[90vh] pt-[5vh] rounded-2xl backdrop-blur-md bg-[#C1C1C1]/45"
      >
        <h1>**TITLE PLACE HOLDER**</h1>
        <input
          className="focus:outline-none bg-blue-100"
          type="text"
          placeholder="City Name?"
          value={city}
          onChange={cityInputHandler}
        />
        <button
          className="focus:outline-none m-2 p-3 bg-cyan-200 rounded-2xl"
          onClick={changeCity}
        >
          Check Weather
        </button>
        <button
          className="focus:outline-none m-2 p-3 bg-purple-200 rounded-2xl"
          onClick={modalCloseHandler}
        >
          Go Back
        </button>
      </Modal>

      {/* ------ FOR BEBUG ---------------  */}
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
    </>
  );
}

// Memo ------------------------------------------------
{
  /* <section className="absolute top-10 left-14">
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
      </section> */
}
