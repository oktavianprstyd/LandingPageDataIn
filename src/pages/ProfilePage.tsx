// src/pages/ProfilePage.tsx
import SEOHead from '../components/common/SEOHead';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import ProfileHeroSection from '../components/sections/ProfileHeroSection';
import VisionMissionSection from '../components/sections/VisionMissionSection';
import TeamSection from '../components/sections/TeamSection';
import CoreValuesSection from '../components/sections/CoreValuesSection';

import { teamMembers } from '../data/team';
import { coreValues } from '../data/coreValues';

/**
 * Profile Page component.
 * Satisfies Requirements 8.1–8.7, 9.1, 9.7, 9.8.
 */
export default function ProfilePage() {
  const metaDescription =
    'Mengenal DataIn lebih dekat — platform layanan bantuan tugas, riset data, dan bimbingan akademik dengan integritas, kualitas, dan ketepatan waktu.';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-50 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <SEOHead
        title="Tentang Kami - DataIn Profil Perusahaan & Tim"
        description={metaDescription}
      />
      <NavBar />
      <main className="flex-1">
        <ProfileHeroSection />
        <VisionMissionSection />
        <TeamSection members={teamMembers} />
        <CoreValuesSection values={coreValues} />
      </main>
      <Footer />
    </div>
  );
}
