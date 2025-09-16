// src/screens/YogaHome.jsx
import React from "react"
import { Link } from "react-router-dom"
import ClassCard from "../components/ClassCard.jsx"

export default function YogaHome() {
  const featured = [
    { title: "Morning Flow", level: "Beginner", instructor: "Ana", price: 0 },
  ]

  const classes = [
    { title: "Power Yoga", level: "Intermediate", instructor: "Luis", price: 12 },
    { title: "Yin Relaxation", level: "All Levels", instructor: "Marta", price: 8 },
    { title: "Sunset Stretch", level: "Beginner", instructor: "Clara", price: 10 },
  ]

  return (
    <section className="space-y-10">
      {/* Hero banner */}
      <div className="rounded-2xl p-6 sm:p-8 text-white bg-gradient-to-r from-leaf to-green-600 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome to Vibez Yoga 🌿</h1>
        <p className="opacity-90">
          Find your balance, relax, and book your next class with us.
        </p>
      </div>

      {/* Featured class */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-leaf">🌟 Featured</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c, i) => (
            <ClassCard key={i} {...c} />
          ))}
        </div>
      </div>

      {/* All classes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-leaf">All Classes</h2>
          <Link
            to="/classes"
            className="text-sm font-medium text-leaf hover:underline"
          >
            Browse all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c, i) => (
            <ClassCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
