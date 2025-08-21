import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import Loader from '../components/Loader';
import { motion, useAnimation } from 'framer-motion';

function AnimatedSkillBar({ name, level }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: `${level}%`,
      transition: { duration: 1.2, ease: "easeOut" }
    });
  }, [controls, level]);

  return (
    <div className="mb-4">
      {/* Label */}
      <div className="flex justify-between mb-1">
        <span className="font-semibold">{name}</span>
        <span className="text-xs font-mono">{level}%</span>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 overflow-hidden" aria-label={`${name} proficiency`}>
        <motion.div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSkills()
      .then(data => setSkills(data.results || []))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-10 px-4 md:px-8 lg:px-16 py-12">
      <h2 className="text-4xl font-bold mb-6 text-center 
                     bg-clip-text text-transparent 
                     bg-gradient-to-r from-pink-500 to-purple-500">
        Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No skills added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((s, index) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 
                         dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                         border rounded-2xl shadow-xl p-6 
                         hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <AnimatedSkillBar name={s.name} level={s.level} />

              {/* Tags */}
              {s.tags && s.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 text-xs rounded-full 
                                 bg-pink-100 text-pink-700 
                                 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
