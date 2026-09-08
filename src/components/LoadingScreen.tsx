import React from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bm-background z-[100] flex flex-col items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-bm-primary-accent mb-6 bg-white p-6 rounded-full shadow-2xl border border-bm-border"
      >
        <Flame size={64} fill="currentColor" />
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-heading font-extrabold text-bm-dark-accent"
      >
        Preparando a mesa...
      </motion.h2>
    </div>
  );
}
