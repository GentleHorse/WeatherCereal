"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import SakuraPetal from "./SakuraPetal.jsx";

export default function FloatingSakuraPetals({ petalNum = 100, ...props }) {
  const sakuraPetals = useRef([]);

  const sakuraPetalsRandomSeeds = useMemo(() => {
    const sakuraPetalsRandomSeeds = [];

    for (let i = 0; i < petalNum; i++) {
      const randomSeed = Math.random(0.2, 1.0);
      sakuraPetalsRandomSeeds.push(randomSeed);
    }

    return sakuraPetalsRandomSeeds;
  }, [petalNum]);

  useFrame((state, delta) => {
    for (const i in sakuraPetals.current) {
      sakuraPetals.current[i].rotation.x +=
        delta * sakuraPetalsRandomSeeds[i] * 0.25;
      sakuraPetals.current[i].rotation.y +=
        delta * sakuraPetalsRandomSeeds[i] * 0.45;
      sakuraPetals.current[i].position.x +=
        Math.sin(
          state.clock.getElapsedTime() * sakuraPetalsRandomSeeds[i] * 0.35
        ) * 0.003;
      sakuraPetals.current[i].position.y +=
        Math.sin(
          state.clock.getElapsedTime() * sakuraPetalsRandomSeeds[i] * 0.25
        ) * 0.005;
    }
  });

  return (
    <group {...props}>
      {[...Array(petalNum)].map((value, index) => (
        <group
          ref={(element) => (sakuraPetals.current[index] = element)}
          key={index}
          position={[
            (Math.random() - 0.5) * 8.5,
            (Math.random() - 0.5) * 3.5,
            (Math.random() - 0.5) * 8.5,
          ]}
          scale={0.25 + Math.random() * 0.15}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <SakuraPetal />
        </group>
      ))}
    </group>
  );
}
