// src/components/sections/CompanyProfileBriefSection.tsx
import { Award, ShieldCheck, Users, Clock, Sparkles, MessageCircle, BookOpen } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import { waUrl } from '../../data/contact';

export default function CompanyProfileBriefSection() {
  const handleWhatsAppClick = () => {
    window.open(waUrl('Halo Admin DataIn! Saya ingin konsultasi asistensi tugas / olah data.'), '_blank');
  };

  return (
    <SectionWrapper id="profil-singkat" className="py-24 bg-[#FFFFFF] text-[#1E3A5F] relative overflow-hidden border-b border-[#D8CFC4]">
      
      {/* Soft Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-80 h-80 bg-[#002D80]/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D8CFC4] text-[#002D80] text-xs font-bold uppercase tracking-wider mb-3 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#002D80] fill-[#002D80]" />
            <span>SEKILAS PROFIL DATAIN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A5F] font-heading leading-tight">
            Mitra Asistensi Akademik &amp; Olah Data #1 Indonesia
          </h2>
          <p className="text-[#4A709C] text-base sm:text-lg mt-3 font-medium">
            Mendampingi mahasiswa &amp; peneliti Indonesia sejak 2021 untuk lulus tepat waktu dengan hasil terbaik.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Brief Narrative & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#002D80]/10 text-[#002D80] text-xs font-extrabold font-heading">
              <BookOpen className="w-4 h-4" />
              <span>Tentang DataIn Indonesia</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] font-heading leading-snug">
              Solusi Terpercaya untuk Setiap Tantangan Perkuliahannya
            </h3>

            <p className="text-[#4A709C] text-base leading-relaxed font-normal">
              DataIn berdiri atas komitmen kuat untuk membantu mahasiswa Indonesia mengatasi berbagai hambatan perkuliahan — mulai dari kerumitan olah data SPSS/SmartPLS, tenggat waktu pengerjaan tugas yang padat, hingga pengumpulan responden riset.
            </p>

            <p className="text-[#4A709C] text-base leading-relaxed font-normal">
              Didukung oleh tim <strong className="text-[#002D80]">pakar lulusan S1, S2, &amp; S3</strong> dari kampus terkemuka, kami telah membantu lebih dari <strong className="text-[#002D80]">5.000+ mahasiswa</strong> menyelesaikan studi mereka secara profesional, tepat waktu, 100% bebas plagiasi, dan dijamin rahasia.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#002D80] hover:bg-[#002060] text-white text-sm font-extrabold shadow-lg shadow-[#002D80]/20 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Konsultasi Gratis via WA</span>
              </button>
            </div>
          </div>

          {/* RIGHT: 4 Key Metric Cards (Bento Box style) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Card 1 */}
            <div className="bg-[#FAF6F0] border border-[#D8CFC4] p-6 rounded-3xl hover:border-[#002D80] hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#002D80] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-[#1E3A5F] font-heading mb-1">
                100+ Tim Expert
              </h4>
              <p className="text-xs text-[#4A709C] font-normal leading-relaxed">
                Lulusan S1, S2, &amp; S3 terverifikasi dari kampus terkemuka se-Indonesia.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF6F0] border border-[#D8CFC4] p-6 rounded-3xl hover:border-[#002D80] hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#002D80] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-[#1E3A5F] font-heading mb-1">
                5.000+ Klien Puas
              </h4>
              <p className="text-xs text-[#4A709C] font-normal leading-relaxed">
                Ribuan mahasiswa dari PTN &amp; PTS meraih nilai akademis optimal.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF6F0] border border-[#D8CFC4] p-6 rounded-3xl hover:border-[#002D80] hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#002D80] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-[#1E3A5F] font-heading mb-1">
                Garansi Tepat Waktu
              </h4>
              <p className="text-xs text-[#4A709C] font-normal leading-relaxed">
                Pengerjaan sesuai tenggat waktu yang disepakati dengan revisi gratis.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FAF6F0] border border-[#D8CFC4] p-6 rounded-3xl hover:border-[#002D80] hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#002D80] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-[#1E3A5F] font-heading mb-1">
                100% Rahasia
              </h4>
              <p className="text-xs text-[#4A709C] font-normal leading-relaxed">
                Privasi identitas dan kerahasiaan file tugas terjamin aman terenkripsi.
              </p>
            </div>

          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
