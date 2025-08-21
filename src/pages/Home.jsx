import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import Loader from '../components/Loader'

export default function Home() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProfile().then(setProfile).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <div className="col-span-1 bg-white border rounded p-6 text-center">
        <img src={profile?.photo || '/assets/placeholder.jpg'} alt="profile" className="w-36 h-36 rounded-full mx-auto object-cover" />
        <h1 className="mt-4 text-2xl font-bold">{profile?.name}</h1>
        <p className="mt-2 text-slate-600">{profile?.short_bio}</p>
        <div className="mt-4 flex justify-center gap-3">
          {profile?.social?.map(s => (
            <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="text-sm underline">{s.platform}</a>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white border rounded p-6">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-2 text-slate-700">{profile?.long_bio}</p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm mt-2">Email: {profile?.email}</p>
            <p className="text-sm">Phone: {profile?.phone}</p>
          </div>
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold">Location</h3>
            <p className="text-sm mt-2">{profile?.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
