import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import ProjectCard from '../components/ProjectCard'
import Loader from '../components/Loader'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => { api.getProjects().then(setProjects).catch(()=>{}) }, [])

  if (!projects.length) return <Loader />

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
