"use client";

import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useControls } from "leva";

export default function TestCube(props) {
  const testCube = useRef();

  const { positionX, positionY, positionZ } = useControls("testCube", {
    positionX: { value: 0, step: 0.01, min: -100, max: 100 },
    positionY: { value: 0, step: 0.01, min: -100, max: 100 },
    positionZ: { value: 0, step: 0.01, min: -100, max: 100 },
  });

  useFrame((state, delta) => {
    testCube.current.rotation.x = state.clock.getElapsedTime() * 0.85;
    testCube.current.rotation.z = state.clock.getElapsedTime() * 1.2;
  });

  return (
    <mesh
      ref={testCube}
      {...props}
      position={[positionX, positionY, positionZ]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="crimson" />
    </mesh>
  );
}
