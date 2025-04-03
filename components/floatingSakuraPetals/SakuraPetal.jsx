/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/sakura-petal/sakura-petal.glb 
*/

import React from "react";
import { useGLTF, Clone, Float } from "@react-three/drei";

export default function SakuraPetal(props) {
  const { nodes, materials } = useGLTF("/models/sakura-petal/sakura-petal.glb");
  return (
    <group {...props} dispose={null}>
      <Clone
        object={nodes["sakura-petal"]}
        inject={
          <meshStandardMaterial
            color="#FEDFE1"
            roughness={0.85}
          />
        }
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/models/sakura-petal/sakura-petal.glb");
