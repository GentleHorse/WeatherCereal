"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function WeatherSweet({
  unitSize = 0.15,
  unitGap = 0.05,
  ...props
}) {
  const [sweetArray, setSweetArray] = useState([]);
  const weatherSweet = useRef();

  useEffect(() => {
    const weatherSweetArray = [];
    const unitGapX = unitSize + unitGap;
    const unitGapY = unitSize * 1.33 + unitGap;
    const unitGapZ = unitSize + unitGap;
    const totalUnitNum = 4 * 3 * 4;

    for (let i = 0; i < totalUnitNum; i++) {
      const sweetUnit = {
        id: i,
        position: [
          Math.floor((i % 16) / 4) * unitGapX,
          Math.floor(i / 16) * unitGapY,
          (-i % 4) * unitGapZ,
        ],
      };
      weatherSweetArray.push(sweetUnit);
    }

    setSweetArray(weatherSweetArray);
  }, []);

  function hoverStartAnimation() {
    gsap.to(weatherSweet.current.scale, {
      duration: 1.0,
      ease: "bounce.out",
      x: 1.25,
      y: 1.25,
      z: 1.25,
    });

    gsap.to(weatherSweet.current.position, {
      duration: 1.0,
      ease: "bounce.out",
      y: 0.25,
    });
  }

  function hoverEndAnimation() {
    gsap.to(weatherSweet.current.scale, {
      duration: 1.0,
      ease: "bounce.out",
      x: 1.0,
      y: 1.0,
      z: 1.0,
    });

    gsap.to(weatherSweet.current.position, {
      duration: 1.0,
      ease: "bounce.out",
      y: 0.0,
    });
  }

  return (
    <group
      ref={weatherSweet}
      {...props}
      onPointerEnter={hoverStartAnimation}
      onPointerLeave={hoverEndAnimation}
    >
      {!!sweetArray &&
        sweetArray.map((unit) => (
          <mesh key={unit.id} position={unit.position}>
            <boxGeometry args={[unitSize, unitSize * 1.33, unitSize]} />
            <meshStandardMaterial color="#C1C1C1" />
          </mesh>
        ))}
      <mesh
        position={[
          ((unitSize + unitGap) * (4 - 1)) / 2,
          ((unitSize * 1.33 + unitGap) * (3 - 1)) / 2,
          -((unitSize + unitGap) * (4 - 1)) / 2,
        ]}
      >
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial opacity={0.45} transparent />
      </mesh>
    </group>
  );
}
