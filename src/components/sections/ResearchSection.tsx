'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import DataTag from '@/components/ui/DataTag';
import GlowBorder from '@/components/ui/GlowBorder';
import ScrollReveal from '@/components/ui/ScrollReveal';

const researchAreas = [
  {
    icon: '📡',
    title: 'Remote Sensing & Semantic Segmentation',
    description:
      'Controlled benchmarking of SSM, CNN, and Transformer backbones for urban scene understanding from aerial/satellite imagery on LoveDA and ISPRS Potsdam.',
    tags: ['VMamba', 'Mamba-SSM', 'Semantic Seg'],
    color: 'sapphire' as const,
  },
  {
    icon: '〰',
    title: 'State-Space Models & Vision Backbones',
    description:
      'Comparative study of Visual State-Space Models (VMamba, MambaVision, Spatial-Mamba) against established CNN and Transformer architectures under identical conditions.',
    tags: ['SSM', 'MambaVision', 'Backbone Comparison'],
    color: 'gold' as const,
  },
  {
    icon: '⚙',
    title: 'Embedded Systems & Edge AI',
    description:
      'Real-time audio classification on ESP32 microcontrollers, FreeRTOS task scheduling, and edge inference pipelines.',
    tags: ['ESP32', 'FreeRTOS', 'k-NN'],
    color: 'sage' as const,
  },
];

const benchmarkData = [
  { name: 'VMamba-S', value: 55.66, highlight: true },
  { name: 'MambaVision-L', value: 55.25, highlight: false },
  { name: 'UNetFormer', value: 48.61, highlight: false },
  { name: 'Spatial-Mamba-B', value: 48.03, highlight: false },
  { name: 'DeepLabv3+', value: 43.01, highlight: false },
];

function BenchmarkChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mt-8">
      <h3 className="font-mono text-xs text-[#4A4840] tracking-widest mb-4">// BENCHMARK: mIoU ON LOVEDA (VAL)</h3>
      <div className="space-y-3">
        {benchmarkData.map((item, i) => (
          <div key={item.name} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#8B8578] w-32 text-right flex-shrink-0">{item.name}</span>
            <div className="flex-1 h-5 bg-[#0D1117] relative overflow-hidden rounded-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${(item.value / 65) * 100}%` } : {}}
                transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
                className={`h-full ${item.highlight ? 'bg-[#C49A6C]' : 'bg-[#4A7FA5]'}`}
                style={{ opacity: item.highlight ? 1 : 0.55 }}
              />
            </div>
            <span className={`font-mono text-[10px] w-12 flex-shrink-0 ${item.highlight ? 'text-[#C49A6C]' : 'text-[#8B8578]'}`}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-32 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader number="02" title="RESEARCH" subtitle="Active transmissions" />
        </ScrollReveal>

        {/* Featured Paper Card */}
        <ScrollReveal delay={0.1}>
          <GlowBorder className="p-8 mb-16" color="gold">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex gap-3 flex-wrap">
                <DataTag label="IEEE IGARSS 2026" color="gold" />
                <DataTag label="ACCEPTED" color="sage" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] text-green-400 tracking-widest">ACTIVE RESEARCH</span>
              </div>
            </div>

            <h3 className="font-[Syne,sans-serif] text-xl md:text-2xl font-bold text-[#E2DDD4] mb-4 leading-tight">
              A Controlled Benchmark of Visual State-Space Backbones with Domain-Shift and Boundary Analysis for Remote-Sensing Segmentation
            </h3>

            <p className="font-mono text-sm text-[#8B8578] leading-relaxed mb-8 max-w-3xl">
              Five backbone families — VMamba, MambaVision, Spatial-Mamba, DeepLabv3+ (CNN), and UNetFormer (Transformer)
              — evaluated under one pipeline, one lightweight U-Net decoder, and one loss function (TriBraid: Lovász + Focal + Boundary).
              The only variable is the backbone, enabling a fair apples-to-apples comparison across SSM, CNN, and Transformer paradigms
              on LoveDA and ISPRS Potsdam benchmarks.
            </p>

            {/* Architecture Diagram */}
            <div className="overflow-x-auto">
              <ArchitectureDiagram />
            </div>

            <BenchmarkChart />

            {/* Citation */}
            <div className="mt-8 p-4 border border-[#1E2530] bg-[#07090F]/60 rounded">
              <h4 className="font-mono text-[10px] text-[#4A4840] tracking-widest mb-2">// CITATION</h4>
              <p className="font-mono text-[11px] text-[#8B8578] leading-relaxed">
                Wasalathilaka, Nichula and Perera, Dineth and Samarakoon, Oshadha et al.,
                &ldquo;A Controlled Benchmark of Visual State-Space Backbones with Domain-Shift and Boundary Analysis
                for Remote-Sensing Segmentation,&rdquo; IEEE IGARSS 2026, Washington D.C.
              </p>
            </div>
          </GlowBorder>
        </ScrollReveal>

        {/* Research Area Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {researchAreas.map((area, i) => (
            <ScrollReveal key={area.title} delay={i * 0.1}>
              <GlowBorder className="p-6 h-full group hover:-translate-y-2 transition-transform duration-300" color={area.color}>
                <div className="text-3xl mb-4">{area.icon}</div>
                <h3 className="font-[Syne,sans-serif] font-bold text-[#E2DDD4] mb-3 leading-tight">{area.title}</h3>
                <p className="font-mono text-xs text-[#8B8578] leading-relaxed mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <DataTag key={tag} label={tag} color={area.color} />
                  ))}
                </div>
              </GlowBorder>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 700 280" className="w-full max-w-2xl" style={{ minWidth: 480 }}>
      {/* Input */}
      <AnimatedBlock x={270} y={10} w={160} h={35} color="#E2DDD4" label="Satellite Image Input" textSize={8} opacity={0.6} />

      {/* Backbone (swappable) */}
      <AnimatedBlock x={220} y={70} w={260} h={55} color="#C49A6C" label="Swappable Backbone (Only Variable)" />

      {/* Backbone options */}
      <text x={350} y={145} textAnchor="middle" fontSize="7" fill="#4A4840" fontFamily="JetBrains Mono">VMamba · MambaVision · Spatial-Mamba · DeepLabv3+ · UNetFormer</text>

      {/* Decoder */}
      <AnimatedBlock x={245} y={160} w={210} h={45} color="#4A7FA5" label="Lightweight U-Net Decoder" />

      {/* Loss */}
      <AnimatedBlock x={235} y={225} w={230} h={35} color="#6B8F71" label="TriBraid Loss (Lovász + Focal + Boundary)" textSize={7} />

      {/* Lines */}
      <line x1="350" y1="45" x2="350" y2="70" stroke="#E2DDD4" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="350" y1="125" x2="350" y2="160" stroke="#C49A6C" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
      <line x1="350" y1="205" x2="350" y2="225" stroke="#4A7FA5" strokeWidth="1.5" strokeOpacity="0.4" />

      {/* Labels */}
      <text x={510} y={100} fontSize="7" fill="#C49A6C" fontFamily="JetBrains Mono" opacity={0.7}>← Only this changes</text>
      <text x={510} y={185} fontSize="7" fill="#4A7FA5" fontFamily="JetBrains Mono" opacity={0.7}>← Fixed across all runs</text>
      <text x={510} y={245} fontSize="7" fill="#6B8F71" fontFamily="JetBrains Mono" opacity={0.7}>← Fixed across all runs</text>
    </svg>
  );
}

function AnimatedBlock({
  x, y, w, h, color, label, opacity = 1, textSize = 8,
}: {
  x: number; y: number; w: number; h: number; color: string; label: string; opacity?: number; textSize?: number;
}) {
  return (
    <g opacity={opacity}>
      <rect
        x={x} y={y} width={w} height={h}
        rx="3"
        fill={`${color}22`}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      <text
        x={x + w / 2} y={y + h / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={textSize}
        fill={color}
        fontFamily="JetBrains Mono"
      >
        {label}
      </text>
    </g>
  );
}
