"use client"

import * as THREE from "three";

export default function BottomOriginCube({ material, geometryScale=[1, 1, 1], ...props }) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.translate(0, 0.5, 0);
  geometry.scale(...geometryScale);

  return (
    <mesh {...props} geometry={geometry}>
      {material}
    </mesh>
  );
}
