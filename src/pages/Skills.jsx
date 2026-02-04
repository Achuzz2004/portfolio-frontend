import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react'; // Recommended: npm install lucide-react

function SkillStars({ name, level, tags }) {
  // Normalize 0-100 to 0-5
  const rating = level / 20;

  return (
    <div className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase italic">
          {name}
        </span>
        
        {/* Star Container */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => {
            const isFull = i + 1 <= Math.floor(rating);
            const isHalf = !isFull && i < rating;

            return (
              <div key={i} className="relative w-4 h-4">
                {/* Background (Empty Star) */}
                <Star className="absolute inset-0 w-full h-full text-slate-200 dark:text-slate-700 fill-slate-100 dark:fill-slate-800" strokeWidth={1.5} />
                
                {/* Fill (Animated) */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: isFull ? "100%" : isHalf ? "50%" : "0%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Star className="w-4 h-4 text-indigo-500 dark:text-indigo-400 fill-indigo-500 dark:fill-indigo-400" strokeWidth={1.5} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Minimalist Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
              #{tag}
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
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl font-light tracking-tighter text-slate-900 dark:text-white sm:text-5xl">
          Technical <span className="font-serif italic font-normal">Expertise</span>
        </h2>
        <div className="h-1 w-12 bg-indigo-500 mt-4 rounded-full" />
      </div>

      {skills.length === 0 ? (
        <p className="text-center text-slate-400 font-mono italic">List currently empty_</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, index) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <SkillStars name={s.name} level={s.level} tags={s.tags} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
