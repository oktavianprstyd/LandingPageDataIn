// src/components/sections/AdvantageSection.tsx
import { Award, Clock, DollarSign, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import type { AdvantageItem } from '../../types';

interface AdvantageSectionProps {
  advantages: AdvantageItem[];
}

const getAdvantageIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award':
      return Award;
    case 'Clock':
      return Clock;
    case 'DollarSign':
      return DollarSign;
    case 'Lock':
      return Lock;
    default:
      return Award;
  }
};

export default function AdvantageSection({ advantages }: AdvantageSectionProps) {
  return (
    <SectionWrapper id="keunggulan" className="py-24 bg-[#F4F0EA] text-[#1E3A5F] border-b border-[#D8CFC4] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D8CFC4] text-[#002D80] text-xs font-bold uppercase tracking-wider mb-3 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#002D80] fill-[#002D80]" />
            <span>MENGAPA HARUS DATAIN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A5F] font-heading mb-3">
            Keunggulan Program &amp; Jaminan
          </h2>
          <p className="text-[#4A709C] text-base sm:text-lg leading-relaxed font-medium">
            4 Komitmen utama yang membuat DataIn dipercaya oleh lebih dari 5.000+ mahasiswa dari kampus ternama se-Indonesia.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, idx) => {
            const IconComp = getAdvantageIcon(adv.icon);
            return (
              <div
                key={adv.id}
                className="bg-[#FFFFFF] border border-[#D8CFC4] hover:border-[#002D80] rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Decorative Number Badge */}
                <div className="absolute top-4 right-4 text-3xl font-black text-[#F4F0EA] font-heading group-hover:text-[#D8CFC4] transition-colors">
                  0{idx + 1}
                </div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#002D80] text-[#FFFFFF] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1E3A5F] font-heading mb-3 leading-snug">
                    {adv.title}
                  </h3>

                  <p className="text-[#4A709C] text-sm leading-relaxed mb-6 font-normal">
                    {adv.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#002D80] font-heading pt-4 border-t border-[#F4F0EA]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Garansi Resmi DataIn</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Timeline / 4-Langkah Pemesanan Banner */}
        <div className="mt-16 bg-[#002D80] rounded-3xl p-8 sm:p-12 text-white border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20 font-heading">
              ALUR PROSES SIMPEL
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading mt-3">
              Cara Mudah Pesan Layanan DataIn
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl text-left">
              <span className="w-8 h-8 rounded-full bg-white text-[#002D80] flex items-center justify-center font-extrabold text-sm mb-3">1</span>
              <h4 className="text-base font-extrabold font-heading mb-1 text-white">Konsultasi Gratis</h4>
              <p className="text-xs text-blue-100 font-normal">Kirim judul &amp; instruksi tugas via WhatsApp Admin.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl text-left">
              <span className="w-8 h-8 rounded-full bg-white text-[#002D80] flex items-center justify-center font-extrabold text-sm mb-3">2</span>
              <h4 className="text-base font-extrabold font-heading mb-1 text-white">Deal &amp; Pengerjaan</h4>
              <p className="text-xs text-blue-100 font-normal">Tim expert langsung memproses tugas sesuai deadline.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl text-left">
              <span className="w-8 h-8 rounded-full bg-white text-[#002D80] flex items-center justify-center font-extrabold text-sm mb-3">3</span>
              <h4 className="text-base font-extrabold font-heading mb-1 text-white">Terima Hasil</h4>
              <p className="text-xs text-blue-100 font-normal">Hasil lengkap beserta file mentah &amp; laporan dikirimkan.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl text-left">
              <span className="w-8 h-8 rounded-full bg-amber-400 text-[#002D80] flex items-center justify-center font-extrabold text-sm mb-3">4</span>
              <h4 className="text-base font-extrabold font-heading mb-1 text-white">Garansi Revisi</h4>
              <p className="text-xs text-blue-100 font-normal">Revisi gratis sampai tugas disetujui dosen/guru.</p>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
