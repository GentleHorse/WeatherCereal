/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/stage/stage.glb 
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/stage.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.ground.geometry}
        material={materials["white-mat"]}
      />
      <mesh
        geometry={nodes["milk-pourer"].geometry}
        material={materials["white-mat"]}
        position={[-1.647, 1.78, 0]}
      />
      <mesh
        geometry={nodes["cereal-bowl"].geometry}
        material={materials["white-mat"]}
      />
    </group>
  );
}

useGLTF.preload("/stage.glb");
