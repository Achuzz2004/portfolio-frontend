import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import TimelineCard from '../components/TimelineCard'
import Loader from '../components/Loader'

export default function Experience() {
  const [exp, setExp] = useState([])

  useEffect(() => { api.getExperience().then(setExp).catch(()=>{}) }, [])

  if (!exp.length) return <Loader />

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>
      <div>
        {exp.map(e => <TimelineCard key={e.id} item={e} />)}
      </div>
    </div>
  )
}
