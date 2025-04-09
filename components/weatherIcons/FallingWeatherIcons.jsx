import { Suspense, useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { InstancedRigidBodies } from "@react-three/rapier";
import { Geometry, Base, Addition } from "@react-three/csg";
import WeatherAudio from "../weatherAudio/WeatherAudio.jsx";
import weatherConditionConverter from "@/utils/weatherConditionConverter.js";

const Icon_Model_Num = 70;
const Icon_Model_Scale = 0.035;
const Icon_Model_Area_X = 1.75;
const Icon_Model_Area_Y = 2.5;
const Icon_Model_Area_Z = 1.75;

export default function FallingWeatherIcons({ data, ...props }) {
  /**
   * SET WEATHER CONDITION
   */
  const weatherCondition = weatherConditionConverter(data.current.weather[0].main);

  /**
   * WEATHER ICON GEOMETRIES
   */
  // clear
  const clear = useGLTF("/models/weather-icons/clear-small.glb");
  const clearGeometry = (
    <Geometry useGroups>
      <Base
        scale={Icon_Model_Scale}
        geometry={clear.nodes.Curve052.geometry}
        material={clear.materials.clearMaterial}
      />
      <Addition
        scale={Icon_Model_Scale}
        geometry={clear.nodes.Curve052_1.geometry}
        material={clear.materials.edgeMaterial}
      />
    </Geometry>
  );

  // cloud
  const cloud = useGLTF("/models/weather-icons/clouds-small.glb");
  const cloudGeometry = (
    <Geometry useGroups>
      <Base
        scale={Icon_Model_Scale}
        geometry={cloud.nodes.Curve001.geometry}
        material={cloud.materials.cloudMaterial}
      />
      <Addition
        scale={Icon_Model_Scale}
        geometry={cloud.nodes.Curve001_1.geometry}
        material={cloud.materials.edgeMaterial}
      />
    </Geometry>
  );

  // drizzle
  const drizzle = useGLTF("/models/weather-icons/drizzle-small.glb");
  const drizzleGeometry = (
    <Geometry useGroups>
      <Base
        scale={0.15}
        geometry={drizzle.nodes.Curve063.geometry}
        material={drizzle.materials.rainMaterial}
      />
      <Addition
        scale={Icon_Model_Scale}
        geometry={drizzle.nodes.Curve063_1.geometry}
        material={drizzle.materials.edgeMaterial}
      />
    </Geometry>
  );

  // mist
  const mist = useGLTF("/models/weather-icons/mist-small.glb");
  const mistGeometry = (
    <Geometry useGroups>
      <Base
        scale={Icon_Model_Scale}
        geometry={mist.nodes.Curve075.geometry}
        material={mist.materials.mistMaterial}
      />
      <Addition
        scale={Icon_Model_Scale}
        geometry={mist.nodes.Curve075_1.geometry}
        material={mist.materials.edgeMaterial}
      />
    </Geometry>
  );

  // rain
  const rain = useGLTF("/models/weather-icons/rain-small.glb");
  const rainGeometry = (
    <Geometry useGroups>
      <Base
        scale={Icon_Model_Scale}
        geometry={rain.nodes.Curve057.geometry}
        material={rain.materials.rainMaterial}
      />
      <Addition
        scale={Icon_Model_Scale}
        geometry={rain.nodes.Curve057_1.geometry}
        material={rain.materials.edgeMaterial}
      />
    </Geometry>
  );

  // snow
  const snow = useGLTF("/models/weather-icons/snow-small.glb");
  const snowGeometry = (
    <Geometry useGroups>
      <Base
        scale={Icon_Model_Scale}
        geometry={snow.nodes.Curve073.geometry}
        material={snow.materials.snowMaterial}
      />
      <Addition
        scale={Icon_Model_Scale}
        geometry={snow.nodes.Curve073_1.geometry}
        material={snow.materials.edgeMaterial}
      />
    </Geometry>
  );

  // thunderstorm
  const thunderstorm = useGLTF("/models/weather-icons/thunderstorm-small.glb");
  const thunderstormGeometry = (
    <Geometry useGroups>
      <Base
        scale={Icon_Model_Scale}
        geometry={thunderstorm.nodes.Curve053.geometry}
        material={thunderstorm.materials.thunderstormMaterial}
      />
      <Addition
        scale={Icon_Model_Scale}
        geometry={thunderstorm.nodes.Curve053_1.geometry}
        material={thunderstorm.materials.edgeMaterial}
      />
    </Geometry>
  );

  /**
   * SET WEATHER ICON GEOMETRY
   */
  const [weatherGeometry, setWeaherGeometry] = useState();

  useEffect(() => {
    switch (weatherCondition) {
      case "clear":
        setWeaherGeometry(clearGeometry);
        break;

      case "clouds":
        setWeaherGeometry(cloudGeometry);
        break;

      case "rain":
        setWeaherGeometry(rainGeometry);
        break;

      case "drizzle":
        setWeaherGeometry(drizzleGeometry);
        break;

      case "thunderstorm":
        setWeaherGeometry(thunderstormGeometry);
        break;

      case "snow":
        setWeaherGeometry(snowGeometry);
        break;

      case "mist":
        setWeaherGeometry(mistGeometry);
        break;
    }
  }, [weatherCondition]);

  /**
   * Object instances' count & matrices
   */
  const objectsCount = Icon_Model_Num;
  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < objectsCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * Icon_Model_Area_X,
          Icon_Model_Area_Y + i * 0.15,
          (Math.random() - 0.5) * Icon_Model_Area_Z,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  return (
    <>
      {/* AUDIO */}
      <WeatherAudio weather={weatherCondition} />

      {/* HUNDREDS OF OBJECTS */}
      {weatherGeometry && (
        <group {...props}>
          <Suspense>
            <InstancedRigidBodies
              instances={instances}
              restitution={0.25}
              friction={0.1}
            >
              <instancedMesh
                castShadow
                args={[undefined, undefined, objectsCount]}
              >
                {weatherGeometry}
              </instancedMesh>
            </InstancedRigidBodies>
          </Suspense>
        </group>
      )}
    </>
  );
}

useGLTF.preload("/models/weather-icons/clear-small.glb");
useGLTF.preload("/models/weather-icons/clouds-small.glb");
useGLTF.preload("/models/weather-icons/drizzle-small.glb");
useGLTF.preload("/models/weather-icons/mist-small.glb");
useGLTF.preload("/models/weather-icons/rain-small.glb");
useGLTF.preload("/models/weather-icons/snow-small.glb");
useGLTF.preload("/models/weather-icons/thunderstorm-small.glb");
