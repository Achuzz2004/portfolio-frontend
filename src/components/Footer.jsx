import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container-max mx-auto px-4 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} MyPortfolio
      </div>
    </footer>
  )
}
