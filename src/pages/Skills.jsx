import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function SkillItem({ name, level, tags, index }) {
  // Convert 0-100 level to star rating (5 stars max)
  const starRating = level / 20; // 0-5 scale

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col py-6 border-b border-white/5 hover:border-red-600/30 transition-colors duration-500"
    >
      <div className="flex justify-between items-end mb-3">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold block">
            Skill_Node
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-red-500 transition-colors">
            {name}
          </h3>
        </div>
        
        {/* Star Rating - Replaced percentage */}
        <div className="flex gap-0.5 items-center">
          {[...Array(5)].map((_, i) => {
            const isFull = i + 1 <= Math.floor(starRating);
            const isHalf = !isFull && i < starRating;

            return (
              <div key={i} className="relative w-3.5 h-3.5 sm:w-4 sm:h-4">
                <Star className="absolute inset-0 w-full h-full text-zinc-700 fill-transparent" strokeWidth={1.5} />
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: isFull ? "100%" : isHalf ? "50%" : "0%" }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500" strokeWidth={1.5} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Minimalist Progress Bar */}
      <div className="relative h-[2px] w-full bg-zinc-800/50 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        />
      </div>

      {/* Clean Tag System */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5 group-hover:border-red-600/20 group-hover:text-zinc-300 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="relative w-full py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-px w-8 bg-red-600" />
            <span className="text-red-600 font-mono text-xs uppercase tracking-[0.4em] font-bold">
              Capabilities
            </span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-white italic tracking-tighter uppercase drop-shadow-2xl">
            Technical <span className="text-red-600">Arsenal</span>
          </h2>
        </div>

        {/* Responsive Grid with increased gap for big screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 xl:gap-x-24 gap-y-4">
          {skills.map((s, index) => (
            <SkillItem 
              key={s.id || index} 
              name={s.name} 
              level={s.level} 
              tags={s.tags} 
              index={index}
            />
          ))}
        </div>

        {/* Center gap note - subtle hint */}
        <div className="text-center mt-8 md:hidden">
          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-700 font-mono">
            scroll for more
          </span>
        </div>
      </div>
    </section>
  );
}