import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import ProjectCard from '../components/ProjectCard';

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

  const defaultImage = 'https://via.placeholder.com/300';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 px-4 md:px-8 lg:px-16 py-16">
      {/* Modern Minimalist Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Featured Projects
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
      </div>

      {loading ? (
        /* Clean Skeleton Grid while backend is loading */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        /* Minimalist Empty State */
        <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No projects found. Check back later!
          </p>
        </div>
      ) : (
        /* Professional Grid without horizontal motion */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group transform transition-all duration-300 hover:-translate-y-2"
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
