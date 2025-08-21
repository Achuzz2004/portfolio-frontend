import React from "react";
import { motion } from "framer-motion";

export default function SkillBar({ skill }) {
  return (
    <div className="mb-6">
      {/* Skill Name and Level */}
      <div className="flex justify-between mb-1">
        <div className="font-medium text-gray-800 dark:text-gray-200">
          {skill.name}
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {skill.level}%
        </div>
      </div>

      {/* Skill Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 overflow-hidden relative">
        <motion.div
          className="h-full rounded bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg shadow-purple-400/50"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        />

        {/* Glow animation overlay */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded bg-white/20"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "40%" }}
        />
      </div>
    </div>
  );
}
