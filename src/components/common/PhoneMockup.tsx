// src/components/common/PhoneMockup.tsx
import { useState, useEffect } from 'react';
import { Star, BookOpen, Users, MessageCircle, FileText, BarChart3, Palette, Sparkles } from 'lucide-react';
import type { ServiceItem } from '../../types';
import { waUrl } from '../../data/contact';

interface PhoneMockupProps {
  activeService?: ServiceItem;
  customImage?: string;
}

const ICON_MAP = {
  'joki-tugas': BookOpen,
  'tugas-sekolah-kuliah': BookOpen,
  'jasa-responden': Users,
  'isi-kuesioner-responden': Users,
  'konsultasi-akademik': MessageCircle,
  'pembuatan-laporan': FileText,
  'olah-data': BarChart3,
  'desain-canva': Palette,
};

export default function PhoneMockup({ activeService, customImage }: PhoneMockupProps) {
  const currentId = activeService?.id ?? 'joki-tugas';
  const IconComp = ICON_MAP[currentId as keyof typeof ICON_MAP] ?? BookOpen;
  const targetImage = customImage || activeService?.image || '/images/thinking_student.webp';

  const [currentImage, setCurrentImage] = useState(targetImage);
  const [isFading, setIsFading] = useState(false);

  // Smooth cross-fade transition when image source changes on scroll
  useEffect(() => {
    if (targetImage !== currentImage) {
      setIsFading(true);
      const timeout = setTimeout(() => {
        setCurrentImage(targetImage);
        setIsFading(false);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [targetImage, currentImage]);

  return (
    <div className="relative mx-auto w-[310px] sm:w-[360px] h-[620px] sm:h-[680px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 flex flex-col justify-between overflow-hidden group hover:scale-[1.01] transition-all duration-700 ease-out will-change-transform">
      {/* Outer Phone Edge Glow */}
      <div className="absolute inset-0 rounded-[44px] border-2 border-white/20 pointer-events-none z-30" />

      {/* Screen Frame */}
      <div className="w-full h-full bg-slate-900 rounded-[38px] overflow-hidden flex flex-col text-slate-900 relative selection:bg-blue-600 selection:text-white">
        
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-900/50" />
        </div>

        {/* Mobile Header Bar */}
        <div className="bg-slate-900 text-white pt-8 pb-3 px-4 flex items-center justify-between border-b border-slate-800 z-20">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              D
            </div>
            <span className="text-sm font-bold tracking-tight font-heading">
              datain.co.id
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase">Online</span>
          </div>
        </div>

        {/* Dynamic Mobile Screen Content Body */}
        <div className="flex-1 bg-slate-900 p-3.5 overflow-y-auto space-y-3 text-left text-slate-100 scrollbar-none transition-all duration-500">
          
          {/* Top 3D Illustration Display Container with Ultra-Smooth Fade */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-lg group/img bg-slate-950">
            <img
              src={currentImage}
              alt="Ilustrasi Layanan DataIn"
              className={`w-full h-44 sm:h-48 object-cover transition-all duration-500 ease-out ${
                isFading ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-600/90 text-white px-2.5 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1 font-heading transition-transform duration-300">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {activeService ? activeService.name : 'Mahasiswa Mikir'}
              </span>
            </div>
          </div>

          {/* Active Highlighted Service Screen Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-3.5 text-white shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full font-heading">
                Layanan Aktif
              </span>
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                <IconComp className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h4 className="text-sm font-extrabold font-heading leading-tight mb-1">
              {activeService ? activeService.name : 'Solusi Tugas & Olah Data'}
            </h4>
            <p className="text-[11px] text-blue-100 leading-snug mb-2.5">
              {activeService ? activeService.description : 'Bantu pengerjaan tugas kuliah & sekolah secara profesional.'}
            </p>

            <a
              href={waUrl(
                `Halo Admin DataIn! Saya tertarik dengan ${activeService?.name ?? 'layanan ini'}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block bg-white text-blue-900 hover:bg-blue-50 font-bold text-[11px] py-1.5 rounded-xl text-center shadow-md transition-colors"
            >
              Pesan Layanan Ini
            </a>
          </div>

          {/* Quick Features Breakdown inside Mobile Screen */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 space-y-1.5">
            <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-1 font-heading">
              Keunggulan Fitur:
            </p>
            {activeService?.features?.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* Mini Trust Footer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-amber-400 mb-0.5">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>4.9/5 (5.000+ Klien Puas)</span>
            </div>
            <p className="text-[9px] text-slate-400">100% Kerahasiaan Identitas Terjamin</p>
          </div>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="bg-slate-950 py-2 flex justify-center z-20">
          <div className="w-28 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
