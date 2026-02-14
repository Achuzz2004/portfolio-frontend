import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="
        bg-zinc-900/30 backdrop-blur-[2px]
        border border-white/5 rounded-xl overflow-hidden
        hover:border-red-600/30 hover:translate-y-[-4px]
        transition-all duration-500
        flex flex-col h-full
      "
      whileHover={{ y: -6 }}
    >
      {/* IMAGE SECTION */}
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-zinc-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay at bottom for text */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title with red theme */}
        <h3 className="font-black text-lg sm:text-xl text-white uppercase italic tracking-tighter mb-2 group-hover:text-red-500 transition-colors">
          {project.title}
        </h3>

        {/* DESCRIPTION with Read More */}
        <div className="mb-4">
          <motion.p
            initial={false}
            animate={{ height: expanded ? 'auto' : '4.5rem' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden text-xs sm:text-sm text-zinc-400 leading-relaxed"
          >
            {project.description}
          </motion.p>

          {project.description?.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[10px] font-mono text-red-500/70 hover:text-red-500 mt-1 transition-colors uppercase tracking-wider"
            >
              {expanded ? (
                <>Read Less <FaChevronUp size={8} /></>
              ) : (
                <>Read More <FaChevronDown size={8} /></>
              )}
            </button>
          )}
        </div>

        {/* TECH STACK with gradient red */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="
                  text-[8px] font-bold tracking-widest uppercase 
                  px-2 py-1 rounded-full 
                  bg-gradient-to-r from-red-600/20 to-red-600/5 
                  text-red-400 border border-red-600/20
                "
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* PROMINENT ACTION BUTTONS - Always visible */}
        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/5">
          {(project.github || project.demo) ? (
            <div className="flex items-center gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-red-600 border border-white/10 hover:border-red-600 rounded-lg transition-all duration-300"
                >
                  <FaGithub size={16} className="text-white" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">GitHub</span>
                </motion.a>
              )}
              
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 border border-red-500 rounded-lg transition-all duration-300 shadow-lg shadow-red-600/30"
                >
                  <FaExternalLinkAlt size={14} className="text-white" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">Live Demo</span>
                </motion.a>
              )}
            </div>
          ) : (
            <div className="text-center py-2">
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-wider">
                No links available
              </span>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-red-600/30 transition-all duration-1000" />
      </div>
    </motion.div>
  );
}