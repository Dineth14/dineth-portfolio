'use client';

import { motion } from 'framer-motion';
import DataTag from '@/components/ui/DataTag';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Link from 'next/link';

const ParticleCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

const stats = [
  { value: '3.9', label: 'TARGET GPA' },
  { value: 'IGARSS', label: 'IEEE 2026' },
  { value: 'LK', label: 'RACEDAY.LK' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#07090F]"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,127,165,0.07) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        {/* Stars */}
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
            <motion.div variants={itemVariants} className="mb-6">
              <DataTag label="EE UNDERGRADUATE" color="sapphire" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-[Syne,sans-serif] font-extrabold leading-none mb-4" style={{ fontSize: 'clamp(60px,10vw,120px)' }}>
              <span className="block text-[#E2DDD4]">DINETH</span>
              <span className="block text-[#E2DDD4]">PERERA</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="font-mono text-[#C49A6C] text-sm md:text-base tracking-widest mb-6">
              Research Engineer · Founder · IEEE Author
            </motion.p>

            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-[#4A7FA5] to-transparent mb-6 max-w-sm" />

            <motion.p variants={itemVariants} className="text-[#8B8578] text-sm leading-relaxed max-w-lg mb-8 font-mono">
              Electrical & Electronic Engineering undergraduate at the University of Peradeniya,
              working at the frontier of computer vision and remote sensing AI. First-author on an IEEE IGARSS 2026
              paper (UrbanMamba) and founder of raceday.lk — Sri Lanka's premier motorsport media brand.
              Targeting PhD programs at Johns Hopkins, UC Berkeley, and CMU.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <Link
                href="#research"
                className="font-mono text-xs tracking-widest bg-[#4A7FA5] text-white px-6 py-3 hover:bg-[#7CB4D4] transition-all duration-200 hover:scale-[1.02]"
              >
                VIEW RESEARCH
              </Link>
              <a
                href="https://github.com/Dineth14"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest border border-[#4A7FA5] text-[#4A7FA5] px-6 py-3 hover:bg-[#4A7FA5]/10 transition-all duration-200 hover:scale-[1.02]"
              >
                GITHUB: DINETH14
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-[Syne,sans-serif] font-bold text-xl text-[#E2DDD4]">{s.value}</div>
                  <div className="font-mono text-[9px] text-[#4A4840] tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Particle canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <div
              className="relative rounded-full"
              style={{ boxShadow: '0 0 80px rgba(74,127,165,0.2), 0 0 160px rgba(74,127,165,0.08)' }}
            >
              <Suspense
                fallback={
                  <div
                    className="rounded-full bg-[#0D1117] border border-[#1E2530] flex items-center justify-center"
                    style={{ width: 340, height: 340 }}
                  >
                    <span className="font-mono text-xs text-[#4A4840]">LOADING...</span>
                  </div>
                }
              >
                <ParticleCanvas />
              </Suspense>
            </div>
            {/* Decorative monospace name */}
            <div className="mt-4 font-mono text-[8px] text-[#4A4840] tracking-[0.5em]">
              D-I-N-E-T-H · P-E-R-E-R-A
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vertical scan line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none overflow-hidden opacity-20">
        <div className="w-full bg-gradient-to-b from-transparent via-[#4A7FA5] to-transparent h-1/3 animate-[dataStream_4s_linear_infinite]" />
      </div>
    </section>
  );
}

function StarField() {
  const count = typeof window !== 'undefined' ? 120 : 0;
  return (
    <div className="absolute inset-0">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const delay = Math.random() * 4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'white',
              opacity,
              animation: `pulseGlow ${2 + Math.random() * 3}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
