import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5s
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300); // slight delay before unmounting
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-6xl font-bold tracking-tighter"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          MZA
        </span>
      </motion.div>
      
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
