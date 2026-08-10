// src/components/sections/TestimonialSection.tsx
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import type { TestimonialItem } from '../../types';
import { getInitials } from '../../utils/validation';

interface TestimonialSectionProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  if (!current) return null;

  const hasPhoto = Boolean(current.photoUrl && !imgErrors[current.id]);

  return (
    <SectionWrapper id="testimoni" className="py-24 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 inline-block mb-4">
            Ulasan Kepuasan
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading mb-4">
            Kata Mereka yang Menggunakan DataIn
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 relative border border-slate-200 shadow-sm">
          <Quote className="w-12 h-12 text-slate-200 absolute top-8 right-8 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-100 border-2 border-blue-200 flex items-center justify-center flex-shrink-0">
              {hasPhoto ? (
                <img
                  src={current.photoUrl}
                  alt={`Foto ${current.customerName}`}
                  onError={() => setImgErrors((prev) => ({ ...prev, [current.id]: true }))}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                  {getInitials(current.customerName)}
                </div>
              )}
            </div>

            {/* Testimonial Text & Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* Rating Stars */}
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < current.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-slate-800 text-lg sm:text-xl font-normal leading-relaxed mb-6 font-sans italic">
                "{current.text}"
              </p>

              {/* Customer Name */}
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {current.customerName}
              </h3>
              <p className="text-xs text-blue-600 font-semibold tracking-wide uppercase">
                Klien DataIn Terverifikasi
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-8 bg-blue-600'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white text-slate-700 hover:text-blue-600 border border-slate-200 shadow-sm transition-colors"
                  aria-label="Testimonial sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white text-slate-700 hover:text-blue-600 border border-slate-200 shadow-sm transition-colors"
                  aria-label="Testimonial berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
