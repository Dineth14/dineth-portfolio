'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from '@/lib/assetPath';

const SIZE = 360;
const CELL = 4;
const GRID = SIZE / CELL;
const TOTAL_CELLS = GRID * GRID;
const HERO_IMAGE_SRC = assetPath('/images/slideshow/diffuse/IMG_0309.JPG');

/**
 * A noise-to-image diffusion reveal animation.
 * Uses /public/images/slideshow/diffuse/IMG_0309.JPG for the hero portrait.
 * Falls back to animated initials if the image fails to load.
 */
export default function DiffusionReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'noise' | 'diffusing' | 'revealed'>('noise');
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const pixelDataRef = useRef<Uint8ClampedArray | null>(null);
  const revealOrderRef = useRef<number[]>([]);
  const revealedRef = useRef<Set<number>>(new Set());
  const frameRef = useRef(0);

  // Load image and extract pixel data
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = HERO_IMAGE_SRC;
    img.onload = () => {
      imageRef.current = img;
      // Extract pixel data from image
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = SIZE;
      tempCanvas.height = SIZE;
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCtx.drawImage(img, 0, 0, SIZE, SIZE);
      pixelDataRef.current = tempCtx.getImageData(0, 0, SIZE, SIZE).data;
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Generate a synthetic "portrait" pattern if no image
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = SIZE;
      tempCanvas.height = SIZE;
      const tempCtx = tempCanvas.getContext('2d')!;

      // Dark background with radial gradient
      const grad = tempCtx.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE / 2);
      grad.addColorStop(0, '#1a2a3a');
      grad.addColorStop(0.6, '#0D1117');
      grad.addColorStop(1, '#07090F');
      tempCtx.fillStyle = grad;
      tempCtx.fillRect(0, 0, SIZE, SIZE);

      // Initials
      tempCtx.fillStyle = '#4A7FA5';
      tempCtx.font = 'bold 80px Syne, sans-serif';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText('DP', SIZE / 2, SIZE / 2);

      // Subtle ring
      tempCtx.strokeStyle = 'rgba(74,127,165,0.3)';
      tempCtx.lineWidth = 2;
      tempCtx.beginPath();
      tempCtx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 20, 0, Math.PI * 2);
      tempCtx.stroke();

      pixelDataRef.current = tempCtx.getImageData(0, 0, SIZE, SIZE).data;
      setImageLoaded(true);
    };
  }, []);

  // Build reveal order (center-outward spiral with randomness)
  useEffect(() => {
    if (!imageLoaded) return;
    const order: { idx: number; dist: number }[] = [];
    const cx = GRID / 2, cy = GRID / 2;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) + Math.random() * 8;
        order.push({ idx: y * GRID + x, dist });
      }
    }
    order.sort((a, b) => a.dist - b.dist);
    revealOrderRef.current = order.map((o) => o.idx);

    // Start diffusion after a short delay
    const timer = setTimeout(() => setPhase('diffusing'), 800);
    return () => clearTimeout(timer);
  }, [imageLoaded]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pixelDataRef.current) return;
    const ctx = canvas.getContext('2d')!;
    const pixels = pixelDataRef.current;
    const revealed = revealedRef.current;
    const order = revealOrderRef.current;

    ctx.clearRect(0, 0, SIZE, SIZE);

    if (phase === 'noise' || phase === 'diffusing') {
      frameRef.current++;

      // How many cells to reveal per frame during diffusion
      if (phase === 'diffusing') {
        const revealPerFrame = Math.max(12, Math.floor(TOTAL_CELLS / 120));
        for (let i = 0; i < revealPerFrame; i++) {
          if (revealed.size < order.length) {
            revealed.add(order[revealed.size]);
          }
        }
        if (revealed.size >= TOTAL_CELLS) {
          setPhase('revealed');
        }
      }

      // Draw each cell
      for (let gy = 0; gy < GRID; gy++) {
        for (let gx = 0; gx < GRID; gx++) {
          const cellIdx = gy * GRID + gx;
          const px = gx * CELL, py = gy * CELL;

          if (revealed.has(cellIdx)) {
            // Revealed: draw actual pixel block from image
            const srcX = Math.floor(gx * CELL + CELL / 2);
            const srcY = Math.floor(gy * CELL + CELL / 2);
            const pi = (srcY * SIZE + srcX) * 4;
            const r = pixels[pi], g = pixels[pi + 1], b = pixels[pi + 2];
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(px, py, CELL, CELL);
          } else {
            // Noise: animated static
            const t = frameRef.current;
            const hash = (cellIdx * 2654435761 + t * 314159) >>> 0;
            const brightness = (hash % 60) + 5;
            // Tint noise with sapphire color
            const rn = Math.floor(brightness * 0.4);
            const gn = Math.floor(brightness * 0.6);
            const bn = Math.floor(brightness * 1.0);
            ctx.fillStyle = `rgb(${rn},${gn},${bn})`;
            ctx.fillRect(px, py, CELL, CELL);
          }
        }
      }
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'revealed') return;
    let animId: number;
    const loop = () => {
      animate();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [animate, phase]);

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      {/* Glow ring behind */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: phase === 'revealed'
            ? '0 0 60px rgba(74,127,165,0.3), 0 0 120px rgba(74,127,165,0.1)'
            : '0 0 40px rgba(74,127,165,0.15), 0 0 80px rgba(74,127,165,0.05)',
          transition: 'box-shadow 1.5s ease-out',
        }}
      />

      {/* Scanning line overlay during diffusion */}
      <AnimatePresence>
        {phase === 'diffusing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-20"
          >
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4A7FA5] to-transparent"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas for noise/diffusion */}
      <AnimatePresence>
        {phase !== 'revealed' && (
          <motion.canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-full"
            style={{ imageRendering: 'pixelated' }}
          />
        )}
      </AnimatePresence>

      {/* Final revealed image */}
      <AnimatePresence>
        {phase === 'revealed' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full overflow-hidden"
          >
            {imageRef.current ? (
              <img
                src={HERO_IMAGE_SRC}
                alt="Dineth Perera"
                width={SIZE}
                height={SIZE}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2a3a] to-[#0D1117] flex items-center justify-center">
                <span className="font-[Syne,sans-serif] text-6xl font-bold text-[#4A7FA5]">DP</span>
              </div>
            )}

            {/* Subtle border ring */}
            <div className="absolute inset-0 rounded-full border border-[#4A7FA5]/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner data readouts */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'revealed' ? 0.4 : 0.7 }}
          className="font-mono text-[8px] tracking-[0.4em] text-[#4A7FA5]"
        >
          {phase === 'noise' && '▓▓▓ INITIALIZING ▓▓▓'}
          {phase === 'diffusing' && '>>> RECONSTRUCTING <<<'}
          {phase === 'revealed' && 'SIGNAL LOCKED'}
        </motion.span>
      </div>
    </div>
  );
}
