// src/components/sections/AdvantageSection.tsx
import { Award, Clock, DollarSign, Lock } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import type { AdvantageItem } from '../../types';

interface AdvantageSectionProps {
  advantages: AdvantageItem[];
}

const getAdvantageIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award':
      return Award;
    case 'Clock':
      return Clock;
    case 'DollarSign':
      return DollarSign;
    case 'Lock':
      return Lock;
    default:
      return Award;
  }
};

export default function AdvantageSection({ advantages }: AdvantageSectionProps) {
  return (
    <SectionWrapper id="keunggulan" className="py-24 bg-slate-50/80 text-slate-900 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 inline-block mb-4">
            Komitmen DataIn
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading mb-4">
            Keunggulan Kami
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Keunggulan layanan yang membuat DataIn menjadi pilihan utama para mahasiswa dan peneliti.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv) => {
            const IconComp = getAdvantageIcon(adv.icon);
            return (
              <div
                key={adv.id}
                className="light-card rounded-3xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
