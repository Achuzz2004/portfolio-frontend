import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function SkillStars({ name, level, tags }) {
  const rating = level / 20;

  return (
    <div className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-900/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold tracking-tight text-gray-800 dark:text-gray-100">
          {name}
        </span>

        {/* Star Container */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => {
            const isFull = i + 1 <= Math.floor(rating);
            const isHalf = !isFull && i < rating;

            return (
              <div key={i} className="relative w-4 h-4">
                <Star className="absolute inset-0 w-full h-full text-gray-200 dark:text-gray-700 fill-gray-100 dark:fill-gray-800" strokeWidth={1} />
                
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: isFull ? "100%" : isHalf ? "50%" : "0%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  {/* Matching the pink-purple-blue theme */}
                  <Star className="w-4 h-4 text-purple-500 fill-purple-500" strokeWidth={1} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Themed Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
            <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-800/30">
              {tag}
            </span>
          ))}
        </div>
      )}
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
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Skills & Mastery
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
          A quantitative breakdown of my technical toolkit and proficiency levels.
        </p>
      </div>

      {skills.length === 0 ? (
        <p className="text-center text-gray-400">No skills found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, index) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <SkillStars name={s.name} level={s.level} tags={s.tags} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
