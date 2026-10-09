import React from 'react';
import { ArrowLeft, Users, Trophy, Award, Calendar, CheckCircle2, Star, Sparkles } from 'lucide-react';

export function ExtraCurricularPage({ darkMode, onBack }) {
  const leadershipRoles = [
    {
      role: "IELTS Invigilator",
      organization: "IDP Education Ltd",
      period: "Jan 2026 — Present",
      teamSize: "International Examination Operations",
      highlights: [
        "Invigilating high-stakes official IELTS examinations under strict international compliance standards.",
        "Managing testing venue integrity, identity verification protocols, and examination room logistics."
      ]
    },
    {
      role: "Vice President",
      organization: "UIU Photography Club (UIUPC)",
      period: "Jan 2026 — Sep 2026",
      teamSize: "70+ Active Members",
      highlights: [
        "Organized major events: Photo Carnival 23, Friday Exposure Exhibition and Shutter Stories: Chapter IV at UIU.",
        "Supervised national-scale student photo submissions, panel judging, and grand exhibition curations."
      ]
    },
    {
      role: "Brand Representative",
      organization: "Interactive Cares",
      period: "May 2025 — Sep 2025",
      teamSize: "EdTech Ambassador Network",
      highlights: [
        "Represented the Interactive Cares brand at university and community events.",
        "Facilitated student engagement and career path program outreach on campus."
      ]
    },
    {
      role: "Executive Member",
      organization: "Remains Art Club",
      period: "Feb 2020 — Mar 2021",
      teamSize: "DRMC Campus Arts Initiative",
      highlights: [
        "Organized national fest 'Artsy Overlap 2021' at Dhaka Residential Model College.",
        "Coordinated fine arts exhibitions and inter-college cultural events."
      ]
    }
  ];

  const nationalHonors = [
    {
      title: "Winner — Life at UIU Photography Contest",
      organizer: "United International University",
      year: "2024",
      context: "Recognized for capturing spontaneous campus life dynamics with high visual empathy."
    },
    {
      title: "Winner — Camera Photography (Senior Category)",
      organizer: "Reflection 3.0 National GSCPC Photography Festival",
      year: "2024",
      context: "Awarded top honor nationwide for innovative camera compositions and tonal geometry."
    },
    {
      title: "1st Runner-up — Nature Through Your Lens",
      organizer: "3rd DRMC National Nature Festival (Nov 2024)",
      year: "2024",
      context: "Landscape composition capturing natural textures and horizon atmospheric light."
    },
    {
      title: "International Recognition",
      organizer: "Selected for exhibitions in Greece and Scotland",
      year: "2024–2026",
      context: "Documentary photographs curated and printed for fine art gallery exhibitions in Europe."
    },
    {
      title: "Government Merit Scholarships",
      organizer: "Government of Bangladesh",
      year: "2013 — 2019",
      context: "Merit-based competitive scholarships awarded for PSC (2013), JSC (2016), and SSC (2019)."
    }
  ];

  return (
    <div className={`min-h-screen py-24 sm:py-28 ${darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs transition-all ${
              darkMode 
                ? 'border-slate-800 bg-[#0E1524]/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 shadow-sm' 
                : 'border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:border-amber-500/50 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>← Back to Portfolio</span>
          </button>

          <span className="font-mono text-xs text-amber-500/90 tracking-wider hidden sm:inline">
            ACTIVITIES // [04] EXTRA CURRICULAR
          </span>
        </div>

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>LEADERSHIP, CLUB OPERATIONS & IMPACT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Extra Curricular Activities
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Managing 70+ member cross-functional operations at UIU Photography Club, organizing nationwide festivals, and participating in global leadership cohorts.
          </p>
        </div>

        {/* Leadership & Clubs Cards */}
        <div className="mb-16">
          <div className="mb-6 pb-2 border-b border-slate-800/50 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-sans">
              Club Leadership & Global Fellowships
            </h2>
            <span className="font-mono text-xs text-amber-500">3 Major Engagements</span>
          </div>

          <div className="space-y-8">
            {leadershipRoles.map((role, idx) => (
              <div
                key={idx}
                className={`p-8 sm:p-10 rounded-2xl border transition-all ${
                  darkMode ? 'bg-[#0E1524]/80 border-slate-800/80 shadow-xl shadow-black/20' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-sans">
                    {role.role}
                  </h3>
                  <span className="font-mono text-xs text-amber-500 font-medium">
                    {role.period}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-slate-400 mb-6">
                  <span className="font-semibold text-slate-200">{role.organization}</span>
                  <span>•</span>
                  <span>{role.teamSize}</span>
                </div>

                <div className="space-y-2.5">
                  {role.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3 text-sm font-sans">
                      <span className="text-amber-500 mt-1 shrink-0">●</span>
                      <span className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Competitions & Recognitions */}
        <div>
          <div className="mb-6 pb-2 border-b border-slate-800/50 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-sans">
              National Recognitions & Exhibition Features
            </h2>
            <span className="font-mono text-xs text-amber-500">Competitions & Curation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nationalHonors.map((honor, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border transition-all group ${
                  darkMode ? 'bg-[#0E1524]/75 border-slate-800/80 hover:border-amber-500/40 shadow-lg' : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-xs text-amber-500 font-semibold">{honor.year}</span>
                </div>

                <h3 className={`text-base sm:text-lg font-bold font-sans mb-1 group-hover:text-amber-400 transition-colors ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {honor.title}
                </h3>

                <p className={`text-xs font-sans mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {honor.organizer}
                </p>

                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {honor.context}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
