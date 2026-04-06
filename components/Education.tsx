import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin } from 'lucide-react';
import resumeData from '../data/resume.json';

export default function Education() {
  const { education } = resumeData;

  return (
    <section id="education" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Education</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full" />
        </motion.div>

        <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
              
              <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-2xl hover:border-purple-500/30 transition-colors backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {edu.institution}
                    </h3>
                    <p className="text-lg text-purple-300 font-medium">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm font-medium mb-2">
                      {edu.dates}
                    </span>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400 md:justify-end">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
