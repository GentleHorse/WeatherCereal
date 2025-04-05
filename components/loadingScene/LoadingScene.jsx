"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { APP_STATE, useStore } from "@/stores/store.js";

export default function LoadingScene() {
  const { changeAppState } = useStore((state) => state);

  useEffect(() => {
    return () => {
      changeAppState(APP_STATE.MENU);
    };
  }, []);

  const testCube = useRef()

  useFrame((state, delta) => {
    testCube.current.rotation.y += delta;
  })

  return (
    <>
      <mesh ref={testCube}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
