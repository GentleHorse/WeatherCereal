"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingSakuraPetals({ petalNum = 100, ...props }) {
  const instancedMeshRef = useRef();
  const rotationStateRef = useRef([]);
  const { nodes } = useGLTF("/models/sakura-petal/sakura-petal.glb");
  
  // Get the geometry from the sakura petal model
  const petalGeometry = useMemo(() => {
    if (!nodes["sakura-petal"]) return null;
    // Clone the geometry to avoid modifying the original
    return nodes["sakura-petal"].geometry.clone();
  }, [nodes]);

  // Create material once
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FEDFE1",
        roughness: 0.85,
      }),
    []
  );

  // Generate instance data
  const sakuraPetalsArray = useMemo(() => {
    const sakuraPetalsArray = [];
    rotationStateRef.current = [];

    for (let i = 0; i < petalNum; i++) {
      const initialRotation = [Math.random() * Math.PI, Math.random() * Math.PI, 0];
      sakuraPetalsArray.push({
        position: [
          (Math.random() - 0.5) * 8.5,
          (Math.random() - 0.5) * 3.5,
          (Math.random() - 0.5) * 8.5,
        ],
        rotation: initialRotation,
        scale: 0.25 + Math.random() * 0.25,
        randomSeed: Math.random() * 0.8 + 0.2, // Fixed: was Math.random(0.2, 1.0) which is incorrect
      });
      // Initialize rotation state
      rotationStateRef.current[i] = {
        x: initialRotation[0],
        y: initialRotation[1],
        z: initialRotation[2],
      };
    }

    return sakuraPetalsArray;
  }, [petalNum]);

  // Initialize instance matrices
  useEffect(() => {
    if (!instancedMeshRef.current || !petalGeometry) return;

    const tempObject = new THREE.Object3D();

    sakuraPetalsArray.forEach((petal, i) => {
      tempObject.position.set(...petal.position);
      tempObject.rotation.set(...petal.rotation);
      tempObject.scale.setScalar(petal.scale);
      tempObject.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [sakuraPetalsArray, petalGeometry]);

  // Animate instances
  useFrame((state, delta) => {
    if (!instancedMeshRef.current) return;

    const tempObject = new THREE.Object3D();
    const elapsedTime = state.clock.getElapsedTime();

    sakuraPetalsArray.forEach((petal, i) => {
      // Update rotation (accumulate)
      rotationStateRef.current[i].x += delta * petal.randomSeed * 0.25;
      rotationStateRef.current[i].y += delta * petal.randomSeed * 0.45;
      
      // Update position with sine wave
      const baseX = petal.position[0];
      const baseY = petal.position[1];
      const offsetX = Math.sin(elapsedTime * petal.randomSeed * 0.35) * 0.003;
      const offsetY = Math.sin(elapsedTime * petal.randomSeed * 0.25) * 0.005;

      tempObject.position.set(
        baseX + offsetX,
        baseY + offsetY,
        petal.position[2]
      );
      tempObject.rotation.set(
        rotationStateRef.current[i].x,
        rotationStateRef.current[i].y,
        petal.rotation[2]
      );
      tempObject.scale.setScalar(petal.scale);
      tempObject.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!petalGeometry) return null;

  return (
    <group {...props}>
      <instancedMesh
        ref={instancedMeshRef}
        args={[petalGeometry, material, petalNum]}
        castShadow={false}
        receiveShadow={false}
      />
    </group>
  );
}
