import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/resume', label: 'Resume' },
  { to: '/gallery', label: 'Photos' },
  { to: '/blog', label: 'Blog' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="side-nav" id="sideNav">
      <div className="nav-brand">
        <span className="nav-name-mobile">Greg Thomas</span>
        <span className="nav-profile-desktop">
          <img
            className="profile-img"
            src="/images/killmonger.jpg"
            alt="Greg Thomas"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = '/images/profile-placeholder.svg'
            }}
          />
        </span>
      </div>

      <button
        className="nav-toggler"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span className="toggler-icon" />
      </button>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {navItems.map(({ to, label }) => (
          <li key={to} className="nav-item">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
