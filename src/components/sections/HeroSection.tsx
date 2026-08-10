// src/components/sections/HeroSection.tsx
import { Sparkles, ArrowRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import { WA_URL } from '../../data/socialMedia';

export default function HeroSection() {
  return (
    <div className="bg-[#FAF6F0] pt-20 sm:pt-28 pb-10 sm:pb-16 overflow-hidden text-center relative border-b border-[#D8CFC4]">
      
      <SectionWrapper id="beranda" className="relative z-10 pt-2 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          {/* Centered Title — Mobile Optimized Fluid Typography */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-heading tracking-tight max-w-4xl mx-auto leading-[1.18] mb-5 sm:mb-6">
            <span className="font-normal italic font-serif text-[#002D80]">DataIn</span>{' '}
            <span className="font-medium text-black">solusi akademismu</span>{' '}
            <br className="hidden sm:inline" />
            <span className="font-medium text-black">Raih</span>{' '}
            <span className="font-normal italic font-serif text-[#002D80]">Prestasi Kampusmu</span>
          </h1>

          {/* Centered Subtitle Paragraph */}
          <p className="text-sm sm:text-xl text-[#4A709C] max-w-3xl mx-auto leading-relaxed font-medium mb-6 sm:mb-8 px-2">
            Bantu pengerjaan langsung dari tim expert untuk kuasai <strong className="text-[#002D80]">Tugas Kuliah</strong>, <strong className="text-[#002D80]">Responden Survei</strong>, <strong className="text-[#002D80]">Bimbingan Skripsi</strong>, dan <strong className="text-[#002D80]">Olah Data SPSS/SmartPLS</strong>. Lulus tepat waktu dengan hasil terpercaya &amp; bebas plagiasi!
          </p>

          {/* Centered Action Button — Directly Linked to WA_URL */}
          <div className="flex justify-center mb-8 sm:mb-10 w-full sm:w-auto">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#002D80] hover:bg-[#002060] active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#002D80]/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 fill-amber-300" />
              <span>Konsultasi Sekarang</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
            </a>
          </div>

          {/* Centered Illustration Artwork — Optimized WebP */}
          <div className="relative max-w-3xl w-full mx-auto pt-1 group flex items-center justify-center">
            <img
              src="/images/thinking_student.webp"
              alt="Ilustrasi DataIn Asistensi Akademik"
              className="relative z-10 w-full max-h-[360px] sm:max-h-[520px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
}
