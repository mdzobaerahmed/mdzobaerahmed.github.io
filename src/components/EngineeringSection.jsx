import React, { useState } from 'react';
import { Terminal, ExternalLink, Code2, ArrowUpRight, Star, GitFork, Cpu, ArrowRight } from 'lucide-react';
import { engineeringProjects } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

export function EngineeringSection({ darkMode, onNavigateToAcademicProjects, onNavigate }) {
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Showcase top 2 projects on the home page as requested
  const showcaseProjects = engineeringProjects.slice(0, 2);

  const handleProjectClick = (project) => {
    if (onNavigateToAcademicProjects) {
      onNavigateToAcademicProjects();
    } else {
      setActiveModalProject(project);
    }
  };

  return (
    <section id="activities" className="py-24 relative tech-grid-bg scroll-mt-24">
      {/* Scroll Anchors */}
      <div id="academic-projects" className="absolute -top-24"></div>
      <div id="engineering" className="absolute -top-24"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Activity Hub Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-amber-500 tracking-wider uppercase font-semibold">
              <Terminal className="w-4 h-4" />
              <span>05 // ACTIVITIES // ACADEMIC PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight">
              Academic Projects
            </h2>
            <p className={`text-sm sm:text-base max-w-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Featured full-stack platforms, socket communication engines, and system architecture artifacts from my CSE journey.
            </p>
          </div>

          {/* Quick link to main Academic Projects page */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onNavigateToAcademicProjects && (
              <button
                onClick={onNavigateToAcademicProjects}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-xs text-amber-400 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-all font-semibold cursor-pointer w-fit shrink-0"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Activities Sub-Navigation Hub */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/60 font-mono text-xs">
          <span className="text-slate-500 text-[11px] uppercase tracking-wider mr-2">ACTIVITIES HUB:</span>
          <button 
            onClick={() => onNavigate && onNavigate('skills')}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              darkMode ? 'border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-slate-700' : 'border-slate-200 bg-white text-slate-600 hover:text-amber-600'
            }`}
          >
            • Skills
          </button>
          <button 
            onClick={() => onNavigateToAcademicProjects && onNavigateToAcademicProjects()}
            className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-400 font-semibold cursor-pointer"
          >
            • Academic Projects
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('publications')}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              darkMode ? 'border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-slate-700' : 'border-slate-200 bg-white text-slate-600 hover:text-amber-600'
            }`}
          >
            • Publications
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('extra-curricular')}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              darkMode ? 'border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-slate-700' : 'border-slate-200 bg-white text-slate-600 hover:text-amber-600'
            }`}
          >
            • Extra Curricular Activities
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('blog')}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              darkMode ? 'border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-slate-700' : 'border-slate-200 bg-white text-slate-600 hover:text-amber-600'
            }`}
          >
            • Blog
          </button>
        </div>

        {/* 2 Showcase Projects Grid Matching User Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {showcaseProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                darkMode
                  ? 'bg-[#0E1524]/80 border-slate-800/80 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5'
                  : 'bg-white border-slate-200 hover:border-amber-500/50 hover:shadow-xl shadow-xs'
              }`}
              onClick={() => handleProjectClick(project)}
            >
              {/* Subtle top indicator bar */}
              <div className="h-1 w-full bg-linear-to-r from-amber-500/20 via-amber-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Card Content Top */}
              <div className="p-6 sm:p-7 space-y-4">
                {/* Metadata Monospace Row */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {project.language}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-[11px]">{project.category}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 text-xs">
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                      <Star className="w-3.5 h-3.5" />
                      <span>{project.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{project.forks}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.tagline}
                  </p>
                </div>

                {/* Problem & Solution Snippet */}
                <div className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                  darkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <span className="font-mono text-[10px] text-amber-500 uppercase tracking-wider block font-semibold">PROBLEM:</span>
                    <p className="text-slate-300 mt-0.5 text-[11.5px] line-clamp-2">
                      {project.problemStatement}
                    </p>
                  </div>
                </div>

                {/* Highlight Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div 
                      key={mIdx}
                      className={`p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-900/30 border-slate-800/60' : 'bg-slate-50/60 border-slate-200'
                      }`}
                    >
                      <div className="text-[10px] text-slate-500">{m.label}</div>
                      <div className="text-sm font-bold text-amber-400 mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Content Bottom */}
              <div 
                className={`px-6 sm:px-7 py-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                  darkMode ? 'border-slate-800/70 bg-slate-900/30' : 'border-slate-100 bg-slate-50/40'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-2 py-0.5 rounded text-[10.5px] font-mono border ${
                        darkMode 
                          ? 'bg-slate-800/50 border-slate-700/60 text-slate-300' 
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10.5px] font-mono text-slate-500">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions: Deep Dive & GitHub */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500 text-xs font-mono text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Deep Dive
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner directing to full Academic Projects archive */}
        {onNavigateToAcademicProjects && (
          <div className="mt-8 text-center">
            <button
              onClick={onNavigateToAcademicProjects}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-mono text-xs font-semibold transition-all shadow-md cursor-pointer"
            >
              <span>View All Academic Projects in Main Archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Interactive Modal if opened without full page transition */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          darkMode={darkMode}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}

export default EngineeringSection;
