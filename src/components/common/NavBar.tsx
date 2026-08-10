// src/components/common/NavBar.tsx
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useActiveSection';
import { WA_URL } from '../../data/socialMedia';

interface NavLink {
  label: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', sectionId: 'beranda' },
  { label: 'Layanan', sectionId: 'layanan' },
  { label: 'Keunggulan', sectionId: 'keunggulan' },
  { label: 'Testimoni', sectionId: 'testimoni' },
  { label: 'FAQ', sectionId: 'faq' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.sectionId);

function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (sectionId: string) => {
      if (!isHomePage) {
        window.location.href = `/#${sectionId}`;
        return;
      }
      scrollToSection(sectionId);
      setMenuOpen(false);
    },
    [isHomePage],
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-2 sm:pt-4 px-2 sm:px-6 lg:px-8"
      role="banner"
    >
      {/* Navy Blue #002D80 Floating Pill Header Container */}
      <div
        className={`max-w-7xl mx-auto rounded-full bg-[#002D80] border border-white/20 shadow-2xl shadow-[#002D80]/40 px-3.5 sm:px-7 py-2 sm:py-2.5 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl bg-[#002D80]/95 border-white/30' : 'bg-[#002D80]'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* LEFT: Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none shrink-0"
            aria-label="DataIn — kembali ke beranda"
          >
            <div className="h-9 sm:h-12 flex items-center justify-center py-1">
              <img
                src="/images/logo.webp"
                alt="Logo DataIn"
                className="h-full max-h-9 sm:max-h-12 object-contain brightness-0 invert group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/logo.png';
                }}
              />
              <span className="text-lg sm:text-2xl font-extrabold font-heading tracking-tight text-white ml-1.5">
                Data<span className="text-blue-200">In</span>
              </span>
            </div>
          </Link>

          {/* CENTER: Perfectly Centered Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex flex-1 items-center justify-center gap-1 sm:gap-2 px-4"
            aria-label="Navigasi utama"
          >
            {NAV_LINKS.map(({ label, sectionId }) => {
              const isActive = isHomePage && activeSection === sectionId;
              return (
                <button
                  key={sectionId}
                  type="button"
                  onClick={() => handleNavClick(sectionId)}
                  className={[
                    'px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200',
                    isActive
                      ? 'bg-white/20 text-white font-bold shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10',
                  ].join(' ')}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Rich Dark Emerald Green WhatsApp Action Button #128C7E */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#128C7E] hover:bg-[#075E54] text-white shadow-md hover:scale-105 transition-all"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-[#128C7E]" />
              <span>Konsultasi WA</span>
            </a>

            {/* Status Pill Badge: "100+ pengguna" */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 text-white border border-white/25 text-[11px] font-extrabold uppercase tracking-wider font-heading shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100+ pengguna</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out mt-2 max-w-7xl mx-auto',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav
          className="px-4 py-4 flex flex-col gap-2 bg-[#002D80] border border-white/20 rounded-3xl shadow-2xl text-white"
          aria-label="Navigasi mobile"
        >
          {NAV_LINKS.map(({ label, sectionId }) => {
            const isActive = isHomePage && activeSection === sectionId;
            return (
              <button
                key={sectionId}
                type="button"
                onClick={() => handleNavClick(sectionId)}
                tabIndex={menuOpen ? 0 : -1}
                className={[
                  'w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors',
                  isActive
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/80 hover:bg-white/10',
                ].join(' ')}
              >
                {label}
              </button>
            );
          })}

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-extrabold shadow-md"
          >
            <Phone className="w-4 h-4 fill-white text-[#128C7E]" />
            <span>Konsultasi WA</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
