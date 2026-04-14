'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type ProjectSceneType =
  | 'wave'
  | 'sensor'
  | 'power'
  | 'field'
  | 'control'
  | 'circuit'
  | 'lab';

function WaveGlyph() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.45;
    groupRef.current.rotation.x = Math.sin(performance.now() * 0.0006) * 0.35;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusKnotGeometry args={[0.85, 0.22, 120, 16, 2, 3]} />
        <meshStandardMaterial color="#4A7FA5" emissive="#4A7FA5" emissiveIntensity={0.35} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <ringGeometry args={[1.25, 1.35, 48]} />
        <meshBasicMaterial color="#C49A6C" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function SensorGlyph() {
  const groupRef = useRef<THREE.Group>(null!);
  const nodes = useMemo(() => Array.from({ length: 8 }).map((_, i) => i), []);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.children.forEach((child, i) => {
      if (i === 0) return;
      const t = state.clock.elapsedTime * 0.8 + i;
      child.position.x = Math.cos(t) * 1.15;
      child.position.z = Math.sin(t) * 1.15;
      child.position.y = Math.sin(t * 1.8) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.15, 0.35, 1.15]} />
        <meshStandardMaterial color="#1E2530" emissive="#4A7FA5" emissiveIntensity={0.25} />
      </mesh>
      {nodes.map((n) => (
        <mesh key={n} position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#7CB4D4" emissive="#7CB4D4" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function PowerGlyph() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.45;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.6 + i * 0.6, -0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.15, 12]} />
          <meshStandardMaterial color="#C49A6C" emissive="#C49A6C" emissiveIntensity={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.85, 0.04, 8, 64]} />
        <meshBasicMaterial color="#4A7FA5" />
      </mesh>
    </group>
  );
}

function FieldGlyph() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {[0.5, 0.9, 1.3].map((r) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.025, 8, 64]} />
          <meshBasicMaterial color="#4A7FA5" transparent opacity={0.65} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#C49A6C" emissive="#C49A6C" emissiveIntensity={0.65} />
      </mesh>
    </group>
  );
}

function ControlGlyph() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.4;
    groupRef.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 1.6 + i * 0.8) * 0.28;
    });
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.8 + i * 0.8, 0, 0]}>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <meshStandardMaterial color="#4A7FA5" emissive="#4A7FA5" emissiveIntensity={0.35} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.2, 64]} />
        <meshBasicMaterial color="#C49A6C" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function CircuitGlyph() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.28;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial color="#7CB4D4" emissive="#4A7FA5" emissiveIntensity={0.45} wireframe />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI * 0.5) * 1.15, Math.sin(i * Math.PI * 0.5) * 0.35, 0]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#C49A6C" emissive="#C49A6C" emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function LabGlyph() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.45) * 0.65;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.3 + i * 0.26, 0]}>
          <boxGeometry args={[1.05 - i * 0.2, 0.14, 0.75 - i * 0.12]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#4A7FA5' : '#1E2530'} emissive="#4A7FA5" emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ type }: { type: ProjectSceneType }) {
  if (type === 'wave') return <WaveGlyph />;
  if (type === 'sensor') return <SensorGlyph />;
  if (type === 'power') return <PowerGlyph />;
  if (type === 'field') return <FieldGlyph />;
  if (type === 'control') return <ControlGlyph />;
  if (type === 'circuit') return <CircuitGlyph />;
  return <LabGlyph />;
}

export default function ProjectGlyph3D({ type }: { type: ProjectSceneType }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 3.5], fov: 45 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} color="#7CB4D4" />
        <pointLight position={[-2, -1, 2]} intensity={0.6} color="#C49A6C" />
        <Scene type={type} />
      </Canvas>
    </div>
  );
}