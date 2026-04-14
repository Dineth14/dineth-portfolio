'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: 'sapphire' | 'gold' | 'sage';
}

const colorMap = {
  sapphire: 'rgba(74,127,165,0.35)',
  gold: 'rgba(196,154,108,0.35)',
  sage: 'rgba(107,143,113,0.35)',
};

export default function GlowBorder({ children, className, color = 'sapphire' }: GlowBorderProps) {
  const glowColor = colorMap[color];
  return (
    <motion.div
      className={cn(
        'relative rounded-lg border border-[#1E2530] bg-[#0D1117] overflow-hidden',
        className
      )}
      style={{ boxShadow: `0 0 0 1px ${glowColor}` }}
      whileHover={{ boxShadow: `0 0 20px 2px ${glowColor}, 0 0 0 1px ${glowColor}` }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle animated corner glow */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
