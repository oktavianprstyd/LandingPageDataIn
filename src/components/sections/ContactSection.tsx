// src/components/sections/ContactSection.tsx
import { Mail, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import ContactForm from './ContactForm';

const WHATSAPP_NUMBER = '6281234567890'; // +62 812-3456-7890
const WHATSAPP_DISPLAY = '+62 812-3456-7890';
const EMAIL_ADDRESS = 'datain@email.com';

export default function ContactSection() {
  return (
    <SectionWrapper id="kontak" className="py-24 bg-slate-50/80 text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 inline-block mb-4">
            Hubungi Tim DataIn
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading mb-4">
            Hubungi Kami
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Konsultasikan kebutuhan tugas kuliah, pencarian responden kuesioner, atau olah data Anda secara langsung dengan tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="light-card rounded-3xl p-7 flex items-center gap-5 group"
              aria-label={`Hubungi via WhatsApp: ${WHATSAPP_DISPLAY}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
                  WhatsApp Direct Response
                </p>
                <p className="text-xl font-bold text-emerald-600 font-heading">
                  {WHATSAPP_DISPLAY}
                </p>
              </div>
            </a>

            {/* Email Card */}
            <div className="light-card rounded-3xl p-7 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
                  Email Dukungan
                </p>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors font-heading"
                >
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3 text-slate-900 font-bold text-lg font-heading">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Jam Operasional Layanan</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Senin – Sabtu: 08.00 – 22.00 WIB
                <br />
                Minggu &amp; Libur Nasional: 09.00 – 18.00 WIB
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-800 bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl font-medium">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-blue-600" />
                <span>Respon pesan rata-rata &lt; 15 menit pada jam kerja</span>
              </div>
            </div>
          </div>

          {/* Contact Form Wrapper */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 font-heading mb-6">
              Kirim Pesan Konsultasi
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
