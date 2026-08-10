// src/components/sections/ServiceSection.tsx
import { BookOpen, Users, MessageCircle, FileText, BarChart3, Check, ArrowRight, Sparkles } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import type { ServiceItem } from '../../types';
import { WA_URL } from '../../data/socialMedia';

interface ServiceSectionProps {
  services: ServiceItem[];
}

const ICON_MAP = {
  'joki-tugas': BookOpen,
  'jasa-responden': Users,
  'konsultasi-akademik': MessageCircle,
  'pembuatan-laporan': FileText,
  'olah-data': BarChart3,
};

export default function ServiceSection({ services }: ServiceSectionProps) {
  const topServices = services.slice(0, 3);
  const bottomServices = services.slice(3, 5);

  const renderCard = (item: ServiceItem, idx: number) => {
    const IconComp = ICON_MAP[item.id as keyof typeof ICON_MAP] ?? BookOpen;

    return (
      <div
        key={item.id}
        className="bg-[#FFFFFF] border border-[#D8CFC4] hover:border-[#002D80] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
      >
        <div>
          {/* Top Centered PNG Illustration Image Container */}
          <div className="relative rounded-2xl overflow-hidden mb-6 bg-[#FAF6F0] p-2.5 sm:p-3 border border-[#D8CFC4]/60 h-44 sm:h-56 flex items-center justify-center">
            <img
              src={item.image || '/images/thinking_student.png'}
              alt={item.name}
              className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#D8CFC4] text-[#002D80] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full font-heading shadow-sm flex items-center gap-1.5">
              <IconComp className="w-3.5 h-3.5 text-[#002D80]" />
              <span>Layanan #{idx + 1}</span>
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E3A5F] font-heading mb-3 leading-snug">
            {item.name}
          </h3>

          {/* Service Description */}
          <p className="text-[#4A709C] text-sm leading-relaxed mb-6 font-normal">
            {item.description}
          </p>

          {/* Features List */}
          <div className="space-y-2.5 mb-6 sm:mb-8 bg-[#FAF6F0]/80 border border-[#D8CFC4]/80 p-3.5 sm:p-4 rounded-2xl">
            {item.features?.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#002D80] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-[#1E3A5F]">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct WhatsApp Action Button */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#002D80] hover:bg-[#002060] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-xl transition-all group/btn"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#002D80]" />
          <span>Pesan Layanan via WA</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    );
  };

  return (
    <SectionWrapper id="layanan" className="py-16 sm:py-24 bg-[#FAF6F0] text-[#1E3A5F] relative overflow-hidden border-b border-[#D8CFC4]">
      
      {/* Background Ambient Blur Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-20 w-96 h-96 bg-[#4A709C]/10 blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F4F0EA] border border-[#D8CFC4] text-[#002D80] text-xs font-bold uppercase tracking-wider mb-3.5 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#002D80] fill-[#002D80]" />
            <span>PILIHAN JASAKU UNTUK KAMPUSMU</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A5F] font-heading leading-tight">
            Kenapa Kamu Perlu Layanan DataIn?
          </h2>
          <p className="text-[#4A709C] text-sm sm:text-lg mt-3 font-medium px-2">
            5 Layanan akademik profesional dengan garansi tepat waktu, 100% bebas plagiasi, dan tim lulusan kampus ternama S1–S3.
          </p>
        </div>

        {/* Row 1: Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {topServices.map((item, idx) => renderCard(item, idx))}
        </div>

        {/* Row 2: Bottom 2 Cards (Balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {bottomServices.map((item, idx) => renderCard(item, idx + 3))}
        </div>

      </div>
    </SectionWrapper>
  );
}
