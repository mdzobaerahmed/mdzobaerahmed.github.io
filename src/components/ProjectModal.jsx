import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Terminal, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export function ProjectModal({ project, darkMode, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden my-8 transition-all ${
          darkMode 
            ? 'bg-[#0E1524] border-slate-800 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between font-mono text-xs ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/90 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="font-semibold text-slate-300">ARCHITECTURE SPEC // {project.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800/40 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title & Tagline */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                {project.title}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 text-amber-500 border border-amber-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Primary: {project.language}
              </span>
            </div>
            <p className="text-base text-slate-400 font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-xl border ${
                  darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
                  {metric.label}
                </div>
                <div className="text-base font-bold font-mono text-amber-400 mt-1">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Problem Statement & Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className={`p-4 rounded-xl border space-y-2 ${
              darkMode ? 'bg-slate-900/30 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-rose-400">
                <span>[01] PROBLEM STATEMENT</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-sans">
                {project.problemStatement}
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${
              darkMode ? 'bg-slate-900/30 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
                <span>[02] ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-sans">
                {project.architectureOverview}
              </p>
            </div>
          </div>

          {/* Code Implementation Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>CORE PRIMITIVE IMPLEMENTATION ({project.language})</span>
              </span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors text-[11px]"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy snippet'}</span>
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060910] p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
              <pre className="text-emerald-300/90">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-2 pt-1">
            <div className="font-mono text-xs text-slate-500 uppercase tracking-wider">
              TECHNOLOGY STACK & PROTOCOLS
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono border ${
                    darkMode 
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300' 
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-500">
              Licensed under MIT • Production Ready
            </div>
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono hover:bg-slate-800 text-slate-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
