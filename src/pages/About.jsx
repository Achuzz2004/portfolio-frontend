import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import Loader from '../components/Loader'

export default function About() {
  const [profile, setProfile] = useState(null)
  useEffect(() => { api.getProfile().then(setProfile).catch(()=>{}) }, [])
  if (!profile) return <Loader />

  return (
    <div className="bg-white border rounded p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={profile.photo || '/assets/placeholder.jpg'} alt="profile" className="w-40 h-40 rounded object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="mt-3 text-slate-700">{profile.long_bio}</p>
          <div className="mt-4">
            <h4 className="font-semibold">Contact Info</h4>
            <p className="text-sm">Email: {profile.email}</p>
            <p className="text-sm">Phone: {profile.phone}</p>
            <p className="text-sm">Website: {profile.website}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
