"use client";

import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const testCube = useRef();

  useFrame((state, delta) => {
    testCube.current.rotation.x = state.clock.getElapsedTime() * 0.85;
    testCube.current.rotation.z = state.clock.getElapsedTime() * 1.2;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.85} />
      <OrbitControls makeDefault />
      <mesh ref={testCube}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="crimson" />
      </mesh>
    </>
  );
}
