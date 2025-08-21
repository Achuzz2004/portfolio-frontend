import React from 'react'

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white border rounded overflow-hidden shadow-sm">
      <img src={project.image || '/assets/placeholder.jpg'} alt={project.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="text-sm text-slate-600 my-2">{project.description}</p>
        <div className="flex gap-3">
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-sm underline">GitHub</a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="text-sm underline">Demo</a>}
        </div>
      </div>
    </div>
  )
}
