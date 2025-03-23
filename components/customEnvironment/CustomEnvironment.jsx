"use client";

import { Environment, Lightformer } from "@react-three/drei";

export default function CustomEnvironment() {
  return (
    <>
      <color attach="background" args={["#f0f0f0"]} />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-10, 10, 5]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>

      <Environment resolution={32}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
        <Lightformer
          position={[10, 0, -10]}
          scale={10}
          color="red"
          intensity={6}
        />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
      </Environment>
    </>
  );
}
