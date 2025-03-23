"use client";

import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import PostProcessingEffects from "./postprocessing/PostProcessingEffects.jsx";
import FallingWeatherIcons from "./weatherIcons/FallingWeatherIcons.jsx";
import CustomEnvironment from "./customEnvironment/CustomEnvironment.jsx";

export default function Experience({ weatherData }) {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <CustomEnvironment />

      <PostProcessingEffects />

      <Physics debug={true} gravity={[0, -1.625, 0]}>
        <RigidBody type="fixed" restitution={0.1}>
          <CuboidCollider restitution={0.1} args={[1000, 1, 1000]} />
        </RigidBody>

        {!!weatherData && <FallingWeatherIcons data={weatherData.hourly[0]} />}
      </Physics>
    </>
  );
}
