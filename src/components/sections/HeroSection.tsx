'use client';

import { motion } from 'framer-motion';
import DataTag from '@/components/ui/DataTag';
import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';

const DiffusionReveal = dynamic(() => import('@/components/ui/DiffusionReveal'), { ssr: false });

const stats = [
  { value: '3.75', label: 'GPA' },
  { value: '10K+', label: 'RACEDAY.LK' },
  { value: '3 YRS', label: 'TOASTMASTERS' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#07090F]"
    >
      {/* Animated neural network background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,127,165,0.07) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <NeuralNetBg />
        <StarField />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
          {/* Left content */}
          <motion.div
            className="flex-1 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6 flex gap-3">
              <DataTag label="EE UNDERGRADUATE" color="sapphire" />
              <DataTag label="TOASTMASTER" color="gold" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-[Syne,sans-serif] font-extrabold leading-none mb-4" style={{ fontSize: 'clamp(56px,9vw,110px)' }}>
              <span className="block text-[#E2DDD4]">DINETH</span>
              <span className="block bg-gradient-to-r from-[#4A7FA5] to-[#C49A6C] bg-clip-text text-transparent">PERERA</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="font-mono text-[#C49A6C] text-sm md:text-base tracking-widest mb-6">
              Research Engineer · Entrepreneur · Toastmaster
            </motion.p>

            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-[#4A7FA5] via-[#C49A6C] to-transparent mb-6 max-w-sm" />

            <motion.p variants={itemVariants} className="text-[#8B8578] text-sm leading-relaxed max-w-lg mb-8 font-mono">
              Electrical & Electronic Engineering undergraduate at the University of Peradeniya.
              Toastmaster. Co-owner of raceday.lk — Sri Lanka's first online luxury car marketplace.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <Link
                href="#research"
                className="group relative font-mono text-xs tracking-widest bg-[#4A7FA5] text-white px-6 py-3 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10">VIEW RESEARCH</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A7FA5] to-[#7CB4D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="#beyond"
                className="group relative font-mono text-xs tracking-widest border border-[#C49A6C] text-[#C49A6C] px-6 py-3 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10">RACEDAY.LK</span>
                <div className="absolute inset-0 bg-[#C49A6C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div variants={itemVariants} className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center group cursor-default">
                  <div className="font-[Syne,sans-serif] font-bold text-xl text-[#E2DDD4] group-hover:text-[#4A7FA5] transition-colors duration-300">{s.value}</div>
                  <div className="font-mono text-[9px] text-[#4A4840] tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Diffusion photo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <Suspense
              fallback={
                <div
                  className="rounded-full bg-[#0D1117] border border-[#1E2530] flex items-center justify-center animate-pulse"
                  style={{ width: 360, height: 360 }}
                >
                  <span className="font-mono text-xs text-[#4A4840]">▓▓▓ LOADING ▓▓▓</span>
                </div>
              }
            >
              <DiffusionReveal />
            </Suspense>
            <div className="mt-8 font-mono text-[8px] text-[#4A4840] tracking-[0.5em]">
              D-I-N-E-T-H · P-E-R-E-R-A
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated scan line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none overflow-hidden opacity-20">
        <div className="w-full bg-gradient-to-b from-transparent via-[#4A7FA5] to-transparent h-1/3 animate-[dataStream_4s_linear_infinite]" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] text-[#4A4840] tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-6 bg-gradient-to-b from-[#4A7FA5] to-transparent"
        />
      </motion.div>
    </section>
  );
}

/** Animated neural network connections in the background */
function NeuralNetBg() {
  const [nodes, setNodes] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    setNodes(
      Array.from({ length: 30 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connections */}
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => {
            const dist = Math.hypot(n.x - m.x, n.y - m.y);
            if (dist > 25) return null;
            return (
              <line
                key={`${i}-${j}`}
                x1={n.x} y1={n.y}
                x2={m.x} y2={m.y}
                stroke="#4A7FA5"
                strokeWidth="0.08"
                opacity={0.15 * (1 - dist / 25)}
              />
            );
          })
        )}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x} cy={n.y}
            r={n.size * 0.1}
            fill="#4A7FA5"
            opacity={0.2}
          >
            <animate
              attributeName="opacity"
              values="0.1;0.3;0.1"
              dur={`${3 + n.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}

function StarField() {
  const [stars, setStars] = useState<{ size: number; left: number; top: number; opacity: number; delay: number; dur: number }[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 80 }).map(() => ({
        size: Math.random() * 2 + 0.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.05,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0">
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'white',
            opacity: s.opacity,
            animation: `pulseGlow ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
          />
      ))}
    </div>
  );
}
