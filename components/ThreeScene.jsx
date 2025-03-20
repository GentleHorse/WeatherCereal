"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      <Experience />
    </Canvas>
  );
}
