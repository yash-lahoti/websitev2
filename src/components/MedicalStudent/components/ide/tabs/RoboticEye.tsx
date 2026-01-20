"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../../../../archive/Loader";

const RoboticEye = () => {
  // useGLTF automatically loads textures referenced in the GLTF file
  const eye = useGLTF("./robotic_eye/scene.gltf");

  // Traverse the scene to ensure emissive textures are properly rendered
  useEffect(() => {
    eye.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        // Ensure emissive textures are visible
        if (material.emissiveMap) {
          material.emissiveMap.needsUpdate = true;
        }
        // Make sure materials are rendered correctly
        material.needsUpdate = true;
        // Ensure emissive is enabled
        if (material.emissive) {
          material.emissive.set(1, 1, 1);
        }
      }
    });
  }, [eye.scene]);

  return (
    <>
      {/* Reduced ambient light to make emissive texture more visible */}
      <ambientLight intensity={0.8} />
      <hemisphereLight
        intensity={1.2}
        groundColor="#1a1a1a"
        color="#ffffff"
      />
      {/* Main directional light illuminating the eye */}
      <directionalLight
        intensity={4}
        color="#ffffff"
        position={[5, 5, 5]}
        castShadow
      />
      {/* Secondary directional light from opposite side */}
      <directionalLight
        intensity={2}
        color="#ffffff"
        position={[-5, 3, 5]}
      />
      {/* Spotlight focused on the eye */}
      <spotLight
        intensity={5}
        color="#ffffff"
        position={[0, 5, 8]}
        angle={0.4}
        penumbra={0.5}
      />
      {/* Red accent light to enhance the red dots visibility */}
      <pointLight
        intensity={6}
        color="#ff3b30"
        position={[0, 0, 4]}
      />
      <pointLight
        intensity={2}
        color="#4a9eff"
        position={[2, 2, 3]}
      />
      <pointLight
        intensity={1.5}
        color="#ffffff"
        position={[-2, 2, 3]}
      />
      <primitive
        object={eye.scene}
        scale={6}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
};

const RoboticEyeCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 5],
      }}
      style={{ 
        background: 'transparent',
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={2.0}
          enableZoom={false}
          enablePan={false}
        />
        <RoboticEye />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default RoboticEyeCanvas;
