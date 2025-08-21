import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import TimelineCard from '../components/TimelineCard'
import Loader from '../components/Loader'

export default function Education() {
  const [edu, setEdu] = useState([])

  useEffect(() => { api.getEducation().then(setEdu).catch(()=>{}) }, [])

  if (!edu.length) return <Loader />

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      <div>
        {edu.map(e => <TimelineCard key={e.id} item={e} />)}
      </div>
    </div>
  )
}
