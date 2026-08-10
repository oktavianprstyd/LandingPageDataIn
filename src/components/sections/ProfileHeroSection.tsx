// src/components/sections/ProfileHeroSection.tsx
import { ArrowLeft, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../common/SectionWrapper';

export default function ProfileHeroSection() {
  return (
    <SectionWrapper id="profil-hero" className="relative pt-36 pb-24 overflow-hidden bg-[#0b132b] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-blue-300" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6">
          <Building2 className="w-3.5 h-3.5 text-blue-300" />
          <span>Profil Perusahaan</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight mb-6">
          Tentang <span className="text-blue-300">DataIn</span>
        </h1>

        <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto font-normal">
          Mitra akademis terpercaya yang berkomitmen mendampingi mahasiswa dan peneliti dalam meraih hasil terbaik melalui bimbingan, asistensi tugas, dan olah data yang profesional.
        </p>
      </div>

      {/* Transition curve to white background */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </SectionWrapper>
  );
}
