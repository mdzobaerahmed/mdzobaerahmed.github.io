import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import resumeData from '../data/resume.json';

export default function Extra() {
  const { extra } = resumeData;

  return (
    <section id="extra" className="py-24 px-6 relative z-10 bg-slate-950/50 border-t border-slate-900">
      <div className="max-w-4xl mx-auto">
        {extra.map((section, index) => (
          <div key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{section.category}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, i) => {
                const [name, role, email] = item.split(' — ');
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 transition-colors backdrop-blur-sm flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
                    <p className="text-sm text-slate-400 mb-3">{role}</p>
                    {email && (
                      <a href={`mailto:${email}`} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                        {email}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
