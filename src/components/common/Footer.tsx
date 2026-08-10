// src/components/common/Footer.tsx
import { Instagram, Music, Phone, ExternalLink, BookOpen, type LucideIcon } from 'lucide-react';
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
      className="p-2.5 rounded-full bg-white/10 text-white hover:bg-blue-600 transition-colors"
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
  { label: 'Kontak', sectionId: 'kontak' },
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
    <footer className="bg-[#0b132b] text-white border-t border-white/10 relative z-10" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold font-heading text-lg shadow-md shadow-blue-500/30">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold font-heading text-white">
                Data<span className="text-blue-400">In</span>
              </span>
            </Link>
            <p className="text-sm text-blue-200 leading-relaxed max-w-sm">
              Platform asistensi tugas, olah data kuesioner responden, dan bimbingan akademik terpercaya dengan standar integritas dan ketepatan waktu.
            </p>
            <div className="flex items-center gap-2">
              {socialMediaLinks.map((item) => (
                <SocialIcon key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4 font-heading">
              Navigasi Halaman
            </p>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, sectionId }) => (
                <li key={sectionId}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(sectionId)}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/profil" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Profil Perusahaan
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Support */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4 font-heading">
              Layanan &amp; Komitmen
            </p>
            <p className="text-sm text-blue-200 leading-relaxed mb-4">
              Tim profesional DataIn melayani konsultasi dan estimasi waktu pengerjaan secara gratis.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-blue-100 font-medium">
              Konsultasi &amp; Estimasi Bebas Biaya via WhatsApp
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300">
          <p>&copy; {year} DataIn. Hak cipta dilindungi.</p>
          <p className="text-blue-200">
            Platform Asistensi Akademik &amp; Olah Data Terpercaya
          </p>
        </div>
      </div>
    </footer>
  );
}
