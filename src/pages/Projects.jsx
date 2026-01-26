import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProjects()
      .then((data) => setProjects(data?.results || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="w-full overflow-hidden px-3 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 sm:py-14">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center 
                     bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Projects
      </h2>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg text-center text-gray-500 dark:text-gray-400 
                     bg-gradient-to-r from-gray-50 to-gray-100 
                     dark:from-gray-800 dark:to-gray-900 
                     p-5 sm:p-6 rounded-xl shadow-md"
        >
          No projects available at the moment.
        </motion.div>
      ) : (
        <div
          className="
            grid gap-6 sm:gap-8
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            auto-rows-fr
          "
        >
          {projects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="h-full"
            >
              <ProjectCard
                project={{
                  title: p.title,
                  description: p.description,
                  image: p.image || "https://via.placeholder.com/600x400",
                  github: p.github || p.github_url || "",
                  demo: p.demo || p.demo_url || "",
                  technologies: p.technologies
                    ? p.technologies.split(",").map((t) => t.trim())
                    : [],
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
