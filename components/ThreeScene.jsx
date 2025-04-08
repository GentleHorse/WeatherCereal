"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { APP_STATE, useStore } from "@/stores/store.js";
import Experience from "./Experience.jsx";
import Modal from "./modal/Modal.jsx";
import LoadingScene3D from "./loadingScene/LoadingScene3D.jsx";
import AudioConsentScreen from "./weatherAudio/AudioConsentScreen.jsx";

export default function ThreeScene() {
  const { appState, changeAppState, audioEnabled, changeAudioEnabled } =
    useStore((state) => state);
  const userInputCityName = useRef();

  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [weather, setWeather] = useState(null);
  const [showDataRelatedModels, setShowDataRelatedModels] = useState(true);

  /**
   * SET DATA BASED ON GEO LOCATION - INITIAL RENDER ONLY
   */
  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      if (!weather && typeof window !== "undefined") {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              // Send lat/lon to your server-side API (secure!)
              const res = await fetch(
                `/api/weather?lat=${latitude}&lon=${longitude}`
              );
              const data = await res.json();

              if (res.ok) {
                setWeather(data);
                setCity(data.city || ""); // Optional: your API could return the city name too
                changeAppState(APP_STATE.PLAY);
              } else {
                throw new Error(data.message || "Failed to fetch weather");
              }
            } catch (err) {
              console.warn(
                "Weather fetch failed. Ask user for city name:",
                err
              );
              changeAppState(APP_STATE.CITY); // fallback to city modal
            }
          },
          (error) => {
            console.warn("Geolocation denied. Ask user for city name:", error);
            changeAppState(APP_STATE.CITY); // fallback to city modal
          }
        );
      }
    };

    getLocationAndFetchWeather();
  }, []);

  /**
   * MODAL - CITY
   */
  useEffect(() => {
    if (appState === APP_STATE.CITY) setCityModalOpen(true);
  }, [appState]);

  function cityModalCloseHandler() {
    setCityModalOpen(false);
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
        cityModalCloseHandler();
      } else {
        setError({ message: data.message || "Error fetching weather data" });
      }
    } catch (error) {
      setError({ message: error.message || "Failed to fetch weather data" });
    }

    setIsFetching(false);
  }

  /**
   * MODAL - CITY
   */
  useEffect(() => {
    if (appState === APP_STATE.DATA_48H) setDataModalOpen(true);
  }, [appState]);

  function dataModalCloseHandler() {
    setDataModalOpen(false);
    changeAppState(APP_STATE.PLAY);
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
        <Suspense fallback={<LoadingScene3D />}>
          {weather && (
            <Experience
              weatherData={weather}
              city={city.toUpperCase()}
              showDataRelatedModels={showDataRelatedModels}
            />
          )}
        </Suspense>
      </Canvas>

      {appState === APP_STATE.PLAY && <AudioConsentScreen />}

      <Modal
        open={cityModalOpen}
        onClose={cityModalCloseHandler}
        className="absolute m-auto w-[90vw] h-[90vh] pt-[5vh] rounded-2xl backdrop-blur-md bg-[#333333]/45"
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
              onClick={cityModalCloseHandler}
              disabled={isFetching ? true : false}
            >
              Go Back
            </button>
          </div>
        </section>
      </Modal>

      <Modal
        open={dataModalOpen}
        onClose={dataModalCloseHandler}
        className="absolute m-auto w-[90vw] h-[90vh] pt-[5vh] rounded-2xl backdrop-blur-md bg-[#333333]/45"
      >
        <section className="h-full flex flex-col items-center justify-center gap-4">
          <h1 className="font-extrabold text-4xl text-slate-900">Data modal</h1>

          <button
            className="focus:outline-none hover:cursor-pointer p-3 text-slate-700 rounded-2xl"
            onClick={dataModalCloseHandler}
            disabled={isFetching ? true : false}
          >
            Go Back
          </button>
        </section>
      </Modal>

      {appState === APP_STATE.PLAY && (
        <>
          {weather && (
            <section className="absolute bottom-[28px] left-[32px] text-white">
              <h1 className="font-dm-sans-semi-bold text-[96px]/[0.9]">
                {weather.current.temp.toFixed(1)}°C
              </h1>
              <div className="ml-2">
                <p className="mb-[20px] font-dm-sans-bold text-[32px]">
                  {city.charAt(0).toUpperCase() +
                    city.slice(1).toLocaleLowerCase()}
                </p>
                <div className="font-mono text-[14px]">
                  <p>Feels like: {weather.current.feels_like}°C</p>
                  <p>High: {weather.daily[0].temp.max}°C</p>
                  <p>Low: {weather.daily[0].temp.min}°C</p>
                  <p>
                    Sunrise:{" "}
                    {new Date(weather.daily[0].sunrise * 1000)
                      .getHours()
                      .toString()}
                    :
                    {new Date(weather.daily[0].sunrise * 1000)
                      .getMinutes()
                      .toString()}
                  </p>
                  <p>
                    Sunset:{" "}
                    {new Date(weather.daily[0].sunset * 1000)
                      .getHours()
                      .toString()}
                    :
                    {new Date(weather.daily[0].sunset * 1000)
                      .getMinutes()
                      .toString()}
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="absolute top-6 right-6">
            <button
              className="focus:outline-none hover:cursor-pointer"
              onClick={() => {
                if (audioEnabled) changeAudioEnabled(false);
                if (!audioEnabled) changeAudioEnabled(true);
              }}
            >
              <img
                src={`/images/play-state/audio-${
                  audioEnabled ? "on" : "off"
                }.svg`}
                className="w-[50px] h-[50px] opacity-70"
              />
            </button>
          </section>

          <section className="absolute bottom-[38px] right-[48px] flex flex-col items-center justify-center gap-[30px]">
            <button
              className="relative focus:outline-none hover:cursor-pointer"
              onClick={() => {
                changeAppState(APP_STATE.CITY);
              }}
            >
              <img
                src={`/images/play-state/cityscape.svg`}
                className="w-[50px] h-[50px] opacity-70"
              />
              <p className="absolute bottom-[-18px] right-[-12px] font-poppins-bold text-[20px] text-white">City</p>
            </button>
            <button
              className="relative focus:outline-none hover:cursor-pointer"
              onClick={() => {
                changeAppState(APP_STATE.DATA_48H);
              }}
            >
              <img
                src={`/images/play-state/weather.svg`}
                className="w-[50px] h-[50px] opacity-70"
              />
              <p className="absolute bottom-[-10px] right-[-12px] font-poppins-bold text-[20px] text-white">48h</p>
            </button>
          </section>
        </>
      )}
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
