'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// TODO: Replace /images/profile.jpg with actual photo
const PARTICLE_COUNT = 8000;
const SIZE = 340;

function Particles() {
  const mesh = useRef<THREE.Points>(null!);
  const { size } = useThree();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const time = useRef(0);

  const { positions, colors, phases } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const ph = new Float32Array(PARTICLE_COUNT);
    const r = SIZE / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(Math.random()) * r;
      pos[i * 3] = Math.cos(angle) * dist;
      pos[i * 3 + 1] = Math.sin(angle) * dist;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Sapphire-tinted blue particles
      const t = Math.random();
      col[i * 3] = 0.29 + t * 0.2;   // R
      col[i * 3 + 1] = 0.5 + t * 0.2; // G
      col[i * 3 + 2] = 0.65 + t * 0.3; // B

      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, colors: col, phases: ph };
  }, []);

  const initPositions = useMemo(() => Float32Array.from(positions), [positions]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rect = (e.target as Element)?.getBoundingClientRect?.() ?? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((_, delta) => {
    time.current += delta;
    const geo = mesh.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = time.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phase = phases[i];
      const amplitude = 4;
      pos[i * 3] = initPositions[i * 3] + Math.sin(t * 0.8 + phase) * amplitude;
      pos[i * 3 + 1] = initPositions[i * 3 + 1] + Math.cos(t * 0.6 + phase * 1.3) * amplitude;
      pos[i * 3 + 2] = initPositions[i * 3 + 2] + Math.sin(t * 0.4 + phase * 0.7) * 2;
    }

    geo.attributes.position.needsUpdate = true;
    mesh.current.rotation.z = Math.sin(t * 0.15) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
        <bufferAttribute args={[phases, 1]} attach="attributes-phase" />
      </bufferGeometry>
      <pointsMaterial
        size={1.8}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      style={{ width: SIZE, height: SIZE, borderRadius: '50%' }}
      camera={{ position: [0, 0, 400], fov: 55 }}
      gl={{ alpha: true, antialias: false }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
    </Canvas>
  );
}
