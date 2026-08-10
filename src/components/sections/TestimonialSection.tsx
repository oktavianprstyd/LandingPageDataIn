// src/components/sections/TestimonialSection.tsx
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <SectionWrapper id="testimoni" className="py-24 bg-[#FAF6F0] text-[#1E3A5F] relative overflow-hidden border-b border-[#D8CFC4]">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F4F0EA] border border-[#D8CFC4] text-[#002D80] text-xs font-bold uppercase tracking-wider mb-3 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>ULASAN MAHASISWA &amp; ALUMNI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A5F] font-heading mb-3">
            Kata Mereka yang Menggunakan DataIn
          </h2>
          <p className="text-[#4A709C] text-base font-medium">
            Lebih dari 5.000+ mahasiswa dari kampus ternama telah membuktikan garansi tepat waktu &amp; kualitas pengerjaan DataIn.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 relative border border-[#D8CFC4] shadow-xl">
          <Quote className="w-16 h-16 text-[#4A709C]/15 absolute top-8 right-8 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10">
            
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#002D80] text-white border-2 border-[#D8CFC4] flex items-center justify-center flex-shrink-0 shadow-lg">
                {hasPhoto ? (
                  <img
                    src={current.photoUrl}
                    alt={`Foto ${current.customerName}`}
                    onError={() => setImgErrors((prev) => ({ ...prev, [current.id]: true }))}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full text-white font-bold text-2xl flex items-center justify-center font-heading">
                    {getInitials(current.customerName)}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
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
                        : 'text-[#D8CFC4]'
                    }`}
                  />
                ))}
                <span className="text-xs font-extrabold text-[#1E3A5F] ml-2">5.0 / 5.0 Rating</span>
              </div>

              {/* Quote Text */}
              <p className="text-[#1E3A5F] text-lg sm:text-xl font-medium leading-relaxed mb-6 font-sans italic">
                "{current.text}"
              </p>

              {/* Customer Name & Verified Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#F4F0EA] pt-4">
                <div>
                  <h3 className="text-lg font-extrabold text-[#1E3A5F] font-heading">
                    {current.customerName}
                  </h3>
                  <p className="text-xs text-[#002D80] font-semibold tracking-wide uppercase">
                    Klien Terverifikasi DataIn
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#1E3A5F] bg-[#FAF6F0] border border-[#D8CFC4] px-3 py-1 rounded-full self-center sm:self-auto font-heading">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  100% Identitas Rahasia
                </span>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F4F0EA]">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-8 bg-[#002D80] shadow-md'
                        : 'w-2.5 bg-[#D8CFC4] hover:bg-[#4A709C]'
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
                  className="p-2.5 rounded-2xl bg-[#FAF6F0] text-[#1E3A5F] hover:bg-[#002D80] hover:text-white border border-[#D8CFC4] shadow-md transition-colors"
                  aria-label="Testimonial sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-2xl bg-[#FAF6F0] text-[#1E3A5F] hover:bg-[#002D80] hover:text-white border border-[#D8CFC4] shadow-md transition-colors"
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
