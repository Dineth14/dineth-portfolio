'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { awards } from '@/lib/constants';

export default function HonorsSection() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true });

  const allItems = [...awards];

  return (
    <section id="honors" className="relative py-32 bg-[#07090F]">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader number="04" title="HONORS & AWARDS" subtitle="Received transmissions" align="center" />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden">
            <motion.div
              style={{
                height: lineInView ? '100%' : '0%',
                background: 'linear-gradient(to bottom, #4A7FA5, transparent)',
                transition: 'height 1.5s ease-out',
              }}
            />
          </div>

          <div className="space-y-12">
            {allItems.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`inline-block p-5 border rounded-lg bg-[#0D1117] ${
                        item.featured
                          ? 'border-[#C49A6C]/50'
                          : 'border-[#1E2530]'
                      }`}
                      style={item.featured ? { boxShadow: '0 0 20px rgba(196,154,108,0.1)' } : {}}
                    >
                      <span className="font-mono text-[10px] text-[#4A4840] tracking-widest">{item.year}</span>
                      <h3
                        className={`font-[Syne,sans-serif] font-bold mt-1 mb-2 leading-tight ${
                          item.featured
                            ? 'text-[#C49A6C] text-base'
                            : 'text-[#E2DDD4] text-sm'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="font-mono text-[10px] text-[#4A7FA5] tracking-widest mb-2">{item.org}</p>
                      <p className="font-mono text-xs text-[#8B8578] leading-relaxed max-w-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Orb */}
                  <div className="flex-shrink-0 relative z-10">
                    <motion.div
                      className={`rounded-full border-2 flex items-center justify-center ${
                        item.featured
                          ? 'w-6 h-6 border-[#C49A6C] bg-[#C49A6C]/20'
                          : 'w-4 h-4 border-[#4A7FA5] bg-[#4A7FA5]/20'
                      }`}
                      animate={
                        item.featured
                          ? { boxShadow: ['0 0 8px rgba(196,154,108,0.4)', '0 0 20px rgba(196,154,108,0.8)', '0 0 8px rgba(196,154,108,0.4)'] }
                          : {}
                      }
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
