import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinning gradient circle */}
      <motion.div
        className="rounded-full h-12 w-12 border-4 border-t-transparent border-b-transparent border-purple-500 border-l-pink-500 border-r-yellow-500"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />

      {/* Loading text */}
      <motion.p
        className="mt-4 text-gray-700 font-medium"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
