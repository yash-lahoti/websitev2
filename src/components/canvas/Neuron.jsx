import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Neuron = ({ isMobile }) => {
  const neuron = useGLTF("./neuron/scene.gltf");

  return (
    <mesh>
      <hemisphereLight
        intensity={0.2}
        groundColor='black'
        color='#ffffff'
      />
      <pointLight
        intensity={0.2}
        color='#ffd700'
        position={[10, 10, 10]}
      />
      <primitive
        object={neuron.scene}
        scale={isMobile ? 0.2 : 0.5}
        position-y={0}
        rotation-y={0}
      />
    </mesh>
  );
};

const NeuronCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={7.0}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Neuron />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default NeuronCanvas;
