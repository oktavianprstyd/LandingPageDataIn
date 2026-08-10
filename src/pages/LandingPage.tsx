// src/pages/LandingPage.tsx
import SEOHead from '../components/common/SEOHead';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/sections/HeroSection';
import ServiceSection from '../components/sections/ServiceSection';
import AdvantageSection from '../components/sections/AdvantageSection';
import TestimonialSection from '../components/sections/TestimonialSection';
import ContactSection from '../components/sections/ContactSection';
import SocialMediaSection from '../components/sections/SocialMediaSection';

import { services } from '../data/services';
import { advantages } from '../data/advantages';
import { testimonials } from '../data/testimonials';
import { socialMediaLinks } from '../data/socialMedia';

/**
 * Landing Page component.
 * Satisfies Requirements 1.1–1.4, 2.1–2.3, 3.1–3.3, 4.1–4.5, 5.1–5.7, 6.1–6.4, 7.1–7.6, 9.8.
 */
export default function LandingPage() {
  const metaDescription =
    'DataIn menyediakan jasa joki tugas, olah data responden, dan bimbingan konsul akademik cepat, terpercaya, serta menjaga kerahasiaan 100%.';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-50 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <SEOHead
        title="DataIn - Layanan Asistensi Akademik & Olah Data Terpercaya"
        description={metaDescription}
      />
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <ServiceSection services={services} />
        <AdvantageSection advantages={advantages} />
        <TestimonialSection testimonials={testimonials} />
        <ContactSection />
        <SocialMediaSection links={socialMediaLinks} />
      </main>
      <Footer />
    </div>
  );
}
