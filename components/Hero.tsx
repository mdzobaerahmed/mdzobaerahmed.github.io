import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import resumeData from '../data/resume.json';

export default function Hero() {
  const { basics } = resumeData;

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Available for Internships
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          {basics.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl font-light text-slate-300 mb-8 max-w-3xl leading-relaxed"
        >
          {basics.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-slate-400 max-w-2xl text-base md:text-lg mb-12"
        >
          {basics.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={scrollToExperience}
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            View Experience
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 text-white border border-slate-700 rounded-full font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            Download Resume
            <Download className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-slate-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {basics.location}
          </div>
          <a href={`mailto:${basics.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
            {basics.email}
          </a>
          <a href={`tel:${basics.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
            {basics.phone}
          </a>
          {basics.links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              {link.name === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
              {link.name === 'GitHub' && <Github className="w-4 h-4" />}
              {link.name}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
