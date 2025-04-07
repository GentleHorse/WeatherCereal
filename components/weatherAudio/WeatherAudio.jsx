"use client";

import { useEffect } from "react";
import createFadableAudio from "@/utils/createAudioWithFade.js";

export default function WeatherAudio({ weather }) {
  useEffect(() => {
    if (!weather) return;

    const { audio, fadeIn, fadeOut } = createFadableAudio(
      `/sounds/${weather}.mp3`,
      1000, // fade time (miliseconds)
      0.5 // volume
    );

    audio.addEventListener("canplaythrough", fadeIn);

    return () => {
      // Clean up previous audio
      fadeOut();
      audio.src = "";
      audio.removeEventListener("canplaythrough", fadeIn);
    };
  }, [weather]);

  return null;
}
