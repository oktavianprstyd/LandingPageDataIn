// src/components/sections/SocialMediaSection.tsx
import { Instagram, Music, Phone, Globe } from 'lucide-react';
import type { SocialMediaItem } from '../../types';

interface SocialMediaSectionProps {
  links: SocialMediaItem[];
}

const getIcon = (iconName: string, platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('instagram') || iconName === 'Instagram') return Instagram;
  if (p.includes('tiktok') || iconName === 'Music') return Music;
  if (p.includes('whatsapp') || iconName === 'Phone') return Phone;
  return Globe;
};

export default function SocialMediaSection({ links }: SocialMediaSectionProps) {
  const validLinks = links.filter((item) => Boolean(item.url && item.url.trim()));

  if (validLinks.length === 0) return null;

  return (
    <div className="bg-white py-12 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
          Kunjungi Media Sosial DataIn
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {validLinks.map((item) => {
            const IconComponent = getIcon(item.icon, item.platform);
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ikuti DataIn di ${item.platform}`}
                className="light-card flex items-center gap-3 px-6 py-3 rounded-full text-slate-700 hover:text-blue-600 border border-slate-200 shadow-sm group"
              >
                <IconComponent className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold capitalize font-heading">{item.platform}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
