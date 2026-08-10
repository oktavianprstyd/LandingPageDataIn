// src/components/common/WhatsAppFloatingWidget.tsx
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WA_URL } from '../../data/socialMedia';

export default function WhatsAppFloatingWidget() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Tooltip Popup Box */}
      {showTooltip && (
        <div className="mb-3 bg-white text-slate-900 border border-[#D8CFC4] shadow-2xl rounded-2xl p-4 max-w-[260px] sm:max-w-xs relative text-left animate-in fade-in slide-in-from-bottom-3 transition-all">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold text-[#002D80] font-heading">
              Punya pertanyaan?
            </span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded-lg transition-colors"
              aria-label="Tutup pesan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-snug mb-2">
            Silakan hubungi kami via WhatsApp untuk respon cepat &lt; 15 menit.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#128C7E] hover:underline"
          >
            <span>Chat Admin Sekarang</span>
            <span>→</span>
          </a>
        </div>
      )}

      {/* WhatsApp Floating Rich Emerald Button (#128C7E) */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi kami via WhatsApp"
        className="w-14 h-14 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer border-2 border-white"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#128C7E]" />
      </a>
    </div>
  );
}
