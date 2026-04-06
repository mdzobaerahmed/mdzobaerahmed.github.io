import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import resumeData from '../data/resume.json';

export default function Certifications() {
  const { certifications } = resumeData;

  return (
    <section id="certifications" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Certifications</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-orange-500/30 transition-colors backdrop-blur-sm"
            >
              <CheckCircle2 className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
              <span className="text-slate-300 font-medium leading-relaxed">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
