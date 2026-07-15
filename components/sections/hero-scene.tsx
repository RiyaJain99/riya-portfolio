"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const TEAL = "#2dd4bf";
const SKY = "#38bdf8";
const AMBER = "#f59e0b";

function GlassShape({
  geometry,
  color,
  position,
  scale = 1,
  floatSpeed = 1.2,
  rotationSpeed = 0.15,
}: {
  geometry: React.ReactElement;
  color: string;
  position: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  rotationSpeed?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.x += delta * rotationSpeed;
    group.current.rotation.y += delta * rotationSpeed * 0.7;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={1.1}>
      <group ref={group} position={position} scale={scale}>
        <mesh>
          {geometry}
          <meshPhysicalMaterial
            color={color}
            roughness={0.15}
            metalness={0.1}
            transparent
            opacity={0.35}
          />
        </mesh>
        <mesh>
          {geometry}
          <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

const PARTICLE_COUNT = 150;

// Precomputed once at module load (not during render) so the field is a
// pure, stable value rather than a fresh random layout on every render.
const { positions: PARTICLE_POSITIONS, colors: PARTICLE_COLORS } = (() => {
  const palette = [new THREE.Color(TEAL), new THREE.Color(SKY), new THREE.Color(AMBER)];
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    const c = palette[i % palette.length];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
})();

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[PARTICLE_COLORS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitingLights() {
  const teal = useRef<THREE.PointLight>(null);
  const sky = useRef<THREE.PointLight>(null);
  const amber = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (teal.current) {
      teal.current.position.set(Math.sin(t * 0.3) * 8, Math.cos(t * 0.2) * 4, 4);
    }
    if (sky.current) {
      sky.current.position.set(
        Math.cos(t * 0.25) * 7,
        Math.sin(t * 0.35) * 5,
        -2,
      );
    }
    if (amber.current) {
      amber.current.position.set(
        Math.sin(t * 0.2 + 2) * 6,
        Math.cos(t * 0.3 + 1) * -4,
        3,
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={teal} color={TEAL} intensity={40} distance={20} />
      <pointLight ref={sky} color={SKY} intensity={30} distance={20} />
      <pointLight ref={amber} color={AMBER} intensity={25} distance={20} />
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.8 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const tetraSeeds = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2;
  const radius = 6 + (i % 3);
  return {
    position: [
      Math.cos(angle) * radius,
      Math.sin(angle * 1.3) * 3,
      Math.sin(angle) * radius * 0.4 - 2,
    ] as [number, number, number],
    scale: 0.35 + (i % 3) * 0.15,
    color: [TEAL, SKY, AMBER][i % 3],
    speed: 0.9 + i * 0.15,
  };
});

function Scene() {
  const icosahedron = <icosahedronGeometry args={[1.6, 0]} />;
  const octahedron = <octahedronGeometry args={[1.3, 0]} />;
  const torus = <torusGeometry args={[1.1, 0.35, 16, 64]} />;
  const tetra = <tetrahedronGeometry args={[1, 0]} />;

  return (
    <>
      <OrbitingLights />
      <CameraRig />
      <ParticleField />

      <GlassShape
        geometry={icosahedron}
        color={TEAL}
        position={[-3.4, 0.6, 0]}
        floatSpeed={1}
      />
      <GlassShape
        geometry={octahedron}
        color={SKY}
        position={[3.6, 1.2, -1]}
        floatSpeed={1.3}
      />
      <GlassShape
        geometry={torus}
        color={AMBER}
        position={[0.2, -2.4, -1.5]}
        floatSpeed={0.8}
      />

      {tetraSeeds.map((seed, i) => (
        <GlassShape
          key={i}
          geometry={tetra}
          color={seed.color}
          position={seed.position}
          scale={seed.scale}
          floatSpeed={seed.speed}
          rotationSpeed={0.25}
        />
      ))}
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 200 }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
