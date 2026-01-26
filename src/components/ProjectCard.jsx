import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                 border rounded-2xl shadow-lg overflow-hidden
                 hover:shadow-2xl transition-all duration-500
                 flex flex-col h-full"
      whileHover={{ y: -8 }}
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

        {/* BUTTONS */}
        <div className="absolute bottom-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 text-xs rounded-lg 
                         bg-black/80 text-white backdrop-blur
                         hover:scale-105 transition"
            >
              GitHub
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 text-xs rounded-lg 
                         bg-gradient-to-r from-pink-500 to-purple-600 
                         text-white hover:scale-105 transition"
            >
              Demo
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <motion.p
          initial={false}
          animate={{ maxHeight: expanded ? 500 : 72 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed"
        >
          {project.description}
        </motion.p>

        {project.description?.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-pink-500 mt-1 self-start hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}

        {/* TECH STACK */}
        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full text-white
                         bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
