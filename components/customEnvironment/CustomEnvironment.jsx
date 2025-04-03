"use client";

import { Environment, Lightformer } from "@react-three/drei";

export default function CustomEnvironment({ backgroundColor }) {
  return (
    <>
      {!!backgroundColor && <color attach="background" args={["#f0f0f0"]} />}

      <ambientLight intensity={0.75} />
      <directionalLight
        intensity={1.5}
        position={[-10, 10, 5]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>

      <Environment resolution={32}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={10} />
        <Lightformer
          position={[10, 0, -10]}
          scale={10}
          color="#f0f0f0"
          intensity={12}
        />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={10} />
      </Environment>
    </>
  );
}
