"use client";

import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import PostProcessingEffects from "./postprocessing/PostProcessingEffects.jsx";
import FallingWeatherIcons from "./weatherIcons/FallingWeatherIcons.jsx";
import CustomEnvironment from "./customEnvironment/CustomEnvironment.jsx";
import PrecipitationBars from "./precipitationBars/PrecipitationBars.jsx";

export default function Experience({ weatherData, city }) {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <axesHelper visible={true} />

      <CustomEnvironment backgroundColor={true} />

      <PostProcessingEffects depthOfField={false} />

      <Physics debug={true} gravity={[0, -1.625, 0]}>
        <RigidBody type="fixed" restitution={0.1} position={[0, -0.5, 0]}>
          <CuboidCollider restitution={0.1} args={[1000, 0.1, 1000]} />
        </RigidBody>

        {!!weatherData && <FallingWeatherIcons data={weatherData.hourly[0]} />}
      </Physics>

      {!!weatherData && (
        <WeatherText3D
          text={`${weatherData.hourly[0].temp.toFixed(1)}°C`}
          textSize={0.35}
          position={[1.0, 0.75, -2.0]}
          top
          left
        />
      )}
      <WeatherText3D text={city} position={[1.0, 0, -2.0]} top left />

      {/* {!!weatherData && (
        <PrecipitationBars weatherData={weatherData} barScale={0.05} />
      )} */}
    </>
  );
}

function WeatherText3D({
  text,
  textSize = 0.5,
  top,
  bottom,
  left,
  right,
  ...props
}) {
  return (
    <group {...props}>
      <Center top={top} bottom={bottom} left={left} right={right}>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={textSize}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.025}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </group>
  );
}

