"use client";

import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { APP_STATE, useStore } from "@/stores/store.js";
import Modal from "./modal/Modal.jsx";

export default function ThreeScene() {
  const { appState, changeAppState } = useStore((state) => state);
  const userInputCityName = useRef();

  const [open, setOpen] = useState(false);
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
    userInputCityName.current.value = "";
    setError("");
    setShowDataRelatedModels(true);
    changeAppState(APP_STATE.PLAY);
  }

  async function changeCity() {
    setIsFetching(true);
    setShowDataRelatedModels(false);

    try {
      const response = await fetch(
        `/api/weather?city=${userInputCityName.current.value}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setCity(userInputCityName.current.value);
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
            ref={userInputCityName}
            className={`focus:outline-none px-2 py-4 w-4/5 text-center rounded-2xl ${
              error ? "text-pink-600 bg-pink-300" : "text-blue-950 bg-blue-100"
            }`}
            type="text"
            placeholder="City Name?"
          />
          {error && <p className="text-pink-600">{error.message}</p>}
          <div className="flex flex-row">
            {!isFetching ? (
              <button
                className="focus:outline-none hover:cursor-pointer p-3 bg-orange-500 text-orange-50 rounded-2xl"
                onClick={changeCity}
              >
                Check Weather
              </button>
            ) : (
              <button
                disabled
                className="focus:outline-none hover:cursor-pointer p-3 bg-blue-800 text-blue-50 rounded-2xl"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            )}

            <button
              className="focus:outline-none hover:cursor-pointer p-3 text-slate-700 rounded-2xl"
              onClick={modalCloseHandler}
              disabled={isFetching ? true : false}
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
