import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                 border rounded-2xl shadow-lg overflow-hidden 
                 hover:shadow-2xl transition-transform duration-500"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <motion.img
          src={project.image || "/assets/placeholder.jpg"}
          alt={project.title}
          className="w-full h-52 object-cover transform transition duration-500 hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />

        {/* GitHub & Demo Buttons */}
        <div className="absolute bottom-3 right-3 flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-700 shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              GitHub
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-lg shadow hover:opacity-90"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="p-5">
        <h3 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className="text-xs px-3 py-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full font-medium shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
