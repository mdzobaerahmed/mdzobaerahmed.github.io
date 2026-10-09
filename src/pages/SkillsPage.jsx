import React, { useState } from 'react';
import { ArrowLeft, Code2, Database, Layout, Terminal, Sparkles, CheckCircle2, Cpu, Wrench, Camera } from 'lucide-react';
import { gearAndTools } from '../data/portfolioData';

export function SkillsPage({ darkMode, onBack }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'languages', label: 'Languages' },
    { id: 'frameworks', label: 'Backend & Web' },
    { id: 'data', label: 'Data & ML' },
    { id: 'product', label: 'Product & Agile' },
    { id: 'optics', label: 'Optics & Visuals' }
  ];

  const skillGroups = [
    {
      categoryId: 'languages',
      title: 'Programming Languages',
      icon: Terminal,
      description: 'Core languages for software engineering, system architecture, and database persistence.',
      skills: [
        { name: 'C / C++', level: 'Proficient', context: 'Data structures, algorithm complexity, pointers', badge: 'Core' },
        { name: 'Python', level: 'Advanced', context: 'Socket programming, multithreading, data pipelines', badge: 'Primary' },
        { name: 'JavaScript (ES6+)', level: 'Advanced', context: 'Full-stack web apps, async/await, DOM APIs' },
        { name: 'PHP', level: 'Proficient', context: 'Server-side application logic, relational query execution' },
        { name: 'SQL', level: 'Proficient', context: 'MySQL, PostgreSQL, schema normalization (3NF)' },
        { name: 'NoSQL', level: 'Intermediate', context: 'Document stores, unstructured dynamic schema management' }
      ]
    },
    {
      categoryId: 'frameworks',
      title: 'Backend Systems & Frameworks',
      icon: Code2,
      description: 'Full-stack web platforms, ORMs, and asynchronous communication stacks.',
      skills: [
        { name: 'Node.js & Express.js', level: 'Advanced', context: 'RESTful API servers, middleware, authentication', badge: 'Primary' },
        { name: 'TypeScript', level: 'Advanced', context: 'Type safety, interfaces, scalable server architectures' },
        { name: 'Prisma ORM', level: 'Proficient', context: 'Type-safe database queries, schema migrations' },
        { name: 'WebSockets & TCP Sockets', level: 'Proficient', context: 'Real-time multi-client chat, message routing' },
        { name: 'LaTeX & UML', level: 'Proficient', context: 'System Analysis & Design formal documentation' }
      ]
    },
    {
      categoryId: 'product',
      title: 'Product Management & Tools',
      icon: Layout,
      description: 'Product lifecycle thinking, business roadmaps, and daily productive software suites.',
      skills: [
        { name: 'Digital Product Management', level: 'Career Path', context: 'Interactive Cares Career Path certification (Oct 2025)', badge: 'Certified' },
        { name: 'Canva', level: 'Advanced', context: 'Visual decks, banner design, product wireframing' },
        { name: 'MS Office Suite', level: 'Proficient', context: 'Word, Excel data models, PowerPoint presentations' },
        { name: 'Google Workspace', level: 'Advanced', context: 'Collaborative docs, team sheets, cloud asset workflows' }
      ]
    },
    {
      categoryId: 'optics',
      title: 'Soft Skills & Visual Storytelling',
      icon: Camera,
      description: 'Team leadership, national festival management, and visual artistry.',
      skills: [
        { name: 'Team Management', level: 'Executive', context: 'Directed 70+ members at UIU Photography Club', badge: 'Leadership' },
        { name: 'Event Organization', level: 'Proven', context: 'Organized Photo Carnival 23, Friday Exposure, Artsy Overlap 2021' },
        { name: 'Photography', level: 'Award-Winning', context: 'Fujifilm X-T5, Exhibited in Greece & Scotland', badge: 'Awarded' },
        { name: 'Languages', level: 'Bilingual', context: 'Bangla (Native), English (Professional)' }
      ]
    }
  ];

  const filteredGroups = activeCategory === 'all'
    ? skillGroups
    : skillGroups.filter(g => g.categoryId === activeCategory);

  return (
    <div className={`min-h-screen py-24 sm:py-28 ${darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link / Breadcrumb */}
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
            ACTIVITIES // [01] SKILLS
          </span>
        </div>

        {/* Header Banner */}
        <div className="mb-12">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span>TECHNICAL ARSENAL & PROFICIENCIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Skills & Capabilities
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            A categorized overview of programming frameworks, machine learning tooling, product discovery methodologies, and optical image curation refined through academic research and practical leadership.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mb-12 flex flex-wrap items-center gap-2 font-mono text-xs">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                activeCategory === c.id
                  ? (darkMode ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-semibold' : 'bg-white text-slate-900 border-amber-500/60 font-semibold shadow-xs')
                  : (darkMode ? 'bg-[#0E1524]/50 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900')
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="space-y-12">
          {filteredGroups.map((group, gIdx) => {
            const GroupIcon = group.icon;
            return (
              <div 
                key={gIdx}
                className={`p-8 rounded-2xl border transition-all ${
                  darkMode ? 'bg-[#0E1524]/75 border-slate-800/80 shadow-xl shadow-black/20' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center shrink-0">
                      <GroupIcon className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-sans">
                        {group.title}
                      </h2>
                      <p className={`text-xs font-sans mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-amber-500 self-start sm:self-auto">
                    {group.skills.length} Items
                  </span>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                        darkMode 
                          ? 'bg-[#121927]/60 border-slate-800 hover:border-amber-500/40' 
                          : 'bg-slate-50 border-slate-200 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-sm font-bold font-sans group-hover:text-amber-400 transition-colors ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                          {skill.name}
                        </span>
                        {skill.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 shrink-0">
                            {skill.badge}
                          </span>
                        )}
                      </div>

                      <p className={`text-xs font-sans leading-relaxed mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {skill.context}
                      </p>

                      <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between font-mono text-[10.5px]">
                        <span className="text-slate-500">Proficiency</span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
