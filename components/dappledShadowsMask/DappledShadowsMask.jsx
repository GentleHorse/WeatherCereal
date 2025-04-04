"use client";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export default function DappledShadowsMask(props) {
  const shadowTexture = useTexture("/textures/dappled-shadow-texture-02.png");
  return (
    <>
      <mesh
        {...props}
        castShadow
      >
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={shadowTexture}
          transparent
          side={THREE.DoubleSide}
          alphaTest={0.5}
        />
      </mesh>
    </>
  );
}
