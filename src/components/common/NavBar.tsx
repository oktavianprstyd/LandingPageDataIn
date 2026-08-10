// src/components/common/NavBar.tsx
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useActiveSection';

interface NavLink {
  label: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', sectionId: 'beranda' },
  { label: 'Layanan', sectionId: 'layanan' },
  { label: 'Keunggulan', sectionId: 'keunggulan' },
  { label: 'Testimoni', sectionId: 'testimoni' },
  { label: 'Kontak', sectionId: 'kontak' },
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
      if (window.scrollY > 80) {
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md'
          : 'py-5 bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo — SaaSina Style */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="DataIn — kembali ke beranda"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-300 ${
              isScrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-900'
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <span className={`text-2xl font-extrabold font-heading tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}>
              Data<span className={isScrolled ? 'text-blue-600' : 'text-blue-300'}>In</span>
            </span>
          </Link>

          {/* Desktop Nav Menu — Floating SaaSina Pill Style */}
          <nav
            className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
              isScrolled
                ? 'bg-white shadow-md border border-slate-200/80 p-1.5 rounded-full'
                : 'bg-white/10 backdrop-blur-md border border-white/15 p-1.5 rounded-full'
            }`}
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
                    'px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                    isScrolled
                      ? isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                      : isActive
                        ? 'bg-white text-blue-950 font-bold shadow-sm'
                        : 'text-blue-100 hover:text-white hover:bg-white/10',
                  ].join(' ')}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </button>
              );
            })}

            <Link
              to="/profil"
              className={[
                'px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                isScrolled
                  ? location.pathname === '/profil'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  : location.pathname === '/profil'
                    ? 'bg-white text-blue-950 font-bold shadow-sm'
                    : 'text-blue-100 hover:text-white hover:bg-white/10',
              ].join(' ')}
            >
              Profil
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('kontak')}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                isScrolled
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                  : 'bg-white hover:bg-blue-50 text-blue-950 shadow-black/20'
              }`}
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                isScrolled ? 'text-slate-800 bg-slate-100' : 'text-white bg-white/10'
              }`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav
          className="px-4 pb-6 pt-3 flex flex-col gap-2 bg-white border-b border-slate-200 shadow-xl text-slate-800"
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
                  'w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100',
                ].join(' ')}
              >
                {label}
              </button>
            );
          })}

          <Link
            to="/profil"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className="w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl text-slate-700 hover:bg-slate-100"
          >
            Profil Perusahaan
          </Link>

          <button
            type="button"
            onClick={() => handleNavClick('kontak')}
            tabIndex={menuOpen ? 0 : -1}
            className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            <span>Hubungi Kami</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  );
}
