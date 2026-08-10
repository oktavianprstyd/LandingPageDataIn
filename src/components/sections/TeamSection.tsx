// src/components/sections/TeamSection.tsx
import { useState } from 'react';
import { User } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import type { TeamMember } from '../../types';
import { getInitials } from '../../utils/validation';

interface TeamSectionProps {
  members: TeamMember[];
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  const showPhoto = Boolean(member.photoUrl && !imgError);

  return (
    <div className="light-card rounded-3xl p-8 flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-50 border-2 border-blue-200 flex items-center justify-center mb-5 shadow-sm">
        {showPhoto ? (
          <img
            src={member.photoUrl}
            alt={`Foto ${member.name}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
            {getInitials(member.name) || <User className="w-8 h-8" />}
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">{member.name}</h3>
      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{member.role}</p>
    </div>
  );
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <SectionWrapper id="tim" className="relative py-20 bg-slate-50/80 text-slate-900 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 inline-block mb-4">
            Tim Pakar DataIn
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading mb-4">
            Tim Kami
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Para akademisi dan spesialis data yang siap mendampingi kebutuhan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
