"use client";

import { Environment, Lightformer } from "@react-three/drei";
import DappledShadowsMask from "../dappledShadowsMask/DappledShadowsMask.jsx";

export default function CustomEnvironment({ backgroundColor }) {
  return (
    <>
      {!!backgroundColor && <color attach="background" args={["#f0f0f0"]} />}

      <ambientLight intensity={0.35} />
      <directionalLight
        intensity={2.25}
        position={[-20, 20, 5]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>

      <DappledShadowsMask
        position={[-15, 18, 0]}
        rotation={[0, Math.PI * 0.5, 0]}
        scale={40.0}
      />

      <Environment resolution={16}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={2} />
        <Lightformer
          position={[10, 0, -10]}
          scale={8}
          color="#f0f0f0"
          intensity={4}
        />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={2} />
      </Environment>
    </>
  );
}
