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
    /* w-full and overflow-x-hidden on the section level */
    <div className="w-full overflow-x-hidden space-y-8 px-4 md:px-8 lg:px-16 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 
                     bg-clip-text text-transparent 
                     bg-gradient-to-r from-purple-500 to-pink-500 
                     text-center">
        Projects
      </h2>

      {projects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-500 dark:text-gray-400 text-center 
                     bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                     p-6 rounded-xl shadow-md"
        >
          No projects available at the moment.
        </motion.div>
      ) : (
        /* The Wrapper: This is the key to stopping the scrollbar during animation */
        <div className="w-full overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, index) => (
              <motion.div
                key={p.id}
                /* Use a smaller x offset (20) so it doesn't "leak" out of the screen */
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
