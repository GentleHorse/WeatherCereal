"use client";

import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "@/stores/store.js";

import PostProcessingEffects from "./postprocessing/PostProcessingEffects.jsx";
import FallingWeatherIcons from "./weatherIcons/FallingWeatherIcons.jsx";
import CustomEnvironment from "./customEnvironment/CustomEnvironment.jsx";
import Stage from "./stage/Stage.jsx";
import FloatingSakuraPetals from "./floatingSakuraPetals/FloatingSakuraPetals.jsx";

const GRAVITY = -1.625;

export default function Experience({
  weatherData,
  city,
  showDataRelatedModels,
}) {
  const { isDepthOfField } = useStore((state) => state);

  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <axesHelper visible={true} /> */}

      <OrbitControls
        makeDefault
        enableZoom={false}
        minAzimuthAngle={-Math.PI * 0.1}
        maxAzimuthAngle={Math.PI * 0.35}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.35}
      />

      <CustomEnvironment backgroundColor={false} />

      <PostProcessingEffects depthOfField={isDepthOfField} />

      {showDataRelatedModels && <FloatingSakuraPetals petalNum={50} />}

      <Physics debug={false} gravity={[0, GRAVITY, 0]}>
        <RigidBody type="fixed" restitution={0.1} position={[0, -0.5, 0]}>
          <CuboidCollider restitution={0.1} args={[1000, 0.1, 1000]} />
        </RigidBody>

        <Stage scale={0.75} position-y={-0.5} />

        {weatherData && showDataRelatedModels && (
          <FallingWeatherIcons data={weatherData} />
        )}
      </Physics>

      {showDataRelatedModels && weatherData && city && (
        <>
          <WeatherText3D
            text={`${weatherData.hourly[0].temp.toFixed(1)}°C`}
            textSize={0.275}
            position={[1.0, 0.75, -2.0]}
            top
            left
          />
          <WeatherText3D
            text={city}
            textSize={0.4}
            position={[1.0, 0, -2.0]}
            top
            left
          />
        </>
      )}
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
          curveSegments={6}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.025}
          bevelOffset={0}
          bevelSegments={2}
          castShadow
          receiveShadow
        >
          {text}
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </group>
  );
}
