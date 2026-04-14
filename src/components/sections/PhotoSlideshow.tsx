'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { assetPath } from '@/lib/assetPath';

/**
 * Photo slideshow section.
 *
 * Place your photos in /public/images/slideshow/:
 *   Uses the exact filenames listed in PHOTOS below.
 *
 * The component auto-cycles and supports keyboard/click navigation.
 */

const PHOTOS = [
  { src: assetPath('/images/slideshow/1033.JPG'), caption: 'Portrait study' },
  { src: assetPath('/images/slideshow/1092.JPG'), caption: 'Campus moments' },
  { src: assetPath('/images/slideshow/1148.JPG'), caption: 'Engineering journey' },
  { src: assetPath('/images/slideshow/2063.JPG'), caption: 'Research and project work' },
  { src: assetPath('/images/slideshow/2330.JPG'), caption: 'Professional snapshots' },
  { src: assetPath('/images/slideshow/3238.JPG'), caption: 'Building and learning' },
  { src: assetPath('/images/slideshow/3571.JPG'), caption: 'Milestone moments' },
  { src: assetPath('/images/slideshow/e63df10a-6b7c-4870-9c24-3774852ff1c8.jpeg'), caption: 'Creative problem solving' },
  { src: assetPath('/images/slideshow/HUCH6589.JPG'), caption: 'Events and presentations' },
  { src: assetPath('/images/slideshow/IMG_6402.JPG'), caption: 'Personal gallery' },
  { src: assetPath('/images/slideshow/IMG_7083.JPG'), caption: 'On-site highlights' },
  { src: assetPath('/images/slideshow/IMG_7085.JPG'), caption: 'Field and lab life' },
  { src: assetPath('/images/slideshow/IMG_9599%20%282%29.JPG'), caption: 'Team and collaboration' },
  { src: assetPath('/images/slideshow/KDHG1025.JPG'), caption: 'Captured memories' },
];

export default function PhotoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Track loaded images
  useEffect(() => {
    PHOTOS.forEach((photo, idx) => {
      const img = new Image();
      img.src = photo.src;
      img.onload = () => setLoadedImages((prev) => new Set(prev).add(idx));
    });
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % PHOTOS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + PHOTOS.length) % PHOTOS.length);
  }, []);

  // Auto-cycle
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  // Reset interval on manual navigation
  const navigate = (dir: 'next' | 'prev') => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (dir === 'next') next(); else prev();
    intervalRef.current = setInterval(next, 5000);
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const hasAnyImages = loadedImages.size > 0;

  if (!hasAnyImages) {
    return (
      <section className="relative py-24 bg-[#07090F]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeader number="06" title="GALLERY" subtitle="Visual log" align="center" />
          </ScrollReveal>
          <div className="mt-12 rounded-lg border border-dashed border-[#1E2530] bg-[#0D1117] p-16 text-center">
            <p className="font-mono text-sm text-[#4A4840]">
              Photo slideshow placeholder — add images to{' '}
              <span className="text-[#4A7FA5]">/public/images/slideshow/</span>
            </p>
            <p className="font-mono text-xs text-[#4A4840] mt-2">
              Ensure image filenames match the configured slideshow list.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Only show photos that actually loaded
  const validIndices = Array.from(loadedImages).sort((a, b) => a - b);
  const actualCurrent = validIndices[current % validIndices.length] ?? 0;
  const photo = PHOTOS[actualCurrent];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <section className="relative py-24 bg-[#07090F] overflow-hidden">
      {/* Background neural data lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#4A7FA5] to-transparent"
            style={{
              top: `${5 + i * 5}%`,
              width: '100%',
              animation: `dataStream ${3 + i * 0.3}s linear ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <SectionHeader number="06" title="GALLERY" subtitle="Visual log" align="center" />
        </ScrollReveal>

        <div className="relative mt-12">
          {/* Main image area */}
          <div className="relative aspect-[16/10] max-w-3xl mx-auto rounded-lg overflow-hidden border border-[#1E2530] bg-[#0D1117]">
            {/* Terminal header bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-3 px-4 py-2 bg-[#07090F]/80 backdrop-blur-sm border-b border-[#1E2530]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[9px] text-[#4A4840] tracking-widest flex-1">
                IMG_VIEWER // {String(current + 1).padStart(2, '0')}/{String(validIndices.length).padStart(2, '0')}
              </span>
              <span className="font-mono text-[9px] text-[#4A7FA5] tracking-widest animate-pulse">● LIVE</span>
            </div>

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={actualCurrent}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img
                  src={photo?.src}
                  alt={photo?.caption || ''}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/80 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={actualCurrent}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm text-[#E2DDD4]"
                >
                  {photo?.caption}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => navigate('prev')}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#07090F]/60 border border-[#1E2530] text-[#8B8578] hover:text-[#E2DDD4] hover:border-[#4A7FA5]/50 transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#07090F]/60 border border-[#1E2530] text-[#8B8578] hover:text-[#E2DDD4] hover:border-[#4A7FA5]/50 transition-all"
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {validIndices.map((vi, i) => (
              <button
                key={vi}
                onClick={() => {
                  setDirection(i > current % validIndices.length ? 1 : -1);
                  setCurrent(i);
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(next, 5000);
                }}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  i === current % validIndices.length
                    ? 'bg-[#4A7FA5] w-12'
                    : 'bg-[#1E2530] hover:bg-[#4A4840]'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
