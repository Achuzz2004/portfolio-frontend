import React from 'react'

export default function TimelineCard({ item }) {
  return (
    <div className="border rounded p-4 bg-white mb-4">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{item.title}</div>
          <div className="text-sm text-slate-500">{item.subtitle}</div>
        </div>
        <div className="text-sm text-slate-500">{item.from} • {item.to || 'Present'}</div>
      </div>
      {item.description && <p className="mt-3 text-sm text-slate-700">{item.description}</p>}
    </div>
  )
}
