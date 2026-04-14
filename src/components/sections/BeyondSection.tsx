'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import DataTag from '@/components/ui/DataTag';
import GlowBorder from '@/components/ui/GlowBorder';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ExternalLink } from 'lucide-react';

const passions = [
  {
    title: 'Cars & Luxury Automotive',
    description:
      'Co-owner of raceday.lk — Sri Lanka\'s first online luxury car marketplace. Passionate about cars since day one, building a 10,000+ follower community.',
    icon: (
      <svg viewBox="0 0 80 40" className="w-16 h-8 mb-3">
        <path d="M5 30 Q20 10 40 20 Q60 10 75 30" stroke="#C49A6C" strokeWidth="2" fill="none" />
        <path d="M40 20 L40 5" stroke="#C49A6C" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="40" cy="4" r="2" fill="#C49A6C" className="animate-[pulseGlow_2s_ease-in-out_infinite]" />
      </svg>
    ),
  },
  {
    title: 'Toastmasters & Public Speaking',
    description:
      'Active member of Central Link Toastmasters for 3 years. Served as Treasurer (Jul 2024 – Jul 2025). Communication and leadership development.',
    icon: (
      <svg viewBox="0 0 80 50" className="w-16 h-10 mb-3">
        <rect x="30" y="5" width="20" height="30" rx="10" stroke="#4A7FA5" strokeWidth="1.5" fill="none" />
        <line x1="40" y1="35" x2="40" y2="45" stroke="#4A7FA5" strokeWidth="1.5" />
        <line x1="30" y1="45" x2="50" y2="45" stroke="#4A7FA5" strokeWidth="1.5" />
        <path d="M22 15 Q22 25 30 28" stroke="#4A7FA5" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.5" />
        <path d="M58 15 Q58 25 50 28" stroke="#4A7FA5" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Embedded Systems Tinkering',
    description:
      'Where research meets hardware — building physical systems that respond to the real world.',
    icon: (
      <svg viewBox="0 0 80 50" className="w-16 h-10 mb-3">
        <rect x="20" y="10" width="40" height="30" rx="2" stroke="#4A7FA5" strokeWidth="1.5" fill="none" />
        <circle cx="30" cy="20" r="2" fill="#4A7FA5" />
        <circle cx="40" cy="20" r="2" fill="#4A7FA5" />
        <circle cx="50" cy="20" r="2" fill="#4A7FA5" />
        <circle cx="30" cy="30" r="2" fill="#6B8F71" />
        <circle cx="40" cy="30" r="2" fill="#6B8F71" />
        <circle cx="50" cy="30" r="2" fill="#6B8F71" />
        <line x1="15" y1="25" x2="20" y2="25" stroke="#4A7FA5" strokeWidth="1" />
        <line x1="60" y1="25" x2="65" y2="25" stroke="#4A7FA5" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: 'Teaching & Knowledge Sharing',
    description:
      'Built interactive textbook simulations for EE courses. Learning is better when you can play with the system.',
    icon: (
      <svg viewBox="0 0 80 50" className="w-16 h-10 mb-3">
        <circle cx="40" cy="25" r="6" fill="none" stroke="#6B8F71" strokeWidth="1.5" />
        <circle cx="20" cy="15" r="4" fill="none" stroke="#4A7FA5" strokeWidth="1" />
        <circle cx="60" cy="15" r="4" fill="none" stroke="#4A7FA5" strokeWidth="1" />
        <circle cx="20" cy="35" r="4" fill="none" stroke="#4A7FA5" strokeWidth="1" />
        <circle cx="60" cy="35" r="4" fill="none" stroke="#4A7FA5" strokeWidth="1" />
        <line x1="24" y1="17" x2="34" y2="22" stroke="#1E2530" strokeWidth="1" />
        <line x1="56" y1="17" x2="46" y2="22" stroke="#1E2530" strokeWidth="1" />
        <line x1="24" y1="33" x2="34" y2="28" stroke="#1E2530" strokeWidth="1" />
        <line x1="56" y1="33" x2="46" y2="28" stroke="#1E2530" strokeWidth="1" />
      </svg>
    ),
  },
];

function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
          style={{
            top: `${8 + i * 7}%`,
            width: '60%',
            left: '-10%',
            animation: `dataStream ${1.5 + i * 0.2}s linear ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function BeyondSection() {
  return (
    <section id="beyond" className="relative py-32 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader number="05" title="BEYOND RESEARCH" subtitle="Off-frequency signals" />
        </ScrollReveal>

        {/* raceday.lk Feature */}
        <ScrollReveal delay={0.1}>
          <div className="relative mb-12 overflow-hidden rounded-lg border border-[#1E2530] bg-[#0D1117]">
            <SpeedLines />
            {/* Red racing accent stripe */}
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <DataTag label="CO-OWNER" color="gold" />
                    <DataTag label="LIVE" color="sage" />
                    <DataTag label="SINCE 2021" color="sapphire" />
                  </div>
                  <h3 className="font-[Syne,sans-serif] font-extrabold text-3xl md:text-4xl text-[#E2DDD4] mb-2 tracking-tight">
                    RACEDAY.LK
                  </h3>
                  <p className="font-mono text-[#C49A6C] text-sm tracking-widest mb-4">
                    Sri Lanka's First Online Luxury Car Marketplace
                  </p>
                  <p className="font-mono text-sm text-[#8B8578] leading-relaxed max-w-lg mb-6">
                    Co-owned with my brother since November 2021. Sri Lanka's first and most recognized
                    online luxury car marketplace with a 10,000+ follower community. Built from scratch —
                    listings, content, code, and community.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Luxury Cars', 'Marketplace', 'Sri Lanka', '10K+ Community'].map((tag) => (
                      <DataTag key={tag} label={tag} color="gold" />
                    ))}
                  </div>
                  <a
                    href="https://raceday.lk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest border border-red-500 text-red-400 px-6 py-3 hover:bg-red-500/10 transition-all duration-200"
                  >
                    VISIT SITE <ExternalLink size={12} />
                  </a>
                </div>

                {/* Speedometer SVG */}
                <div className="flex-shrink-0">
                  <svg viewBox="0 0 160 100" width="200" className="opacity-70">
                    <path d="M20 80 A60 60 0 0 1 140 80" stroke="#1E2530" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <motion.path
                      d="M20 80 A60 60 0 0 1 140 80"
                      stroke="url(#speedGrad)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="188"
                      initial={{ strokeDashoffset: 188 }}
                      whileInView={{ strokeDashoffset: 60 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4A7FA5" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    <text x="80" y="75" textAnchor="middle" fontSize="10" fill="#8B8578" fontFamily="JetBrains Mono">RPM</text>
                    {[0, 2, 4, 6, 8].map((v, i) => {
                      const angle = -160 + i * 40;
                      const rad = (angle * Math.PI) / 180;
                      const x = 80 + 55 * Math.cos(rad);
                      const y = 80 + 55 * Math.sin(rad);
                      return <text key={v} x={x} y={y} textAnchor="middle" fontSize="7" fill="#4A4840" fontFamily="JetBrains Mono">{v}k</text>;
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Passion Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {passions.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <GlowBorder className="p-6 h-full hover:-translate-y-2 transition-transform duration-300">
                {p.icon}
                <h3 className="font-[Syne,sans-serif] font-bold text-[#E2DDD4] mb-3">{p.title}</h3>
                <p className="font-mono text-xs text-[#8B8578] leading-relaxed">{p.description}</p>
              </GlowBorder>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
