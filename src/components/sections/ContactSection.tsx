// src/components/sections/ContactSection.tsx
import { Mail, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import ContactForm from './ContactForm';

const WHATSAPP_NUMBER = '6281234567890'; // +62 812-3456-7890
const WHATSAPP_DISPLAY = '+62 812-3456-7890';
const EMAIL_ADDRESS = 'datain@email.com';

export default function ContactSection() {
  return (
    <SectionWrapper id="kontak" className="py-24 bg-[#F4F0EA] text-[#1E3A5F] border-t border-[#D8CFC4] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D8CFC4] text-[#1E3A5F] text-xs font-bold uppercase tracking-wider mb-3 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#4A709C] fill-[#4A709C]" />
            <span>KONSULTASI AKADEMIK DIRECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A5F] font-heading mb-3">
            Hubungi Tim DataIn
          </h2>
          <p className="text-[#4A709C] text-base sm:text-lg leading-relaxed font-medium">
            Konsultasikan kebutuhan tugas kuliah, pencarian responden kuesioner, atau olah data Anda secara langsung dengan tim expert kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Info (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* WhatsApp Direct Card */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFFFFF] border border-[#D8CFC4] hover:border-[#1E3A5F] rounded-3xl p-7 flex items-center gap-5 group shadow-sm hover:shadow-xl transition-all"
              aria-label={`Hubungi via WhatsApp: ${WHATSAPP_DISPLAY}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1E3A5F] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A709C] transition-all shadow-md">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1E3A5F] bg-[#FAF6F0] border border-[#D8CFC4] px-2.5 py-0.5 rounded-md font-heading">
                  Fast Response &lt; 15 Menit
                </span>
                <p className="text-xl font-extrabold text-[#1E3A5F] font-heading mt-1 group-hover:text-[#4A709C] transition-colors">
                  {WHATSAPP_DISPLAY}
                </p>
              </div>
            </a>

            {/* Email Card */}
            <div className="bg-[#FFFFFF] border border-[#D8CFC4] rounded-3xl p-7 flex items-center gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] border border-[#D8CFC4] flex items-center justify-center text-[#1E3A5F] flex-shrink-0 shadow-md">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#4A709C] mb-0.5 font-heading">
                  Email Official
                </p>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="text-xl font-extrabold text-[#1E3A5F] hover:text-[#4A709C] transition-colors font-heading"
                >
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="bg-[#FFFFFF] rounded-3xl p-7 border border-[#D8CFC4] shadow-md">
              <div className="flex items-center gap-3 mb-3 text-[#1E3A5F] font-extrabold text-lg font-heading">
                <Clock className="w-5 h-5 text-[#1E3A5F]" />
                <span>Jam Operasional Layanan</span>
              </div>
              <p className="text-[#4A709C] text-sm leading-relaxed mb-4 font-normal">
                Senin – Sabtu: 08.00 – 22.00 WIB
                <br />
                Minggu &amp; Libur Nasional: 09.00 – 18.00 WIB
              </p>
              <div className="flex items-center gap-2 text-xs text-[#1E3A5F] bg-[#FAF6F0] border border-[#D8CFC4] px-3.5 py-2.5 rounded-2xl font-extrabold font-heading">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>Respon cepat via WhatsApp 7 hari seminggu</span>
              </div>
            </div>
          </div>

          {/* Contact Form Wrapper (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl p-8 sm:p-10 border border-[#D8CFC4] shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] font-heading mb-2">
              Kirim Form Konsultasi
            </h3>
            <p className="text-[#4A709C] text-sm mb-6 font-medium">
              Isi formulir di bawah ini dan tim pakar akademik DataIn akan segera menghubungi Anda.
            </p>
            <ContactForm />
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
