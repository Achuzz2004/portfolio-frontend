import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineCard({ item }) {
  return (
    <motion.div
      className="relative border-l-4 border-purple-400 pl-6 mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Timeline Dot */}
      <span className="absolute -left-3 top-2 w-6 h-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full border-2 border-white shadow-lg dark:border-gray-800"></span>

      {/* Card Content */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 
                      dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
                      rounded-xl shadow-md p-4 
                      hover:scale-105 transition-transform duration-300">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {item.start} • {item.end || 'Present'}
          </div>
        </div>
        {item.description && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
