import type { SocialMediaItem } from '../types';

const WHATSAPP_NUMBER = '6282227445735';
const WA_TEMPLATE = encodeURIComponent('Halo Admin DataIn! Saya mau konsultasi mengenai asistensi tugas / olah data. Mohon info estimasi biaya & waktunya ya!');

export const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEMPLATE}`;

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
    url: 'https://www.tiktok.com/@datainaja_',
    icon: 'Music',
  },
];
