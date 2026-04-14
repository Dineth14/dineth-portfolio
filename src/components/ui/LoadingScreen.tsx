'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('loaded')) {
      setShow(false);
      return;
    }
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setDone(true);
            setTimeout(() => {
              setShow(false);
              sessionStorage.setItem('loaded', '1');
            }, 600);
          }, 400);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const bootLines = [
    'INITIALIZING SIGNAL SYSTEMS...',
    'LOADING RESEARCH MODULES...',
    'ESTABLISHING DEEP SPACE LINK...',
    'CALIBRATING PARTICLE ARRAY...',
    'SYSTEM ONLINE.',
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#07090F',
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {/* Logo */}
          <svg width="80" height="60" viewBox="0 0 80 60" style={{ marginBottom: 32 }}>
            <motion.text
              x="0" y="50"
              fontSize="52"
              fontWeight="800"
              fontFamily="Syne, sans-serif"
              fill="#C49A6C"
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : [0, 1] }}
              transition={{ duration: 0.8 }}
            >
              D.P
            </motion.text>
          </svg>

          {/* Boot lines */}
          <div style={{ width: 320, marginBottom: 24 }}>
            {bootLines.slice(0, Math.ceil((progress / 100) * bootLines.length)).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 11, color: i === bootLines.length - 1 ? '#4A7FA5' : '#4A4840', marginBottom: 4, letterSpacing: '0.1em' }}
              >
                &gt; {line}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ width: 320, height: 2, background: '#1E2530', borderRadius: 1 }}>
            <motion.div
              style={{ height: '100%', background: '#4A7FA5', borderRadius: 1, width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: '#4A4840', letterSpacing: '0.2em' }}>
            {Math.min(Math.round(progress), 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
