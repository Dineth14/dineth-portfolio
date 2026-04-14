'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import GlowBorder from '@/components/ui/GlowBorder';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { GitFork, Link, Mail, MapPin, Download } from 'lucide-react';
import { assetPath } from '@/lib/assetPath';

const connectLinks = [
  { icon: <Mail size={16} />, label: 'EMAIL', value: 'dp18perera@gmail.com', href: 'mailto:dp18perera@gmail.com' },
  { icon: <GitFork size={16} />, label: 'GITHUB', value: 'github.com/Dineth14', href: 'https://github.com/Dineth14' },
  { icon: <Link size={16} />, label: 'LINKEDIN', value: 'Dineth Perera', href: 'https://linkedin.com/in/dineth-perera' },
  { icon: <MapPin size={16} />, label: 'LOCATION', value: 'Sri Lanka', href: null },
];

export default function ContactSection() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      window.location.href = `mailto:dp18perera@gmail.com?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(`From: ${fields.name} <${fields.email}>\n\n${fields.message}`)}`;
      setStatus('sent');
    }, 1200);
  };

  const inputClass =
    'w-full bg-transparent border-b border-[#1E2530] text-[#E2DDD4] font-mono text-sm py-2 px-0 outline-none focus:border-[#4A7FA5] transition-colors duration-200 placeholder-[#4A4840]';

  return (
    <section id="contact" className="relative py-32 bg-[#07090F]">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader number="07" title="CONTACT" subtitle="Open channel" align="center" />
        </ScrollReveal>

        {/* Terminal form */}
        <ScrollReveal delay={0.1}>
          <GlowBorder className="mb-10 overflow-hidden" color="sapphire">
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-6 py-3 border-b border-[#1E2530] bg-[#07090F]/60">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-xs text-[#4A4840] flex-1">SIGNAL TERMINAL v1.0 // dp18perera@gmail.com</span>
            </div>

            <div className="p-6 md:p-8 font-mono text-sm">
              <div className="text-[#4A7FA5] mb-1">$ connect --to=dineth.perera</div>
              <div className="text-[#6B8F71] mb-6">&gt; Connection established. Enter your message.</div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#4A4840] text-xs tracking-widest block mb-1">NAME:</label>
                    <input
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      required
                      placeholder="_________________________"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[#4A4840] text-xs tracking-widest block mb-1">EMAIL:</label>
                    <input
                      name="email"
                      type="email"
                      value={fields.email}
                      onChange={handleChange}
                      required
                      placeholder="_________________________"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#4A4840] text-xs tracking-widest block mb-1">SUBJECT:</label>
                  <input
                    name="subject"
                    value={fields.subject}
                    onChange={handleChange}
                    required
                    placeholder="_________________________"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[#4A4840] text-xs tracking-widest block mb-1">MESSAGE:</label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="___________________________________________"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="flex items-center gap-3 font-mono text-xs tracking-widest bg-[#4A7FA5] text-white px-8 py-3 hover:bg-[#7CB4D4] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : status === 'sent' ? (
                    '✓ MESSAGE TRANSMITTED'
                  ) : (
                    'TRANSMIT MESSAGE →'
                  )}
                </button>
              </form>
            </div>
          </GlowBorder>
        </ScrollReveal>

        {/* Connect Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {connectLinks.map((link, i) => (
            <ScrollReveal key={link.label} delay={i * 0.07}>
              <div className="border border-[#1E2530] bg-[#0D1117] p-4 hover:border-[#4A7FA5]/40 transition-colors group">
                <div className="text-[#4A7FA5] mb-2 group-hover:text-[#7CB4D4] transition-colors">{link.icon}</div>
                <div className="font-mono text-[9px] text-[#4A4840] tracking-widest mb-1">{link.label}</div>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#8B8578] hover:text-[#4A7FA5] transition-colors break-all"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-[#8B8578]">{link.value}</span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Download CV */}
        <ScrollReveal>
          <div className="text-center mt-10">
            <a
              href={assetPath('/cv.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest border border-[#C49A6C] text-[#C49A6C] px-6 py-3 hover:bg-[#C49A6C]/10 transition-all duration-200"
            >
              <Download size={12} /> DOWNLOAD CV
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
