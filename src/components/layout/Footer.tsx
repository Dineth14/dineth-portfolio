import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1E2530] bg-[#0D1117]">
      {/* Scan line */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4A7FA5]/40 to-transparent animate-[scanLine_4s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="font-mono text-[10px] text-[#4A4840] tracking-widest text-center md:text-left">
          <span>© 2026 DINETH PERERA</span>
          <span className="mx-2 text-[#1E2530]">·</span>
          <span>BUILT WITH NEXT.JS & THREE.JS</span>
        </div>

        {/* Center socials */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Dineth14"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A4840] hover:text-[#4A7FA5] transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/dineth-perera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A4840] hover:text-[#4A7FA5] transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:dp18perera@gmail.com"
            className="text-[#4A4840] hover:text-[#4A7FA5] transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Right */}
        <div className="font-mono text-[10px] text-[#C49A6C]/60 tracking-widest">
          SIGNAL FROM THE DEEP // 2026
        </div>
      </div>
    </footer>
  );
}
