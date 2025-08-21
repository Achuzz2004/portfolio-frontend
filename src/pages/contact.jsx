import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import Loader from '../components/Loader'

export default function Contact() {
  const [contact, setContact] = useState(null)

  useEffect(() => { api.getContact().then(setContact).catch(()=>{}) }, [])

  if (!contact) return <Loader />

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border rounded p-6">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-2">Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Location: {contact.location}</p>
        <div className="mt-3">
          {contact.social?.map(s => (
            <div key={s.platform}><a href={s.url} target="_blank" rel="noreferrer" className="underline">{s.platform}</a></div>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded p-6">
        <h3 className="font-semibold">Message</h3>
        <p className="text-sm text-slate-600">If you want, link this to a contact form endpoint on your backend.</p>
        <div className="mt-4 text-sm">
          Email: <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>
        </div>
      </div>
    </div>
  )
}
