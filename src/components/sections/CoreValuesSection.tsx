// src/components/sections/CoreValuesSection.tsx
import { ShieldCheck, Award, Clock, Lock, Lightbulb, HeartHandshake } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import type { CoreValue } from '../../types';

interface CoreValuesSectionProps {
  values: CoreValue[];
}

const getIconForValue = (id: string) => {
  switch (id) {
    case 'integritas':
      return ShieldCheck;
    case 'kualitas':
      return Award;
    case 'ketepatan-waktu':
      return Clock;
    case 'kerahasiaan':
      return Lock;
    case 'inovasi':
      return Lightbulb;
    default:
      return HeartHandshake;
  }
};

export default function CoreValuesSection({ values }: CoreValuesSectionProps) {
  return (
    <SectionWrapper id="nilai-inti" className="relative py-20 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 inline-block mb-4">
            Landasan Etika
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading mb-4">
            Nilai-Nilai Utama
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Prinsip dan standar moral yang melandasi setiap pekerjaan yang kami lakukan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val) => {
            const IconComp = getIconForValue(val.id);
            return (
              <div
                key={val.id}
                className="light-card rounded-3xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
                    {val.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
