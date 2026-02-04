import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // Using Lucide for clean icons

export default function SkillStar({ skill }) {
  // Convert 0-100 to 0-5 scale
  const rating = skill.level / 20;

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/50 group">
      <div className="flex flex-col">
        <span className="text-sm font-medium tracking-tight text-slate-700 dark:text-slate-200 uppercase italic">
          {skill.name}
        </span>
      </div>

      <div className="flex gap-1.5">
        {[...Array(5)].map((_, i) => {
          const isFull = i + 1 <= Math.floor(rating);
          const isHalf = !isFull && i < rating;

          return (
            <div key={i} className="relative">
              {/* Background Star (The "Empty" slot) */}
              <Star className="w-4 h-4 text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700" />
              
              {/* Foreground Star (The "Filled" part) */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: isFull ? "100%" : isHalf ? "50%" : "0%" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <Star className="w-4 h-4 text-slate-900 dark:text-indigo-400 fill-slate-900 dark:fill-indigo-400" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
