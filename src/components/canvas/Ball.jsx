import React, { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import * as THREE from "three";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const [rotationSpeed, setRotationSpeed] = useState(0);

  // Define points for the flask shape
  const handleClick = () => {
    setRotationSpeed(rotationSpeed === 0 ? 0.1 : 0); // Toggle rotation speed
  };

  useFrame((state, delta) => {
    state.scene.rotation.y += rotationSpeed;
  });

  return (
    <Float speed={1.75} rotationIntensity={5} floatIntensity={4}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <mesh
        castShadow
        receiveShadow
        scale={2.75}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={handleClick}
      >
      <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial
          color='#ffffff'
          opacity={0.2} // Adjust opacity for glass effect
          transparent={true}
          roughness={0.1}
          metalness={0.5}
        />
        <Decal
          position={[0, 0, 0.05]} // Adjust position to front face
          rotation={[-Math.PI / 2, Math.PI, 0]}
          map={decal}
          scale={1.5}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
