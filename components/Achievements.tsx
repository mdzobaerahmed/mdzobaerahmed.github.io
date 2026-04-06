import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Star, Medal } from 'lucide-react';
import resumeData from '../data/resume.json';

export default function Achievements() {
  const { achievements } = resumeData;

  const getIcon = (index: number) => {
    const icons = [Trophy, Award, Star, Medal];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6 text-yellow-400" />;
  };

  return (
    <section id="achievements" className="py-24 px-6 relative z-10 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Awards & Achievements</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-yellow-500/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(index)}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {achievement.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {achievement.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
