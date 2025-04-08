"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import SakuraPetal from "./SakuraPetal.jsx";

export default function FloatingSakuraPetals({ petalNum = 100, ...props }) {
  const sakuraPetals = useRef([]);

  const sakuraPetalsArray = useMemo(() => {
    const sakuraPetalsArray = [];

    for (let i = 0; i < petalNum; i++) {
      const sakuraPetal = {
        position: [
          (Math.random() - 0.5) * 8.5,
          (Math.random() - 0.5) * 3.5,
          (Math.random() - 0.5) * 8.5,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        randomSeed: Math.random(0.2, 1.0),
      };
      sakuraPetalsArray.push(sakuraPetal);
    }

    return sakuraPetalsArray;
  }, [petalNum]);

  useFrame((state, delta) => {
    for (const i in sakuraPetals.current) {
      sakuraPetals.current[i].rotation.x +=
        delta * sakuraPetalsArray[i].randomSeed * 0.25;
      sakuraPetals.current[i].rotation.y +=
        delta * sakuraPetalsArray[i].randomSeed * 0.45;

      sakuraPetals.current[i].position.x +=
        Math.sin(
          state.clock.getElapsedTime() * sakuraPetalsArray[i].randomSeed * 0.35
        ) * 0.003;
      sakuraPetals.current[i].position.y +=
        Math.sin(
          state.clock.getElapsedTime() * sakuraPetalsArray[i].randomSeed * 0.25
        ) * 0.005;
    }
  });

  return (
    <group {...props}>
      {[...Array(petalNum)].map((value, index) => (
        <group
          ref={(element) => (sakuraPetals.current[index] = element)}
          key={index}
          position={sakuraPetalsArray[index].position}
          scale={0.25 + Math.random() * 0.25}
          rotation={sakuraPetalsArray[index].rotation}
        >
          <SakuraPetal />
        </group>
      ))}
    </group>
  );
}
