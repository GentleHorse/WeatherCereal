"use client";

import { useEffect } from "react";
import { useStore } from "@/stores/store.js";
import createFadableAudio from "@/utils/createAudioWithFade.js";

export default function WeatherAudio({ weather }) {
  const { audioEnabled } = useStore();

  useEffect(() => {
    if (!weather) return;
    if (!audioEnabled) return;

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
  }, [weather, audioEnabled]);

  return null;
}
