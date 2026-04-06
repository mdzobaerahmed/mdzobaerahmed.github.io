/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import AnimatedBackground from './components/AnimatedBackground';
import Splash from './components/Splash';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Extra from './components/Extra';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      <AnimatePresence mode="wait">
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <AnimatedBackground />
          <Navigation />
          <main className="relative">
            <Hero />
            <Experience />
            <Achievements />
            <Education />
            <Skills />
            <Certifications />
            <Extra />
          </main>
          <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-900 bg-slate-950/50 backdrop-blur-sm relative z-10">
            <p>© {new Date().getFullYear()} MD. ZOBAER AHMED. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

