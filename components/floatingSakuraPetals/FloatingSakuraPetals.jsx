"use client";

import SakuraPetal from "./SakuraPetal.jsx";

export default function FloatingSakuraPetals() {
  return (
    <>
      {[...Array(100)].map((value, index) => (
        <group
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
    </>
  );
}
