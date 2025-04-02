"use client";

import { useEffect, useState, useRef } from "react";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import gsap from "gsap";

import PostProcessingEffects from "./postprocessing/PostProcessingEffects.jsx";
import FallingWeatherIcons from "./weatherIcons/FallingWeatherIcons.jsx";
import CustomEnvironment from "./customEnvironment/CustomEnvironment.jsx";
import Stage from "./stage/Stage.jsx";

const WEATHER_SWEET_UNIT_SIZE = 0.15;
const WEATHER_SWEET_UNIT_GAP = 0.05;

export default function Experience({
  weatherData,
  city,
  showDataRelatedModels,
}) {
  const weatherSweet = useRef();

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
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* <axesHelper visible={true} /> */}

      <CustomEnvironment backgroundColor={true} />

      <PostProcessingEffects depthOfField={true} />

      <group ref={weatherSweet} position={[1.25, 0, 2.5]}>
        <WeatherSweet
          onPointerEnter={hoverStartAnimation}
          onPointerLeave={hoverEndAnimation}
          unitSize={WEATHER_SWEET_UNIT_SIZE}
          unitGap={WEATHER_SWEET_UNIT_GAP}
        />
      </group>

      <Physics debug={false} gravity={[0, -1.625, 0]}>
        <RigidBody type="fixed" restitution={0.1} position={[0, -0.5, 0]}>
          <CuboidCollider restitution={0.1} args={[1000, 0.1, 1000]} />
        </RigidBody>

        <Stage scale={0.75} position-y={-0.5} />

        {weatherData && showDataRelatedModels && (
          <FallingWeatherIcons data={weatherData.hourly[0]} />
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
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.025}
          bevelOffset={0}
          bevelSegments={5}
          castShadow
        >
          {text}
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </group>
  );
}

function WeatherSweet({ unitSize, unitGap, ...props }) {
  const [sweetArray, setSweetArray] = useState([]);

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

  return (
    <group {...props}>
      {!!sweetArray &&
        sweetArray.map((unit) => (
          <mesh key={unit.id} position={unit.position}>
            <boxGeometry
              args={[
                WEATHER_SWEET_UNIT_SIZE,
                WEATHER_SWEET_UNIT_SIZE * 1.33,
                WEATHER_SWEET_UNIT_SIZE,
              ]}
            />
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
