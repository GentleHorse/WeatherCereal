import BottomOriginCube from "../cubes/BottomOriginCube.jsx";

export default function PrecipitationBars({ weatherData, barScale }) {
    return (
      <>
        {weatherData.hourly.map((data, index) => (
          <BottomOriginCube
            key={index}
            geometryScale={[barScale, barScale, barScale]}
            position={[barScale * 1.5 * index, -0.5, 0]}
            scale={[1, data.rain?.["1h"] * 10.0 || 0, 1]}
            material={<meshStandardMaterial color="#0B346E" />}
          />
        ))}
      </>
    );
  }