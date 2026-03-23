import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import type { Mesh } from "three";

/**
 * Animated sphere with distortion effect.
 */
const AnimatedSphere = ({
  position,
  color,
  speed,
  size,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
    meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
};

/**
 * 3D hero scene for the RDK landing page.
 * Renders floating, distorted spheres with a glassy effect.
 */
const HeroScene = () => (
  <div className="pointer-events-none absolute inset-0 -z-10">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />

        <AnimatedSphere
          position={[-2.5, 1, 0]}
          color="#6366f1"
          speed={1.2}
          size={1.2}
        />
        <AnimatedSphere
          position={[2.5, -0.5, -1]}
          color="#8b5cf6"
          speed={0.8}
          size={0.9}
        />
        <AnimatedSphere
          position={[0, 2, -2]}
          color="#06b6d4"
          speed={1}
          size={0.7}
        />
        <AnimatedSphere
          position={[-1, -2, -1]}
          color="#a78bfa"
          speed={0.6}
          size={0.5}
        />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
