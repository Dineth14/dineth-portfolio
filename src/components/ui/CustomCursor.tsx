'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [label, setLabel] = useState('');

  const x = useSpring(pos.x, { stiffness: 300, damping: 30 });
  const y = useSpring(pos.y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isClickable =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.getAttribute('role') === 'button';
      setIsHover(!!isClickable);
      setLabel(isClickable ? 'VIEW' : '');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  useEffect(() => {
    x.set(pos.x);
    y.set(pos.y);
  }, [pos, x, y]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99999,
          pointerEvents: 'none',
          width: isHover ? 48 : 24,
          height: isHover ? 48 : 24,
          borderRadius: '50%',
          border: '1.5px solid rgba(74,127,165,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        transition={{ duration: 0.2 }}
        className="hidden md:flex"
      >
        {isHover && (
          <span style={{ fontSize: 7, letterSpacing: '0.15em', color: '#4A7FA5', fontFamily: 'JetBrains Mono' }}>
            {label}
          </span>
        )}
      </motion.div>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99999,
          pointerEvents: 'none',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#4A7FA5',
        }}
        className="hidden md:block"
      />
    </>
  );
}
