"use client";

import { OrbitControls, Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import FallingWeatherIcons from "./weatherIcons/FallingWeatherIcons.jsx";

export default function Experience({ weatherData }) {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.85} />

      <Environment preset="apartment" />

      <color args={["#FCFCFC"]} attach="background" />

      <Physics debug={true} gravity={[0, -1.625, 0]}>
        <RigidBody type="fixed">
          <mesh>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </RigidBody>

        {!!weatherData && <FallingWeatherIcons data={weatherData.hourly[0]} />}
      </Physics>
    </>
  );
}
