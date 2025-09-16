import React from "react"

export default function ClassCard({ title, level, instructor, price }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4 flex flex-col gap-3 shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="text-sm text-gray-600">Level: {level}</p>
      <p className="text-sm text-gray-600">Instructor: {instructor}</p>
      <p className="text-leaf font-bold">{price > 0 ? `$${price}` : "Free"}</p>

      <button className="mt-2 py-2 px-3 rounded-lg bg-leaf hover:bg-leaf/90 text-white font-semibold shadow-md transition-colors">
        Enroll
      </button>
    </div>
  )
}
