import React, { useState } from 'react';
import { Terminal, Camera, FileText, Code2, MapPin, Download, Check, Sparkles, User } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { TerminalCard } from './TerminalCard';

export function Hero({ darkMode, onExploreCode, onExploreLens }) {
  const [activePhotoView, setActivePhotoView] = useState('portrait'); // 'portrait' first, or 'street'

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Dual Identity Overview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Split identity tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-tight transition-all">
              <span className="flex items-center gap-1.5 text-amber-500">
                <Code2 className="w-3.5 h-3.5" />
                <span>CSE @ UIU • Product Management</span>
              </span>
              <span className="text-slate-500">×</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Camera className="w-3.5 h-3.5" />
                <span>Fujifilm X-T5 Photography</span>
              </span>
            </div>

            {/* Main Headline & Intro */}
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] font-sans">
                <span className="block">Hello, I am <span className="text-amber-500">Zobaer</span>.</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-amber-400 font-sans tracking-tight">
                CS Undergrad, Aspiring Product Manager &amp; Photographer
              </p>
              <p className={`text-base sm:text-lg leading-relaxed font-sans pt-1 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Computer Science undergraduate at United International University with a strong focus on Product Management. Digital PM Trainee at Interactive Cares, seeking internship opportunities to build impactful technology products.
              </p>
            </div>

            {/* Metrics Ribbon */}
            <div className={`grid grid-cols-3 gap-4 py-4 border-y font-mono ${
              darkMode ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div>
                <div className="text-[11px] text-slate-500 tracking-wider">ACADEMIC HONORS</div>
                <div className="text-lg sm:text-xl font-bold text-amber-500 mt-0.5">GPA 5.00</div>
                <div className="text-[10px] text-slate-400 mt-0.5">DRMC HSC & SSC Golden</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 tracking-wider">CURRENT TRACK</div>
                <div className="text-lg sm:text-xl font-bold text-amber-400 mt-0.5">10th Trimester</div>
                <div className="text-[10px] text-slate-400 mt-0.5">UIU CSE • Digital PM</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 tracking-wider">PRIMARY GLASS</div>
                <div className="text-lg sm:text-xl font-bold text-slate-300 mt-0.5">XF 35mm f/1.4</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Fujifilm X-T5 Body</div>
              </div>
            </div>

            {/* Dual CTA Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#activities"
                onClick={onExploreCode}
                className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Explore Projects</span>
              </a>

              <a
                href="#gallery"
                onClick={onExploreLens}
                className={`px-5 py-3 rounded-lg border font-mono text-xs font-medium tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                  darkMode 
                    ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300 hover:text-white' 
                    : 'border-slate-300 bg-white hover:border-slate-400 text-slate-700 shadow-xs'
                }`}
              >
                <Camera className="w-4 h-4 text-amber-500" />
                <span>View Exhibition Frames</span>
              </a>

              <a
                href="/Academic_CV.pdf"
                download="Md_Zobaer_Ahmed_CV.pdf"
                className={`px-4 py-3 rounded-lg border font-mono text-xs font-medium tracking-wide transition-all flex items-center gap-2 ${
                  darkMode 
                    ? 'border-slate-800 bg-slate-900/40 hover:border-amber-500/50 text-slate-300 hover:text-amber-400' 
                    : 'border-slate-200 bg-white hover:border-amber-500/50 text-slate-700'
                }`}
                title="Download Academic & Professional CV"
              >
                <Download className="w-3.5 h-3.5 text-amber-500" />
                <span>Download CV</span>
              </a>
            </div>

          </div>

          {/* Right Column: Split Visual Anchor (Photograph + Floating Terminal) (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Photographic Canvas Frame with Viewfinder Reticle */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-950">
              
              {/* Photo View Switcher Pill (Portrait vs Exhibition Frame) */}
              <div className="absolute top-3 left-4 z-30 flex items-center p-0.5 rounded-lg border bg-black/70 backdrop-blur-md border-white/10 text-[10.5px] font-mono">
                <button
                  onClick={() => setActivePhotoView('portrait')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activePhotoView === 'portrait' 
                      ? 'bg-amber-500 text-slate-950 font-semibold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Portrait
                </button>
                <button
                  onClick={() => setActivePhotoView('street')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activePhotoView === 'street' 
                      ? 'bg-amber-500 text-slate-950 font-semibold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Exhibition Frame
                </button>
              </div>

              {/* Viewfinder Overlay Markers */}
              <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 opacity-75">
                <div className="flex justify-between items-start font-mono text-[10px] text-amber-400/80 tracking-widest pt-9">
                  <div className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 border-t-2 border-l-2 border-amber-400"></span>
                    <span>[+] FUJI X-T5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>EV 0.0</span>
                    <span className="inline-block w-2 h-2 border-t-2 border-r-2 border-amber-400"></span>
                  </div>
                </div>

                {/* Center crosshair */}
                <div className="self-center flex items-center justify-center text-amber-400/40 font-mono text-xs select-none">
                  +
                </div>

                <div className="flex justify-between items-end font-mono text-[10px] text-amber-400/80 tracking-widest">
                  <div className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 border-b-2 border-l-2 border-amber-400"></span>
                    <span>1/200s · f/1.4</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>ISO 200</span>
                    <span className="inline-block w-2 h-2 border-b-2 border-r-2 border-amber-400"></span>
                  </div>
                </div>
              </div>

              {/* Hero Image Viewport */}
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                {activePhotoView === 'street' ? (
                  <img
                    src="https://kwnnvkpelgficegjdqvt.supabase.co/storage/v1/object/public/portfolio-assets/Street_01.jpg"
                    alt="Street Story I in Dhaka by Md. Zobaer Ahmed"
                    className="w-full h-full object-cover grayscale contrast-125 filter transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                ) : (
                  <img
                    src="/profile.jpg"
                    alt="Portrait of Md. Zobaer Ahmed"
                    className="w-full h-full object-cover filter transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                )}
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/30 pointer-events-none"></div>
              </div>

              {/* Bottom Photo Metadata Monospace Bar */}
              <div className="absolute bottom-3 left-4 right-4 z-20 font-mono text-[10px] text-slate-300 flex items-center justify-between backdrop-blur-md bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Camera className="w-3 h-3" />
                  <span>
                    {activePhotoView === 'street' 
                      ? 'Street Story I · Fujinon XF 35mm' 
                      : 'Md. Zobaer Ahmed'}
                  </span>
                </span>
                <span className="text-slate-400">
                  {activePhotoView === 'street' ? 'Winner Exhibition' : 'UIU CSE'}
                </span>
              </div>
            </div>

            {/* Floating Minimalist Terminal Card Overlapping the Frame */}
            <div className="mt-4 lg:-mt-24 lg:ml-6 relative z-30 transform hover:-translate-y-1 transition-transform duration-300">
              <TerminalCard darkMode={darkMode} />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
