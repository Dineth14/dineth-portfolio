'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { assetPath } from '@/lib/assetPath';

const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#research', label: 'RESEARCH' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#honors', label: 'HONORS' },
  { href: '#beyond', label: 'BEYOND' },
  { href: '#contact', label: 'CONTACT' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const el = document.documentElement;
      const progress = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'research', 'projects', 'honors', 'beyond', 'contact'];
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-[#4A7FA5] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0D1117]/90 backdrop-blur-md border-b border-[#1E2530]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="#hero" className="relative group font-[Syne,sans-serif] font-bold text-xl text-[#C49A6C]">
            D.P
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C49A6C] group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const section = link.href.replace('#', '');
              const isActive = activeSection === section;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-mono text-xs tracking-[0.2em] transition-colors duration-200 ${
                    isActive ? 'text-[#4A7FA5]' : 'text-[#8B8578] hover:text-[#E2DDD4]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#4A7FA5]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] text-[#8B8578] tracking-widest">OPEN TO COLLABORATE</span>
            </div>
            <a
              href={assetPath('/cv.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest border border-[#4A7FA5] text-[#4A7FA5] px-4 py-1.5 hover:bg-[#4A7FA5] hover:text-white transition-all duration-200"
            >
              RESUME
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#E2DDD4] p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-px bg-current mb-1.5 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-px bg-current mb-1.5 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-px bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#07090F]/98 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-lg tracking-[0.3em] text-[#E2DDD4] hover:text-[#4A7FA5] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a href={assetPath('/cv.pdf')} target="_blank" rel="noopener noreferrer" className="mt-4 border border-[#4A7FA5] text-[#4A7FA5] font-mono text-xs tracking-widest px-6 py-2">
              RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
