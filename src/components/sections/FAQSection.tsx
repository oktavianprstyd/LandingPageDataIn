// src/components/sections/FAQSection.tsx
import { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import { WA_URL } from '../../data/socialMedia';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara memesan layanan asistensi tugas atau olah data di DataIn?',
    answer:
      'Sangat mudah! Anda cukup mengklik tombol "Konsultasi WA" atau menghubungi Admin WhatsApp kami. Tim kami akan meminta rincian instruksi tugas/skripsi Anda dan memberikan estimasi waktu & harga penawaran secara gratis tanpa komitmen.',
  },
  {
    id: 'faq-2',
    question: 'Apakah kerahasiaan identitas dan data saya dijamin 100% aman?',
    answer:
      'Ya, 100% dijamin aman dan terenkripsi. Data pribadi, file tugas, dan riwayat konsultasi Anda tidak akan pernah dipublikasikan atau disebarluaskan ke pihak manapun demi menjaga privasi Anda.',
  },
  {
    id: 'faq-3',
    question: 'Bagaimana jika hasil pengerjaan memerlukan revisi?',
    answer:
      'DataIn memberikan Garansi Revisi Gratis sampai tugas atau karya ilmiah Anda benar-benar sesuai dengan instruksi awal dan disetujui dosen/guru pengampu.',
  },
  {
    id: 'faq-4',
    question: 'Siapa saja yang akan mengerjakan tugas atau mengolah data penelitian saya?',
    answer:
      'Seluruh tugas dikerjakan oleh tim expert terverifikasi lulusan S1, S2, & S3 dari kampus ternama se-Indonesia yang disesuaikan secara khusus dengan bidang studi atau keahlian akademis masing-masing.',
  },
  {
    id: 'faq-5',
    question: 'Berapa lama estimasi waktu pengerjaan tugas atau olah data statistik?',
    answer:
      'Waktu pengerjaan sangat fleksibel dan dapat disesuaikan dengan deadline Anda. Kami menyediakan opsi layanan kilat (express < 24 jam) hingga opsi layanan reguler.',
  },
  {
    id: 'faq-6',
    question: 'Software statistik apa saja yang didukung untuk layanan olah data?',
    answer:
      'Kami mendukung pengolahan data menggunakan SPSS, SmartPLS, AMOS, EViews, R Studio, dan Excel Statistik lengkap beserta penjelasan interpretasi hasil Bab 4.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionWrapper id="faq" className="py-16 sm:py-24 bg-[#FAF6F0] text-[#1E3A5F] border-t border-b border-[#D8CFC4] relative overflow-hidden">
      
      {/* Background Ambient Blur */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#002D80]/5 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F4F0EA] border border-[#D8CFC4] text-[#002D80] text-xs font-bold uppercase tracking-wider mb-3 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#002D80] fill-[#002D80]" />
            <span>PERTANYAAN POPULER (FAQ)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A5F] font-heading leading-tight">
            Sering Ditanyakan seputar DataIn
          </h2>
          <p className="text-[#4A709C] text-sm sm:text-lg mt-3 font-medium px-2">
            Temukan jawaban cepat atas pertanyaan seputar pemesanan, kerahasiaan identitas, hingga garansi revisi di DataIn.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 sm:space-y-4 mb-12 sm:mb-16">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FFFFFF] border border-[#D8CFC4] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:border-[#002D80]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 font-heading font-extrabold text-sm sm:text-lg text-[#1E3A5F] hover:text-[#002D80] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5 sm:gap-3">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#002D80] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#4A709C] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#002D80]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-xs sm:text-base text-[#4A709C] font-normal leading-relaxed border-t border-[#F4F0EA] mt-1 pt-3 sm:pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Banner — Mobile Responsive */}
        <div className="bg-[#002D80] text-white rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 relative overflow-hidden">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-0.5 sm:mt-0">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-extrabold font-heading text-white mb-1">
                Masih Punya Pertanyaan Lain?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                Tim admin DataIn siap merespon pertanyaan Anda dalam waktu kurang dari 15 menit.
              </p>
            </div>
          </div>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all shrink-0"
          >
            <span>Tanya via WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
}
