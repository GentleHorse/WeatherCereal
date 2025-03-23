"use client";

import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

export default function TestCube(props) {
  const testCube = useRef();

  useFrame((state, delta) => {
    testCube.current.rotation.x = state.clock.getElapsedTime() * 0.85;
    testCube.current.rotation.z = state.clock.getElapsedTime() * 1.2;
  });

  return (
    <mesh ref={testCube} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="crimson" />
    </mesh>
  );
}
