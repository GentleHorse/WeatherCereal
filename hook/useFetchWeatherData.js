"use client";

import { useEffect, useState } from "react";

export function useFetchWeatherData(city) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    async function getWeatherData() {
      setIsFetching(true);

      try {
        const res = await fetch(`/api/weather?city=${city}`);
        const data = await res.json();

        if (res.ok) {
          setWeatherData(data);
        } else {
          setError({ message: data.message || "Error fetching weather" });
        }
      } catch (err) {
        setError({ message: err.message || "Failed to fetch weather" });
      }

      setIsFetching(false);
    }

    if (city) {
      getWeatherData();
    }
  }, [city]);

  return {
    isFetching,
    error,
    weatherData,
  };
}
