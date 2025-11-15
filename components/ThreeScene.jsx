"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { APP_STATE, useStore } from "@/stores/store.js";
import Experience from "./Experience.jsx";
import Modal from "./modal/Modal.jsx";
import LoadingScene3D from "./loadingScene/LoadingScene3D.jsx";
import AudioConsentScreen from "./weatherAudio/AudioConsentScreen.jsx";
import weatherConditionConverter from "@/utils/weatherConditionConverter.js";
import {
  localTimeFormatter,
  localTimeFormatterHourOnly,
} from "@/utils/localTimeFormatter.js";
import precipitationVisualizationData from "@/utils/precipitationVisualizationData.js";
import hexToRgba from "@/utils/hexToRgba.js";

export default function ThreeScene() {
  const {
    appState,
    changeAppState,
    audioEnabled,
    changeAudioEnabled,
    changeIsDepthOfField,
  } = useStore((state) => state);
  const userInputCityName = useRef();
  const weatherIconVideo = useRef();
  const weatherData48hScroll = useRef();
  const weatherData48hWeatherHorizontalScroll = useRef();
  const weatherData48hPrecipitationHorizontalScroll = useRef();

  const [isClient, setIsClient] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [weather, setWeather] = useState(null);
  const [showDataRelatedModels, setShowDataRelatedModels] = useState(true);

  const isIOS =
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Check whether client is rendered or not
  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * SET DATA BASED ON GEO LOCATION - INITIAL RENDER ONLY
   */
  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      if (!weather && isClient) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const res = await fetch(
                `/api/weather?lat=${latitude}&lon=${longitude}`
              );
              const data = await res.json();

              if (res.ok) {
                setWeather(data);
                setCity(data.city || "");
                changeAppState(APP_STATE.PLAY);
              } else {
                throw new Error(data.message || "Failed to fetch weather");
              }
            } catch (err) {
              console.warn("Weather fetch failed:", err);
              changeAppState(APP_STATE.CITY);
            }
          },
          (error) => {
            console.warn("Geolocation denied:", error);
            changeAppState(APP_STATE.CITY);
          }
        );
      }
    };

    getLocationAndFetchWeather();
  }, [weather, isClient]);

  /**
   * TIME FORMATTERS
   */
  const timeFormatter = useMemo(() => {
    if (!weather) return null;
    return localTimeFormatter(weather, "numeric", "2-digit", false);
  }, [weather]);

  const timeFormatterHourOnly = useMemo(() => {
    if (!weather) return null;
    return localTimeFormatterHourOnly(weather);
  }, [weather]);

  /**
   * SFX - CLICK
   */
  const clickSound = useRef(null);
  function playClickSound() {
    if (clickSound.current && audioEnabled) {
      // Clone to allow overlap playback or rapid replay
      const clickSoundClone = clickSound.current.cloneNode();
      clickSoundClone.play();
    }
  }

  /**
   * MODAL - CITY
   */
  useEffect(() => {
    if (appState === APP_STATE.CITY) {
      setCityModalOpen(true);
      setShowDataRelatedModels(false);
      changeIsDepthOfField(false);
    }
  }, [appState]);

  function cityModalCloseHandler() {
    setCityModalOpen(false);
    userInputCityName.current.value = "";
    setError("");
    setShowDataRelatedModels(true);
    changeAppState(APP_STATE.PLAY);
    changeIsDepthOfField(true);
  }

  async function changeCity() {
    setIsFetching(true);

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
   * MODAL - 48h weather data & precipitation
   */
  useEffect(() => {
    if (appState === APP_STATE.DATA_48H) {
      setDataModalOpen(true);
      changeIsDepthOfField(false);
      setShowDataRelatedModels(false);
    }
  }, [appState]);

  function dataModalCloseHandler() {
    // reset scroll
    if (weatherData48hScroll.current) {
      weatherData48hScroll.current.scrollTop = 0;
    }
    if (weatherData48hWeatherHorizontalScroll.current) {
      weatherData48hWeatherHorizontalScroll.current.scrollLeft = 0;
    }
    if (weatherData48hPrecipitationHorizontalScroll.current) {
      weatherData48hPrecipitationHorizontalScroll.current.scrollLeft = 0;
    }

    // reset video
    const video = weatherIconVideo.current;
    if (video && isFinite(video.duration)) {
      video.currentTime = 0;
      video.pause(); // optional: stop animation loop
    }

    setShowDataRelatedModels(true);
    changeIsDepthOfField(true);
    setDataModalOpen(false);
    changeAppState(APP_STATE.PLAY);
  }

  let weatherCondition;
  useEffect(() => {
    const video = weatherIconVideo.current;
    if (!video || !weather) return;

    const weatherCondition = weatherConditionConverter(
      weather.current?.weather[0].main
    );

    // Choose video format
    const fileExt = isIOS ? "mp4" : "webm";
    const videoPath = `/videos/${weatherCondition}.${fileExt}`;

    // Safely update video source
    video.pause();
    video.setAttribute("src", videoPath);
    video.load();
  }, [weather]);

  function handleScroll() {
    const scrollContainer = weatherData48hScroll.current;
    const video = weatherIconVideo.current;

    if (!scrollContainer || !video) return;

    const scrollTop = scrollContainer.scrollTop;
    const maxScroll =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;

    // normalize scroll between 0 and 1
    const progress = Math.min(
      1,
      Math.max(0, scrollTop / (maxScroll || 1)) // avoid divide by zero
    );

    // sync to video duration
    if (Number.isFinite(video.duration) && Number.isFinite(progress)) {
      video.currentTime = progress * video.duration;
    }
  }

  /**
   * HORIZONTAL SCROLL - DRAGABLE WITH ALSO MOUSE
   */
  useEffect(() => {
    const elements = document.querySelectorAll(".horizontal-scroll");
    if (!elements.length) return;

    const handlers = [];

    elements.forEach((el) => {
      let isDown = false;
      let startX;
      let scrollLeft;

      const startDragging = (e) => {
        isDown = true;
        el.classList.add("cursor-grabbing", "no-select");
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      };

      const stopDragging = () => {
        isDown = false;
        el.classList.remove("cursor-grabbing", "no-select");
      };

      const drag = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.5;
        el.scrollLeft = scrollLeft - walk;
      };

      el.addEventListener("mousedown", startDragging);
      el.addEventListener("mouseleave", stopDragging);
      el.addEventListener("mouseup", stopDragging);
      el.addEventListener("mousemove", drag);

      handlers.push({ el, startDragging, stopDragging, drag });
    });

    return () => {
      handlers.forEach(({ el, startDragging, stopDragging, drag }) => {
        el.removeEventListener("mousedown", startDragging);
        el.removeEventListener("mouseleave", stopDragging);
        el.removeEventListener("mouseup", stopDragging);
        el.removeEventListener("mousemove", drag);
      });
    };
  }, [appState]);

  return (
    <>
      <Canvas
        flat
        shadows
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]}
        camera={{ position: [8, 10, 15], near: 10, far: 55, fov: 12 }}
        performance={{ min: 0.5 }}
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

      <audio ref={clickSound} src="/sounds/click.mp3" preload="auto" />

      {appState === APP_STATE.PLAY && <AudioConsentScreen />}

      <Modal
        open={cityModalOpen}
        onClose={cityModalCloseHandler}
        className={`relative m-auto w-[90vw] h-[90vh] pt-[5vh] rounded-2xl backdrop-blur-md ${
          isIOS ? "bg-black" : "bg-[#333333]/45"
        }`}
      >
        <section className="h-full flex flex-col items-center justify-center gap-16">
          <div className="flex flex-col items-center">
            <img
              src="/images/city-state/cityscape.svg"
              className="w-[95px] h-[95px] opacity-70"
            />
            <h1 className="font-poppins-bold text-[40px] text-white">City</h1>
          </div>

          <div className="flex flex-col items-center w-full">
            <input
              ref={userInputCityName}
              className={`focus:outline-none px-2 py-4 w-4/5 text-center rounded-2xl ${
                error
                  ? "text-pink-600 bg-pink-300"
                  : "text-blue-950 bg-blue-100"
              }`}
              type="text"
              placeholder="City Name?"
            />
            {error && (
              <p className="mt-2 text-sm text-pink-600">{error.message}</p>
            )}
          </div>

          <div className="flex flex-col items-center font-sans gap-3 text-[14px] text-white">
            {!isFetching ? (
              <button
                className="focus:outline-none hover:cursor-pointer px-6 py-4 bg-linear-to-r/hsl from-[#113285]/80 to-[#227D51]/80 shadow-lg rounded-2xl"
                onClick={() => {
                  changeCity();
                  playClickSound();
                }}
              >
                Change City
              </button>
            ) : (
              <button
                disabled
                className="focus:outline-none hover:cursor-pointer px-6 py-4 bg-blue-800 text-blue-50 rounded-2xl"
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
              className="focus:outline-none hover:cursor-pointer p-3 text-white/70 rounded-2xl"
              onClick={() => {
                cityModalCloseHandler();
                playClickSound();
              }}
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
        className={`relative overflow-hidden no-scrollbar no-select m-auto w-[90vw] h-[90vh] pt-[5vh] rounded-2xl backdrop-blur-md ${
          isIOS ? "bg-black" : "bg-[#333333]/45"
        }`}
      >
        <section className="absolute top-[16px] w-full">
          {weatherCondition !== null && (
            <video
              ref={weatherIconVideo}
              autoPlay={false}
              muted
              loop={false}
              playsInline
              className="mx-auto w-[240px] h-[240px] object-cover pointer-events-none"
            />
          )}
        </section>

        <section
          ref={weatherData48hScroll}
          onScroll={handleScroll}
          className="relative z-10 overflow-y-scroll no-scrollbar h-full px-6 pt-[200px] text-white"
        >
          {weather && timeFormatter && (
            <>
              <div className="mb-[45px] flex flex-col items-center ">
                <h1 className="font-dm-sans-semi-bold text-[72px]/[1.15]">
                  {weather.current.temp.toFixed(1)}°C
                </h1>
                <p className="font-dm-sans-bold text-[20px]">
                  {city.charAt(0).toUpperCase() +
                    city.slice(1).toLocaleLowerCase()}
                </p>
              </div>

              <div className="mb-[32px] flex flex-col items-center font-mono text-[14px]">
                <p>Feels like: {weather.current.feels_like.toFixed(1)}°C</p>
                <p>High: {weather.daily[0].temp.max.toFixed(1)}°C</p>
                <p>Low: {weather.daily[0].temp.min.toFixed(1)}°C</p>
                <p>
                  Sunrise:{" "}
                  {timeFormatter.format(
                    new Date(weather.daily[0].sunrise * 1000)
                  )}
                </p>
                <p>
                  Sunset:{" "}
                  {timeFormatter.format(
                    new Date(weather.daily[0].sunset * 1000)
                  )}
                </p>
              </div>

              <div
                ref={weatherData48hWeatherHorizontalScroll}
                className="horizontal-scroll overflow-x-scroll no-scrollbar mb-7 px-5 py-4 w-full h-[120px] flex flex-row gap-7 rounded-[10px] bg-[#333333]/80 shadow-lg shadow-[#000000]/25 font-sans text-[12px] text-white/70"
              >
                {weather.hourly.map((data, index) => {
                  const weatherConditionName = weatherConditionConverter(
                    data.weather[0].main
                  );

                  return (
                    <div
                      key={index}
                      className="h-full flex flex-col items-center justify-evenly"
                    >
                      <p className="w-10 text-center">
                        {timeFormatterHourOnly.format(new Date(data.dt * 1000))}
                      </p>
                      <img
                        src={`/images/data-state/weather/${weatherConditionName}.svg`}
                        className="w-8 h-8"
                      />
                      <p>{data.temp.toFixed(1)}°C</p>
                    </div>
                  );
                })}
              </div>

              <div
                ref={weatherData48hPrecipitationHorizontalScroll}
                className="horizontal-scroll overflow-x-scroll no-scrollbar mb-7 px-5 py-4 w-full h-[250px] flex flex-row gap-7 rounded-[10px] bg-[#333333]/80 shadow-lg shadow-[#000000]/25 font-sans text-[12px] text-center"
              >
                {weather.hourly.map((data, index) => {
                  const precipitation = data.rain?.["1h"].toFixed(1) || "0.0";
                  const { colorCode, barHeight, imageSrc, label } =
                    precipitationVisualizationData(Number(precipitation), 72);
                  const rgba = hexToRgba(colorCode, 0.7);

                  return (
                    <div
                      key={index}
                      className="h-full flex flex-col items-center justify-evenly"
                    >
                      <p>
                        {timeFormatterHourOnly.format(new Date(data.dt * 1000))}
                      </p>
                      <div className="relative w-[4px] h-[72px] rounded-full bg-white/25">
                        <div
                          className="absolute bottom-0 w-[4px] rounded-full"
                          style={{
                            backgroundColor: colorCode,
                            height: `${barHeight}px`,
                          }}
                        ></div>
                      </div>

                      <div style={{ color: rgba }}>
                        <p>{precipitation}</p>
                        <p className="text-[9px]">(mm/h)</p>
                      </div>

                      <img src={imageSrc} className="w-8 h-8" />
                      <p className="w-14 text-[8px]" style={{ color: rgba }}>
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="mt-[48px] mb-[24px] flex flex-col items-center font-sans">
            <button
              className="focus:outline-none hover:cursor-pointer p-3 text-white/70 rounded-2xl"
              onClick={() => {
                dataModalCloseHandler();
                playClickSound();
              }}
            >
              Go Back
            </button>
          </div>
        </section>
      </Modal>

      {appState === APP_STATE.PLAY && (
        <>
          {weather && timeFormatter && (
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
                  <p>Feels like: {weather.current.feels_like.toFixed(1)}°C</p>
                  <p>High: {weather.daily[0].temp.max.toFixed(1)}°C</p>
                  <p>Low: {weather.daily[0].temp.min.toFixed(1)}°C</p>
                  <p>
                    Sunrise:{" "}
                    {timeFormatter.format(
                      new Date(weather.daily[0].sunrise * 1000)
                    )}
                  </p>
                  <p>
                    Sunset:{" "}
                    {timeFormatter.format(
                      new Date(weather.daily[0].sunset * 1000)
                    )}
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
                playClickSound();
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
                playClickSound();
              }}
            >
              <img
                src={`/images/play-state/cityscape.svg`}
                className="w-[50px] h-[50px] opacity-70"
              />
              <p className="absolute bottom-[-18px] right-[-12px] font-poppins-bold text-[20px] text-white">
                City
              </p>
            </button>
            <button
              className="relative focus:outline-none hover:cursor-pointer"
              onClick={() => {
                changeAppState(APP_STATE.DATA_48H);
                playClickSound();
              }}
            >
              <img
                src={`/images/play-state/weather.svg`}
                className="w-[50px] h-[50px] opacity-70"
              />
              <p className="absolute bottom-[-10px] right-[-12px] font-poppins-bold text-[20px] text-white">
                48h
              </p>
            </button>
          </section>
        </>
      )}
    </>
  );
}
