"use client";

import { useEffect, useRef } from "react";

export default function WeatherAudio({ weather }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!weather) return;

    // const audio = new Audio(`/sounds/${weather}.mp3`)
    const audio = new Audio(`/sounds/clear.mp3`);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.5;

    // Play only after it's ready
    const handleReady = () => {
      audio.play().catch((err) => {
        console.warn("Playback failed:", err);
      });
    };

    audio.addEventListener("canplaythrough", handleReady);

    return () => {
      // Clean up previous audio
      audio.pause();
      audio.src = "";
      audio.removeEventListener("canplaythrough", handleReady);
    };
  }, [weather]);

  return null;
}
