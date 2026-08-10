// src/components/sections/ServiceSection.tsx
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Users, MessageCircle, FileText, BarChart3, Check, ArrowRight } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import PhoneMockup from '../common/PhoneMockup';
import type { ServiceItem } from '../../types';

interface ServiceSectionProps {
  services: ServiceItem[];
}

const ICON_MAP = {
  'joki-tugas': BookOpen,
  'jasa-responden': Users,
  'konsultasi-akademik': MessageCircle,
  'pembuatan-laporan': FileText,
  'olah-data': BarChart3,
};

export default function ServiceSection({ services }: ServiceSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to detect which service block is currently in view during scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0.15,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute('data-service-index');
          if (indexAttr !== null) {
            setActiveIndex(parseInt(indexAttr, 10));
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [services]);

  const activeService = services[activeIndex] ?? services[0];

  return (
    <SectionWrapper id="layanan" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Service Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 font-heading">
            PORTFOLIO LAYANAN UNGGULAN
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Layanan Kami
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Scroll ke bawah untuk melihat 5 bentuk ilustrasi 3D dari tiap jasa kami secara langsung di layar HP.
          </p>
        </div>

        {/* Dynamic Sticky Scroll Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* CENTER/RIGHT COLUMN: STICKY PHONE MOCKUP SHOWCASING THE 5 SERVICE ILLUSTRATIONS */}
          <div className="lg:col-span-5 lg:order-2 sticky top-32 z-20 flex justify-center py-6">
            <div className="relative w-full flex justify-center">
              {/* Yellow Glow Aura */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-amber-300/40 blur-[80px] rounded-full pointer-events-none z-0"
              />
              <div className="relative z-10 scale-90 sm:scale-95 transition-all duration-500">
                <PhoneMockup activeService={activeService} />
              </div>
            </div>
          </div>

          {/* 5 SCROLL SERVICE BLOCKS (Left Column) */}
          <div className="lg:col-span-7 lg:order-1 space-y-36 sm:space-y-48 py-8">
            {services.map((item, idx) => {
              const IconComp = ICON_MAP[item.id as keyof typeof ICON_MAP] ?? BookOpen;
              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  data-service-index={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`min-h-[460px] flex flex-col justify-center p-8 sm:p-10 rounded-3xl transition-all duration-500 border ${
                    isActive
                      ? 'bg-slate-50 border-blue-300 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200/80 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-heading">
                      Bentuk Ilustrasi #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mb-4">
                    {item.name}
                  </h3>

                  <p className="text-slate-600 text-base leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Feature Checklist for this specific Service */}
                  <div className="space-y-3 mb-8">
                    {item.features?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('kontak');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/25 transition-all"
                    >
                      <span>Pesan Layanan {item.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
