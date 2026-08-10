// src/types/index.ts

export interface ServiceItem {
  id: string;
  icon: string;
  name: string;
  description: string;  // Max 150 characters
  features?: string[];  // Optional feature list for checkmarks
  image?: string;       // Custom illustration image path
}

export interface AdvantageItem {
  id: string;
  icon: string;
  title: string;
  description: string; // Max 100 characters
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  photoUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string; // Max 300 characters
}

export interface SocialMediaItem {
  id: string;
  platform: 'instagram' | 'tiktok' | 'whatsapp' | string;
  url: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string; // Max 50 words
}

export interface ContactFormFields {
  nama: string;   // Max 100 chars
  email: string;
  subjek: string; // Max 100 chars
  pesan: string;  // Max 1000 chars
}

export interface ContactFormErrors {
  nama?: string;
  email?: string;
  subjek?: string;
  pesan?: string;
}

export type ContactFormStatus = 'idle' | 'loading' | 'success' | 'error';
