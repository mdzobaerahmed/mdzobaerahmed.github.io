import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Wrench, Camera, Terminal, Award, Download, CheckCircle2, FileText, ExternalLink, Filter } from 'lucide-react';
import { profileData, experienceTimeline, educationList, certificationsAndAwards, certificationsData, gearAndTools } from '../data/portfolioData';

export function AboutSection({ 
  darkMode,
  experienceTab = 'all',
  setExperienceTab,
  achievementsTab = 'all',
  setAchievementsTab,
  activitiesTab = 'all',
  setActivitiesTab
}) {
  const [activeGearTab, setActiveGearTab] = useState('engineering'); // 'engineering' or 'optics'

  // Filtered achievements
  const filteredAchievements = achievementsTab === 'all'
    ? certificationsAndAwards
    : achievementsTab === 'awards'
      ? certificationsAndAwards.filter(a => a.type === 'Award' || a.type === 'International')
      : certificationsAndAwards.filter(a => a.type === 'Certification' || a.type === 'Leadership');

  return (
    <section id="about" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-500 tracking-wider uppercase font-semibold">
            <User className="w-4 h-4" />
            <span>01 // BIOGRAPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight">
            About Me
          </h2>
        </div>

        {/* Top Grid: Dual Narrative Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Main Bio Card (8 cols) */}
          <div className={`lg:col-span-8 p-8 rounded-2xl border transition-all ${
            darkMode ? 'bg-[#0E1524]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-xl font-bold font-sans flex items-center gap-2.5">
                <span>The Intersection of Product & Photography</span>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              </h3>
              
              <a
                href="/Academic_CV.pdf"
                download="Md_Zobaer_Ahmed_CV.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-xs text-amber-500 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-colors w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Academic CV</span>
              </a>
            </div>
            
            <div className={`space-y-4 font-sans text-sm sm:text-base leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <p>
                I am an aspiring <strong>Product Manager</strong> and Computer Science undergraduate at <strong>United International University (UIU)</strong> in Dhaka, Bangladesh. Currently completing a Digital Product Management program at Interactive Cares, I am passionate about <strong>roadmapping, user research, agile methodologies</strong>, and <strong>data-driven decision-making</strong>.
              </p>
              <p>
                Over the years, I have successfully managed operations for <strong>70+ members</strong> and organized national-scale events with <strong>100+ attendees</strong> at the UIU Photography Club and Remains Art Club. I strive to combine my technical background and management experience to design and lead software products that solve real-world problems.
              </p>
              <p className="font-mono text-xs sm:text-sm text-amber-500/90 pt-2 border-t border-slate-800/60">
                // "Combining technical engineering with product empathy and executive operations to solve real-world problems."
              </p>
            </div>
          </div>

          {/* Quick Metrics / Philosophy Card (4 cols) */}
          <div className={`lg:col-span-4 p-8 rounded-2xl border flex flex-col justify-between font-mono text-xs ${
            darkMode ? 'bg-[#0E1524]/40 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-4">
              <div className="text-slate-500 tracking-wider uppercase text-[11px]">
                CORE ACADEMIC & PRODUCT PILLARS
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Academic Excellence</strong>
                    <span className="text-slate-400 text-[11px]">GPA 5.00 / 5.00 in both HSC & SSC with Govt. Scholarships.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Product Discovery & Roadmaps</strong>
                    <span className="text-slate-400 text-[11px]">User journey mapping, Agile sprints, and data-driven prioritization.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Award-Winning Visual Eye</strong>
                    <span className="text-slate-400 text-[11px]">Exhibited in Greece & Scotland; Winner of national student photo fests.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Experience & Education Section (Side-by-Side) */}
        <div id="experience" className="mb-24 scroll-mt-24">
          
          {/* Section Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-500" />
              <span>CAREER & ACADEMIC ARCHIVE</span>
            </div>

            {/* Interactive View Filter Tabs */}
            <div className={`inline-flex p-1 rounded-xl border text-xs font-mono ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setExperienceTab && setExperienceTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  experienceTab === 'all'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-semibold shadow-xs' : 'bg-white text-slate-900 font-semibold shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All (Side-by-Side)
              </button>
              <button
                onClick={() => setExperienceTab && setExperienceTab('work')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  experienceTab === 'work'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-semibold shadow-xs' : 'bg-white text-slate-900 font-semibold shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Work Experience
              </button>
              <button
                onClick={() => setExperienceTab && setExperienceTab('education')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  experienceTab === 'education'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-semibold shadow-xs' : 'bg-white text-slate-900 font-semibold shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Education
              </button>
            </div>
          </div>

          {/* Grid Layout (Side-by-Side on Desktop/Tablet) */}
          <div className={`grid gap-8 items-stretch ${
            experienceTab === 'all' 
              ? 'grid-cols-1 lg:grid-cols-2 lg:gap-10' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            
            {/* 1. Work Experience Panel */}
            {(experienceTab === 'all' || experienceTab === 'work') && (
              <div id="work-experience" className={`p-7 sm:p-8 rounded-2xl border transition-all flex flex-col justify-between ${
                darkMode ? 'bg-[#0E1524]/75 border-slate-800/80 shadow-xl shadow-black/20' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div>
                  <div className="mb-7 pb-4 border-b border-slate-800/60">
                    <div className="flex items-center gap-2 font-mono text-xs text-amber-500 uppercase tracking-wider font-semibold mb-1.5">
                      <Briefcase className="w-4 h-4 text-amber-500" />
                      <span>02 // PROFESSIONAL HISTORY</span>
                    </div>
                    <h3 className={`text-2xl sm:text-3xl font-bold font-sans tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      Work Experience
                    </h3>
                  </div>

                  <div className="space-y-7">
                    {experienceTimeline.map((item, idx) => (
                      <div key={idx} className="relative pl-6 group">
                        {/* Theme Bullet Indicator */}
                        <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-slate-600 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></span>
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className={`text-base font-bold font-sans transition-colors ${
                            darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                          }`}>
                            {item.role}
                          </h4>
                          <span className="text-xs font-mono text-amber-500/90 font-medium shrink-0">
                            {item.period}
                          </span>
                        </div>

                        <p className={`text-xs sm:text-sm font-sans mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {item.company}
                        </p>

                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="mt-2.5 space-y-1.5">
                            {item.bullets.map((bullet, bIdx) => (
                              <li 
                                key={bIdx} 
                                className={`text-xs font-sans leading-relaxed flex items-start gap-2 ${
                                  darkMode ? 'text-slate-300' : 'text-slate-600'
                                }`}
                              >
                                <span className="text-amber-500 text-[10px] mt-0.5 shrink-0">●</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/50 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>Professional & Leadership Roles</span>
                  <span className="text-amber-500">2020 — Present</span>
                </div>
              </div>
            )}

            {/* 2. Education Panel */}
            {(experienceTab === 'all' || experienceTab === 'education') && (
              <div id="education" className={`p-7 sm:p-8 rounded-2xl border transition-all flex flex-col justify-between scroll-mt-24 ${
                darkMode ? 'bg-[#0E1524]/75 border-slate-800/80 shadow-xl shadow-black/20' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div>
                  <div className="mb-7 pb-4 border-b border-slate-800/60">
                    <div className="flex items-center gap-2 font-mono text-xs text-amber-500 uppercase tracking-wider font-semibold mb-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-500" />
                      <span>03 // ACADEMIC HISTORY</span>
                    </div>
                    <h3 className={`text-2xl sm:text-3xl font-bold font-sans tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      Education
                    </h3>
                  </div>

                  <div className="space-y-7">
                    {educationList.map((edu, idx) => (
                      <div key={idx} className="relative pl-6 group">
                        {/* Theme Bullet Indicator */}
                        <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-slate-600 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></span>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                          <h4 className={`text-base font-bold font-sans transition-colors ${
                            darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                          }`}>
                            {edu.degree}
                          </h4>
                          {edu.statusBadge && (
                            <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border transition-colors shrink-0 ${
                              darkMode 
                                ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' 
                                : 'border-amber-500/40 bg-amber-50 text-amber-800'
                            }`}>
                              {edu.statusBadge}
                            </span>
                          )}
                        </div>

                        <p className={`text-xs sm:text-sm font-sans mt-0.5 font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {edu.institution}
                        </p>

                        {edu.description && (
                          <p className={`text-xs font-sans mt-1.5 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {edu.description}
                          </p>
                        )}

                        {edu.focusAreas && edu.focusAreas.length > 0 && (
                          <div className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-[10.5px]">
                            <span className="text-amber-500/80 text-[10px] tracking-wider uppercase mr-1 font-semibold">FOCUS:</span>
                            {edu.focusAreas.map((focus, fIdx) => (
                              <span
                                key={fIdx}
                                className={`px-2 py-0.5 rounded border ${
                                  darkMode 
                                    ? 'border-slate-800 bg-slate-900/80 text-slate-300' 
                                    : 'border-slate-200 bg-slate-100 text-slate-700'
                                }`}
                              >
                                {focus}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/50 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>UIU CSE • DRMC</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 04 // Achievements Section */}
        <div id="achievements" className="mb-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-1 flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                <span>04 // CREDENTIALS & HONORS</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold font-sans tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {achievementsTab === 'certifications' ? 'Certifications' : achievementsTab === 'awards' ? 'Awards & Honors' : 'Achievements'}
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className={`inline-flex p-1 rounded-xl border text-xs font-mono ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setAchievementsTab && setAchievementsTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  achievementsTab === 'all'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-semibold' : 'bg-white text-slate-900 font-semibold shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setAchievementsTab && setAchievementsTab('certifications')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  achievementsTab === 'certifications'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-semibold' : 'bg-white text-slate-900 font-semibold shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Certifications
              </button>
              <button
                onClick={() => setAchievementsTab && setAchievementsTab('awards')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  achievementsTab === 'awards'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-semibold' : 'bg-white text-slate-900 font-semibold shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Awards
              </button>
            </div>
          </div>

          {/* 1. Certifications */}
          {(achievementsTab === 'all' || achievementsTab === 'certifications') && (
            <div id="certifications" className="scroll-mt-24 mb-12">
              {achievementsTab === 'all' && (
                <div className="mb-6 flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <h3 className={`text-xl font-bold font-sans ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    Certifications & Programs
                  </h3>
                  <span className="font-mono text-xs text-amber-500">4 Credentials</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {certificationsData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all group flex items-center gap-4 ${
                      darkMode 
                        ? 'bg-[#0E1524]/75 border-slate-800/80 hover:border-amber-500/40 shadow-lg' 
                        : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-sm sm:text-base font-bold font-sans transition-colors ${
                        darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                      }`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs font-sans mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.issuer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Awards & Honors */}
          {(achievementsTab === 'all' || achievementsTab === 'awards') && (
            <div id="awards" className="scroll-mt-24">
              {achievementsTab === 'all' && (
                <div className="mb-6 flex items-center justify-between pb-3 border-b border-slate-800/50">
                  <h3 className={`text-xl font-bold font-sans ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    Awards & Honors
                  </h3>
                  <span className="font-mono text-xs text-amber-500">6 Honors</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificationsAndAwards.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-6 sm:p-7 rounded-2xl border transition-all group flex flex-col justify-between ${
                      darkMode ? 'bg-[#0E1524]/75 border-slate-800/80 hover:border-amber-500/40 shadow-lg' : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-mono text-[10.5px] uppercase tracking-wider text-amber-500 font-semibold">
                          {item.category}
                        </span>
                      </div>

                      <h4 className={`text-base sm:text-lg font-bold font-sans transition-colors ${
                        darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                      }`}>
                        {item.title}
                      </h4>

                      <p className={`text-xs font-sans mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.issuer}
                      </p>

                      <p className={`text-xs font-sans mt-3.5 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800/50 flex items-center justify-between font-mono text-[10.5px] text-slate-500">
                      <span>{item.type}</span>
                      <span className="text-amber-500">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Tools & Gear Breakdown */}
        <div id="tools" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>TECHNICAL & PHOTOGRAPHIC ARSENAL</span>
            </div>

            {/* Tab switch between Software Engineering vs Photographic Arsenal */}
            <div className={`inline-flex p-1 rounded-xl border text-xs font-mono ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveGearTab('engineering')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeGearTab === 'engineering'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-medium' : 'bg-white text-slate-900 font-medium shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
                <span>Tech & PM Tools</span>
              </button>
              <button
                onClick={() => setActiveGearTab('optics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeGearTab === 'optics'
                    ? (darkMode ? 'bg-amber-500/20 text-amber-400 font-medium' : 'bg-white text-slate-900 font-medium shadow-xs')
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-amber-500" />
                <span>Fujifilm X-T5 & Glass</span>
              </button>
            </div>
          </div>

          {/* Gear Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGearTab === 'engineering' ? (
              gearAndTools.softwareEngineering.map((category, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border font-mono transition-all ${
                    darkMode ? 'bg-[#0E1524]/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs text-amber-500 font-semibold mb-3 flex items-center justify-between">
                    <span>{category.category}</span>
                    <span className="text-[10px] text-slate-500">#{idx + 1}</span>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, iIdx) => (
                      <li key={iIdx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              gearAndTools.photographicArsenal.map((category, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border font-mono transition-all ${
                    darkMode ? 'bg-[#0E1524]/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs text-amber-500 font-semibold mb-3 flex items-center justify-between">
                    <span>{category.category}</span>
                    <span className="text-[10px] text-slate-500">#{idx + 1}</span>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, iIdx) => (
                      <li key={iIdx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
