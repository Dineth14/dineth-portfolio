'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import GlowBorder from '@/components/ui/GlowBorder';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/lib/constants';
import { ExternalLink, GitFork } from 'lucide-react';

const CATEGORIES = ['ALL', 'RESEARCH', 'EMBEDDED', 'SUBJECT'] as const;
type Category = typeof CATEGORIES[number];

const statusColors: Record<string, string> = {
  ACTIVE: '#4A7FA5',
  COMPLETE: '#6B8F71',
  LIVE: '#C49A6C',
  'IN PROGRESS': '#8B8578',
};

const commitLines = [
  'feat(xlet-nsst): add transform pipeline and reconstruction scripts',
  'feat(wavelets-contourlets): benchmark multiscale decomposition outputs',
  'feat(elephant-detection): classify infrasound vibration event windows',
  'fix(esp32-logger): stabilize streaming and timestamp alignment',
  'docs(ee-325): add DSP lab writeups and filter design notes',
  'chore(subject-repos): sync EE/ME lab repository structure',
];

function stableCommitId(line: string, index: number) {
  let hash = 2166136261 ^ index;
  for (let i = 0; i < line.length; i++) {
    hash ^= line.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `a${(hash >>> 0).toString(16).padStart(8, '0').slice(0, 7)}`;
}

interface Project {
  name: string;
  category: string;
  description: string;
  tech: string[];
  github?: string;
  url?: string;
  status: string;
  featured: boolean;
  stars: string;
}

function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const link = project.github ?? project.url ?? '#';
  const statusColor = statusColors[project.status] ?? '#8B8578';

  return (
    <div
      className="relative"
      style={{ perspective: '1000px', height: 280 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { resetTilt(); setFlipped(false); }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: tilt.x,
          rotateY: flipped ? 180 : tilt.y,
          transition: 'transform 0.4s ease',
        }}
        animate={{ rotateY: flipped ? 180 : tilt.y, rotateX: flipped ? 0 : tilt.x }}
        transition={{ duration: 0.4 }}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg border border-[#1E2530] bg-[#0D1117] p-6 flex flex-col justify-between cursor-pointer"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div>
            <div className="flex items-start justify-between mb-3">
              <span
                className="font-mono text-[9px] tracking-widest border px-2 py-0.5 rounded"
                style={{ color: statusColor, borderColor: `${statusColor}50`, background: `${statusColor}10` }}
              >
                {project.status}
              </span>
              <span className="font-mono text-[9px] text-[#4A4840] border border-[#1E2530] px-2 py-0.5 rounded">
                {project.category}
              </span>
            </div>
            <h3 className="font-[Syne,sans-serif] font-bold text-[#E2DDD4] text-base leading-tight mb-3">
              {project.name}
            </h3>
            <p className="font-mono text-[11px] text-[#8B8578] leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-[9px] border border-[#1E2530] text-[#4A4840] px-1.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 font-mono text-[9px] text-[#4A4840] tracking-widest">CLICK TO FLIP →</div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg border border-[#4A7FA5]/30 bg-[#0D1117] p-6 flex flex-col justify-between cursor-pointer"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <h3 className="font-[Syne,sans-serif] font-bold text-[#7CB4D4] text-sm mb-3">{project.name}</h3>
            <p className="font-mono text-[11px] text-[#8B8578] leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-[9px] text-[#4A7FA5] border border-[#4A7FA5]/30 px-1.5 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 font-mono text-xs text-[#4A7FA5] border border-[#4A7FA5]/30 px-3 py-1.5 hover:bg-[#4A7FA5]/10 transition-colors"
              >
                <GitFork size={12} /> GITHUB
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 font-mono text-xs text-[#C49A6C] border border-[#C49A6C]/30 px-3 py-1.5 hover:bg-[#C49A6C]/10 transition-colors"
              >
                <ExternalLink size={12} /> VISIT SITE
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  const filtered = projects.filter(
    (p) => activeCategory === 'ALL' || p.category === activeCategory
  );

  return (
    <section id="projects" className="relative py-32 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader number="03" title="PROJECTS" subtitle="Deployed systems" />
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs tracking-widest px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-[#4A7FA5] text-[#4A7FA5] bg-[#4A7FA5]/10'
                    : 'border-[#1E2530] text-[#4A4840] hover:border-[#4A7FA5]/40 hover:text-[#8B8578]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <ProjectCard project={project as Project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub Activity Terminal */}
        <ScrollReveal>
          <GlowBorder className="p-6" color="sapphire">
            <div className="font-mono text-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1E2530]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[#4A4840] flex-1">SIGNAL TERMINAL</span>
              </div>
              <div className="text-[#4A7FA5] mb-3">$ git log --author=Dineth14 --oneline --recent</div>
              {commitLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="mb-1.5 text-[#8B8578]"
                >
                  <span className="text-[#4A4840] mr-2">{stableCommitId(line, i)}</span>
                  {line}
                </motion.div>
              ))}
              <div className="mt-3 flex items-center gap-1 text-[#4A7FA5]">
                <span>$</span>
                <span className="inline-block w-2 h-3.5 bg-[#4A7FA5] animate-[blink_1s_step-end_infinite]" />
              </div>
              <div className="mt-4 pt-3 border-t border-[#1E2530]">
                <a
                  href="https://github.com/Dineth14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C49A6C] hover:text-[#E2DDD4] transition-colors"
                >
                  → VIEW FULL PROFILE: github.com/Dineth14
                </a>
              </div>
            </div>
          </GlowBorder>
        </ScrollReveal>
      </div>
    </section>
  );
}
