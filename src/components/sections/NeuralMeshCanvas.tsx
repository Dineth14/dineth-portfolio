'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 40;
const EDGE_PROB = 0.15;

const NODE_LABELS = ['VMamba', 'NSST', 'Remote Sensing', 'EE', 'raceday.lk', 'DSP', 'PyTorch', 'FPGA'];

function NeuralMesh() {
  const groupRef = useRef<THREE.Group>(null!);
  const time = useRef(0);

  const { nodes, edges } = useMemo(() => {
    const ns: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      ns.push(new THREE.Vector3(
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 240,
        (Math.random() - 0.5) * 80
      ));
    }
    const es: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (Math.random() < EDGE_PROB) es.push([i, j]);
      }
    }
    return { nodes: ns, edges: es };
  }, []);

  // Build line geometry
  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      arr[i * 6 + 0] = nodes[a].x; arr[i * 6 + 1] = nodes[a].y; arr[i * 6 + 2] = nodes[a].z;
      arr[i * 6 + 3] = nodes[b].x; arr[i * 6 + 4] = nodes[b].y; arr[i * 6 + 5] = nodes[b].z;
    });
    return arr;
  }, [edges, nodes]);

  useFrame((_, delta) => {
    time.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#4A7FA5" opacity={0.25} transparent />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((pos, i) => {
        const isGold = i % 7 === 0;
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[isGold ? 4 : 2.5, 8, 8]} />
            <meshStandardMaterial
              color={isGold ? '#C49A6C' : '#4A7FA5'}
              emissive={isGold ? '#C49A6C' : '#4A7FA5'}
              emissiveIntensity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function NeuralMeshCanvas() {
  return (
    <Canvas
      style={{ width: '100%', height: 420 }}
      camera={{ position: [0, 0, 300], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[100, 100, 100]} intensity={0.8} />
      <NeuralMesh />
    </Canvas>
  );
}
