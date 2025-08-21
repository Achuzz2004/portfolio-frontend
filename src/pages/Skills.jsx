import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import SkillBar from '../components/SkillBar'
import Loader from '../components/Loader'

export default function Skills() {
  const [skills, setSkills] = useState([])

  useEffect(() => { api.getSkills().then(setSkills).catch(()=>{}) }, [])

  if (!skills.length) return <Loader />

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map(s => (
          <div key={s.id} className="bg-white border rounded p-4">
            <SkillBar skill={{ name: s.name, level: s.level }} />
            {s.tags && <div className="mt-2 text-xs text-slate-500">{s.tags.join(' • ')}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
