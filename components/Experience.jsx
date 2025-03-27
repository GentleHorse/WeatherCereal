"use client";

import * as THREE from "three";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import PostProcessingEffects from "./postprocessing/PostProcessingEffects.jsx";
import FallingWeatherIcons from "./weatherIcons/FallingWeatherIcons.jsx";
import CustomEnvironment from "./customEnvironment/CustomEnvironment.jsx";
import { useRef } from "react";
import ThreeScene from "./ThreeScene.jsx";

export default function Experience({ weatherData, city }) {
  if (weatherData) {
    weatherData.hourly.forEach((data) => {
      console.log(`Precipitation: ${data.rain?.["1h"] || "0.00"} mm/h`);
    });
  }

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <axesHelper visible={true} />

      <CustomEnvironment />

      <PostProcessingEffects depthOfField={false} />

      <Physics debug={false} gravity={[0, -1.625, 0]}>
        <RigidBody type="fixed" restitution={0.1} position={[0, -0.5, 0]}>
          <CuboidCollider restitution={0.1} args={[1000, 0.1, 1000]} />
        </RigidBody>

        {!!weatherData && <FallingWeatherIcons data={weatherData.hourly[0]} />}
      </Physics>

      <CityName3D
        city={city}
        position={[-0.5, 0.5, -1.5]}
        // rotation-y={-Math.PI * 0.75}
      />

      {/* {weatherData &&
        weatherData.hourly.map((data, index) => (
          <CustomCube
            position={[0.25 * 0, 0, 0]}
            scale={[1, weatherData.hourly[0].rain?.["1h"] || 0, 1]}
            material={<meshStandardMaterial color="#0B346E" />}
          />
        ))} */}
    </>
  );
}

function CityName3D({ city, ...props }) {
  return (
    <group {...props}>
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={1.25}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={5}
        >
          {city}
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </group>
  );
}

function CustomCube({ material, ...props }) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.translate(0, 0.5, 0);
  geometry.scale(0.25, 0.25, 0.25);

  return (
    <mesh {...props} geometry={geometry}>
      {material}
    </mesh>
  );
}
