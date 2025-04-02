"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { APP_STATE, useStore } from "@/stores/store.js";
import Modal from "./modal/Modal.jsx";

export default function ThreeScene() {
  const { appState, changeAppState } = useStore((state) => state);

  const [open, setOpen] = useState(false);
  const [userInputCityName, setUserInputCityName] = useState("");
  const [city, setCity] = useState("");
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [weather, setWeather] = useState();
  const [showDataRelatedModels, setShowDataRelatedModels] = useState(true);

  useEffect(() => {
    if (appState === APP_STATE.MENU) setOpen(true);
  }, [appState]);

  function modalCloseHandler() {
    setOpen(false);
    setUserInputCityName("");
    setError("");
    setShowDataRelatedModels(true);
    changeAppState(APP_STATE.PLAY);
  }

  function userInputCityNameHandler(event) {
    setUserInputCityName(event.target.value);
  }

  async function changeCity() {
    setIsFetching(true);
    setShowDataRelatedModels(false);

    try {
      const response = await fetch(`/api/weather?city=${userInputCityName}`);
      const data = await response.json();
      
      if (response.ok) {
        setWeather(data);
        setCity(userInputCityName);
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
        <section className="h-full flex flex-col items-center justify-center gap-4">
          <h1 className="font-extrabold text-4xl text-slate-900">
            Weather Cereal
          </h1>
          <input
            className={`focus:outline-none px-2 py-4 w-4/5 text-center rounded-2xl ${
              error ? "text-pink-600 bg-pink-300" : "text-blue-950 bg-blue-100"
            }`}
            type="text"
            placeholder="City Name?"
            value={userInputCityName}
            onChange={userInputCityNameHandler}
          />
          {error && <p className="text-pink-600">{error.message}</p>}
          <div className="flex flex-row">
            <button
              className="focus:outline-none hover:cursor-pointer p-3 bg-orange-500 text-orange-50 rounded-2xl"
              onClick={changeCity}
            >
              Check Weather
            </button>
            <button
              className="focus:outline-none hover:cursor-pointer p-3 text-slate-700 rounded-2xl"
              onClick={modalCloseHandler}
            >
              Go Back
            </button>
          </div>
        </section>
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
