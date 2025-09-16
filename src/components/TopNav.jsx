// src/components/TopNav.jsx
import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function TopNav() {
  const links = [
    { to: "/classes", label: "Classes" },
    { to: "/schedule", label: "Schedule" },
    { to: "/instructor", label: "Instructor" }, // 👈 always visible
    { to: "/instructor/students", label: "Students" }, // 👈 added
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-bold text-xl text-leaf">
          Vibez Yoga
        </Link>
        <nav className="flex items-center gap-5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-leaf"
                    : "text-gray-600 hover:text-leaf"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
