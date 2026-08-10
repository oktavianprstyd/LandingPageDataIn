// src/components/common/Footer.tsx
import { Instagram, Music, Phone, ExternalLink, type LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { socialMediaLinks } from '../../data/socialMedia';
import type { SocialMediaItem } from '../../types';

const ICON_MAP: Record<string, LucideIcon> = {
  Instagram,
  Music,
  Phone,
  ExternalLink,
};

function SocialIcon({ item }: { item: SocialMediaItem }) {
  if (!item.url) return null;
  const Icon = ICON_MAP[item.icon] ?? ExternalLink;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`DataIn di ${item.platform}`}
      className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
    >
      <Icon size={16} aria-hidden="true" />
    </a>
  );
}

const QUICK_LINKS = [
  { label: 'Beranda', sectionId: 'beranda' },
  { label: 'Layanan', sectionId: 'layanan' },
  { label: 'Keunggulan', sectionId: 'keunggulan' },
  { label: 'Testimoni', sectionId: 'testimoni' },
  { label: 'FAQ', sectionId: 'faq' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLinkClick = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#002D80] text-white border-t border-[#D8CFC4]/30 relative z-10" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Logo DataIn"
                  className="h-full object-contain brightness-0 invert group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-2xl font-extrabold font-heading text-white ml-2">
                  Data<span className="text-blue-200">In</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-blue-100/90 leading-relaxed max-w-sm font-normal">
              Platform asistensi tugas, pencarian responden kuesioner, dan bimbingan akademik terpercaya dengan standar integritas dan ketepatan waktu.
            </p>
            <div className="flex items-center gap-2">
              {socialMediaLinks.map((item) => (
                <SocialIcon key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-4 font-heading">
              Navigasi Halaman
            </p>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, sectionId }) => (
                <li key={sectionId}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(sectionId)}
                    className="text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Support */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-4 font-heading">
              Layanan &amp; Komitmen
            </p>
            <p className="text-sm text-blue-100/90 leading-relaxed mb-4 font-normal">
              Tim profesional DataIn melayani konsultasi dan estimasi waktu pengerjaan secara gratis 24/7.
            </p>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-white font-semibold">
              Konsultasi &amp; Estimasi Bebas Biaya via WhatsApp
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <p>&copy; {year} DataIn. Hak cipta dilindungi.</p>
          <p className="text-blue-100 font-medium">
            Platform Asistensi Akademik &amp; Olah Data Terpercaya
          </p>
        </div>
      </div>
    </footer>
  );
}
