import React from "react";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

// We receive 'projects' directly from App.jsx now
export default function Projects({ projects }) {
  
  // If no projects, we still want a clean section that doesn't break the layout
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="relative w-full py-16 lg:py-24 bg-transparent">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto px-4 text-center"
        >
          <div className="inline-block p-6 border border-dashed border-zinc-800 rounded-lg">
            <p className="text-zinc-600 font-mono text-xs tracking-widest">
              [ NO_PROJECTS_FOUND_IN_DATABASE ]
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative w-full py-16 lg:py-24 bg-transparent overflow-hidden">
      {/* Subtle background gradient - matching other sections */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.03),transparent_70%)] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header - Matching About, Skills, Experience, Education */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 lg:mb-20 text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-3 md:mb-4">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-red-600"
            />
            <span className="text-red-600 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">
              Portfolio
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-[1.1]">
            Featured <span className="text-red-600 relative">
              Deployments
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600/30 origin-left"
              />
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl mx-auto lg:mx-0 mt-4">
            A collection of my latest work and personal projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {projects.map((p, index) => (
            <motion.div
              key={p.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full group"
            >
              <div className="h-full transition-transform duration-500 group-hover:translate-y-[-4px]">
                <ProjectCard
                  project={{
                    title: p.title,
                    description: p.description,
                    image: p.image || "https://via.placeholder.com/600x400/18181b/dc2626",
                    github: p.github || p.github_url || "",
                    demo: p.demo || p.demo_url || "",
                    technologies: p.technologies
                      ? (typeof p.technologies === 'string' ? p.technologies.split(",") : p.technologies)
                      : [],
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating counter - matching other sections */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="hidden xl:block fixed bottom-8 right-8 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em] rotate-90 origin-bottom-right"
        >
          {projects.length} PROJECTS
        </motion.div>
      </div>
    </section>
  );
}