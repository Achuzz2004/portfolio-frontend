import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const links = [
    ['Home','/'],
    ['About','/about'],
    ['Skills','/skills'],
    ['Education','/education'],
    ['Experience','/experience'],
    ['Projects','/projects'],
    ['Contact','/contact'],
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container-max mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">MyPortfolio</Link>
        <nav className="hidden md:flex space-x-4">
          {links.map(([label,to]) => (
            <NavLink key={to} to={to} className={({isActive}) => isActive ? 'text-sky-600 font-medium' : 'text-slate-700'}>{label}</NavLink>
          ))}
        </nav>
        <MobileMenu links={links} />
      </div>
    </header>
  )
}

function MobileMenu({links}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="md:hidden relative">
      <button onClick={() => setOpen(v=>!v)} className="p-2 border rounded">☰</button>
      {open && (
        <div className="absolute right-0 mt-2 py-2 px-4 bg-white border rounded shadow">
          {links.map(([label,to]) => <div key={to} className="py-1"><NavLink to={to} onClick={()=>setOpen(false)}>{label}</NavLink></div>)}
        </div>
      )}
    </div>
  )
}

export default Navbar
