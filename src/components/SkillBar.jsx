import React from 'react'

export default function SkillBar({ skill }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <div className="font-medium">{skill.name}</div>
        <div className="text-xs text-slate-500">{skill.level}%</div>
      </div>
      <div className="w-full bg-slate-200 rounded h-3 overflow-hidden">
        <div className="h-full bg-sky-500" style={{ width: `${skill.level}%` }} />
      </div>
    </div>
  )
}
