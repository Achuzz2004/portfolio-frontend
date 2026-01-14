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

  return (
    /* Added overflow-hidden and w-full */
    <div className="w-full overflow-hidden space-y-8 px-4 md:px-8 lg:px-16 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Projects
      </h2>

      {projects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-500 dark:text-gray-400 text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-md"
        >
          No projects available at the moment.
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <motion.div
              key={p.id}
              /* Reducing x offset slightly to prevent extreme overflow */
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="hover:scale-105 transition-transform duration-500"
            >
              <ProjectCard
                project={{
                  ...p,
                  technologies: p.technologies ? p.technologies.split(',').map(t => t.trim()) : [],
                  image: p.image || 'https://via.placeholder.com/300',
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
