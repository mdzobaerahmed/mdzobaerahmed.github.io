import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, ChevronDown, MapPin } from 'lucide-react';
import resumeData from '../data/resume.json';

export default function Experience() {
  const { experience } = resumeData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Experience</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {experience.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'bg-slate-900/80 border-slate-700 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                } backdrop-blur-md`}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.dates}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full bg-slate-800/50 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && exp.bullets.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                        <div className="w-full h-px bg-slate-800 mb-6" />
                        <ul className="space-y-3">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
