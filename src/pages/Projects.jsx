import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then(data => setProjects(data.results || []))
      .catch(err => {
        console.error(err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const defaultImage = 'https://via.placeholder.com/300';

  return (
    /* Removed overflow-x issues by keeping width contained */
    <div className="w-full max-w-full overflow-x-hidden space-y-8 px-4 md:px-8 lg:px-16 py-12">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6 
                     bg-clip-text text-transparent 
                     bg-gradient-to-r from-purple-500 to-pink-500 
                     text-center">
        Projects
      </h2>

      {/* Empty State */}
      {projects.length === 0 ? (
        <div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-500 dark:text-gray-400 text-center 
                     bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                     p-6 rounded-xl shadow-md"
        >
          No projects available at the moment.
        </div>
      ) : (
        /* Grid Container */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <div
              key={p.id}
              /* REMOVED: x: -100 / 100 and scale: 0.95 */
              /* ADDED: Simple opacity and slight y-axis lift */
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                ease: 'easeOut', 
                delay: index * 0.1 
              }}
              /* The hover effect is kept as it happens within the card's bounds */
              className="hover:scale-105 transition-transform duration-500"
            >
              <ProjectCard
                project={{
                  title: p.title,
                  description: p.description,
                  technologies: p.technologies
                    ? p.technologies.split(',').map(t => t.trim()).filter(Boolean)
                    : [],
                  github: p.github_url || null,
                  demo: p.demo_url || null,
                  image: p.image || defaultImage,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
