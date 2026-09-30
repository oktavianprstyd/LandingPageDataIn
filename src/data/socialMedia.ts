import type { SocialMediaItem } from '../types';
import { TIKTOK_URL, waUrl } from './contact';

export const WA_URL = waUrl(
  'Halo Admin DataIn! Saya mau konsultasi mengenai asistensi tugas / olah data. Mohon info estimasi biaya & waktunya ya!'
);

export const socialMediaLinks: SocialMediaItem[] = [
  {
    id: 'whatsapp',
    platform: 'whatsapp',
    url: WA_URL,
    icon: 'Phone',
  },
  {
    id: 'tiktok',
    platform: 'tiktok',
    url: TIKTOK_URL,
    icon: 'Music',
  },
];
