// src/components/sections/HeroSection.tsx
import { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Instagram, QrCode } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PhoneMockup from '../common/PhoneMockup';

function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleConsultClick = () => {
    scrollToSection('kontak');
  };

  // Smooth scroll interpolation parameters
  const progress = Math.min(Math.max(scrollY / 600, 0), 1);
  const scaleValue = 1 - progress * 0.05;
  const borderRadiusValue = progress * 56;

  // Ultra-smooth downward translation for the HP mockup as user scrolls
  const phoneTranslateY = Math.min(scrollY * 0.3, 160);

  return (
    <div className="bg-white pt-4 pb-0 overflow-hidden">
      <SectionWrapper
        id="beranda"
        className="relative pt-28 sm:pt-36 pb-16 overflow-hidden bg-gradient-to-b from-[#080066] via-[#0c058a] to-[#1208b0] text-white shadow-2xl transition-all duration-300 ease-out"
        style={{
          transform: `scale(${scaleValue})`,
          borderRadius: `0px 0px ${borderRadiusValue}px ${borderRadiusValue}px`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* 2-Column Hero Grid: Left Text & Info, Right Thinking Student Illustration inside HP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            
            {/* LEFT COLUMN: Text & Info */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* SaaSina Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-[1.1]">
                Solusi Tugas &amp; Olah Data DataIn.
              </h1>

              {/* SaaSina Subtitle */}
              <p className="text-base sm:text-xl text-blue-100/90 leading-relaxed font-normal max-w-2xl">
                Solusi Digital semua masalah akademismu, mulai dari joki tugas kuliah, jasa responden kuesioner, bimbingan olah data statistik, dll.
              </p>

              {/* Social Pills Row */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-pink-500/20 hover:scale-105 transition-transform"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Get Ready With DataIn</span>
                  <span className="text-[10px] opacity-80 font-normal">Official</span>
                </a>

                <button
                  type="button"
                  onClick={handleConsultClick}
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-600/20 hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi Langsung</span>
                  <span className="text-[10px] opacity-80 font-normal">Respon &lt; 15m</span>
                </button>
              </div>

              {/* Floating QR Code Card Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConsultClick}
                  className="bg-white text-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl hover:scale-105 transition-transform flex items-center gap-4 text-left border border-white/40 group max-w-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-emerald-600 font-heading">
                      Solve Your
                    </span>
                    <span className="text-base font-extrabold text-slate-900 font-heading -mt-1">
                      Problem Now!
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 ml-auto">
                    <QrCode className="w-7 h-7" />
                  </div>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Thinking Student Illustration inside Phone Mockup (Ultra-Smooth Glide) */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* Yellow/Gold Glow Aura */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[420px] h-[300px] bg-amber-300/30 blur-[90px] rounded-full pointer-events-none z-0"
              />

              {/* Twinkling Star Sparkles */}
              <div className="absolute top-10 -left-6 sm:-left-10 text-amber-200 animate-pulse pointer-events-none z-20">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 fill-amber-200/40" />
              </div>
              <div className="absolute top-36 -right-6 sm:-right-10 text-white animate-pulse delay-300 pointer-events-none z-20">
                <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 fill-white/40" />
              </div>
              <div className="absolute bottom-24 -left-10 sm:-left-14 text-amber-100 animate-pulse delay-700 pointer-events-none z-20">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 fill-amber-100/30" />
              </div>

              {/* Smoothly Translating HP Mockup Container */}
              <div
                className="relative z-10 will-change-transform transition-transform duration-100 ease-out"
                style={{
                  transform: `translateY(${phoneTranslateY}px)`,
                }}
              >
                <PhoneMockup customImage="/images/thinking_student.jpg" />
              </div>

            </div>

          </div>

        </div>
      </SectionWrapper>
    </div>
  );
}
