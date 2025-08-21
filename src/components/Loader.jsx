import React from 'react'

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600" />
    </div>
  )
}
