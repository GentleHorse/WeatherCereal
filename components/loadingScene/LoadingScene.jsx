"use client";

import { useEffect } from "react";
import { APP_STATE, useStore } from "@/stores/store.js";

export default function LoadingScene() {
  const { changeAppState } = useStore((state) => state);

  useEffect(() => {
    return () => {
      changeAppState(APP_STATE.MENU);
    };
  }, []);

  return (
    <>
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
