'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import DataTag from '@/components/ui/DataTag';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { skills } from '@/lib/constants';

const NeuralMeshCanvas = dynamic(() => import('./NeuralMeshCanvas'), { ssr: false });

const skillCategories: Record<string, 'sapphire' | 'gold' | 'sage'> = {
  Python: 'sapphire', PyTorch: 'sapphire', 'Remote Sensing': 'sapphire', MATLAB: 'sapphire',
  'GLSL/Shaders': 'gold', React: 'gold', 'Next.js': 'gold', LaTeX: 'gold', FreeRTOS: 'gold',
  'C/C++': 'sage', VHDL: 'sage', 'AVR Assembly': 'sage', 'Embedded Systems': 'sage',
};

const sizeMap = {
  large: 'text-sm px-3 py-1.5',
  medium: 'text-xs px-2.5 py-1',
  small: 'text-[10px] px-2 py-0.5',
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: 3D Neural Mesh */}
          <ScrollReveal direction="left">
            <div className="sticky top-24">
              <Suspense fallback={<div className="h-[420px] bg-[#0D1117] rounded-lg flex items-center justify-center"><span className="font-mono text-xs text-[#4A4840]">LOADING MESH...</span></div>}>
                <NeuralMeshCanvas />
              </Suspense>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {['VMamba', 'SSM', 'Remote Sensing', 'EE', 'raceday.lk'].map((label) => (
                  <span key={label} className="font-mono text-[9px] text-[#4A4840] border border-[#1E2530] px-2 py-0.5 tracking-widest">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Bio */}
          <ScrollReveal direction="right">
            <SectionHeader number="01" title="ABOUT ME" subtitle="Signal profile" />

            {/* Identity block */}
            <div className="mb-8 p-5 border border-[#1E2530] bg-[#0D1117] font-mono text-xs space-y-2">
              <div><span className="text-[#4A4840]">NAME:         </span><span className="text-[#E2DDD4]">Dineth Perera</span></div>
              <div><span className="text-[#4A4840]">ROLE:         </span><span className="text-[#E2DDD4]">EE Undergraduate</span></div>
              <div><span className="text-[#4A4840]">INSTITUTION:  </span><span className="text-[#E2DDD4]">University of Peradeniya (E/21/291)</span></div>
              <div><span className="text-[#4A4840]">STATUS:       </span><span className="text-[#7CB4D4]">GPA 3.75 · Toastmaster · Entrepreneur</span></div>
            </div>

            <p className="text-[#8B8578] font-mono text-sm leading-relaxed mb-10">
              I work at the intersection of signal processing, computer vision, and remote sensing AI — pushing
              the boundaries of what's possible with satellite imagery analysis. Active Toastmaster at
              Central Link Toastmasters for 3 years with a Treasurer role. Beyond research,
              I co-own raceday.lk, Sri Lanka's first and most recognized online luxury car marketplace
              with a 10,000+ follower community.
            </p>

            {/* Skill Constellation */}
            <div>
              <h3 className="font-mono text-xs text-[#4A4840] tracking-widest uppercase mb-4">// SKILL CONSTELLATION</h3>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(sizeMap) as Array<keyof typeof sizeMap>).flatMap((tier) =>
                  (skills[tier] as string[]).map((skill) => (
                    <DataTag
                      key={skill}
                      label={skill}
                      color={skillCategories[skill] ?? 'sapphire'}
                      className={sizeMap[tier]}
                    />
                  ))
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
