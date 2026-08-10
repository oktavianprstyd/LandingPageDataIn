// src/components/sections/VisionMissionSection.tsx
import { Eye, Target, History } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';

export default function VisionMissionSection() {
  return (
    <SectionWrapper id="visi-misi" className="relative py-20 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Background / History */}
        <div className="light-card rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <History className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Latar Belakang &amp; Sejarah
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-base sm:text-lg mb-4">
            DataIn didirikan atas dasar pemahaman mendalam terhadap tantangan dan tekanan akademis yang dihadapi oleh mahasiswa maupun peneliti modern. Berawal dari sekelompok akademisi dan praktisi data yang ingin memberikan bantuan nyata, DataIn berkembang menjadi platform pendampingan pendidikan terpercaya.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Hingga saat ini, kami telah membantu ratusan mahasiswa menyelesaikan tugas, mengolah data penelitian, hingga menyelesaikan tugas akhir dengan mengedepankan kualitas, kerahasiaan, dan ketepatan waktu.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="light-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-3">Visi Kami</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                Menjadi platform pendampingan akademis terdepan di Indonesia yang dipercaya karena integritas, keakuratan data, dan dedikasi penuh terhadap keberhasilan studi setiap mahasiswa.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="light-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-3">Misi Kami</h3>
              <ul className="space-y-3.5 text-slate-700 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Menyediakan bimbingan &amp; asistensi pengerjaan tugas berkualitas tinggi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Mempermudah proses pengumpulan dan analisis data responden secara valid.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Menjaga kerahasiaan identitas dan privasi klien dengan standar keamanan ketat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
