"use client";

import { useEffect } from "react";
import { useStore } from "@/stores/store.js";
import createFadableAudio from "@/utils/createAudioWithFade.js";

export default function WeatherAudio({ weather }) {
  const { audioEnabled } = useStore();

  useEffect(() => {
    if (!weather || !audioEnabled) return;
  
    const { audio, fadeIn, fadeOut } = createFadableAudio(
      `/sounds/${weather}.mp3`,
      1000,
      0.5
    );
  
    const cancelFade = fadeIn();
  
    return () => {
      cancelFade?.(); // stops fade if mid-animation
      fadeOut();
      audio.src = "";
    };
  }, [weather, audioEnabled]);

  return null;
}
