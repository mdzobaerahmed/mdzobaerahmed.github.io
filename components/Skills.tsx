import React from 'react';
import { motion } from 'motion/react';
import resumeData from '../data/resume.json';

export default function Skills() {
  const { skills } = resumeData;

  return (
    <section id="skills" className="py-24 px-6 relative z-10 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 backdrop-blur-sm transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-mono">
                  0{index + 1}
                </span>
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-slate-800/80 text-slate-300 text-sm font-medium border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
