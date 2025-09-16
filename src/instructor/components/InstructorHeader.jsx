// src/instructor/components/InstructorHeader.jsx
import React from "react"

function getInitials(name) {
  const n = (name ?? "").trim()
  if (!n) return "IN" // fallback initials
  const parts = n.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const second = parts[1]?.[0] ?? ""
  const initials = (first + second).toUpperCase()
  return initials || "IN"
}

function Avatar({ name, imageUrl, size = 48 }) {
  const initials = getInitials(name)
  const dim = `${size}px`
  return (
    <div
      className="rounded-full bg-leaf/10 text-leaf flex items-center justify-center overflow-hidden"
      style={{ width: dim, height: dim }}
      aria-label={name || "Instructor"}
      title={name || "Instructor"}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name || "Instructor"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none"
            // fallback to initials stays visible
          }}
        />
      ) : (
        <span className="font-semibold" style={{ fontSize: size > 40 ? 16 : 12 }}>
          {initials}
        </span>
      )}
    </div>
  )
}

export default function InstructorHeader({
  name,
  subtitle,
  imageUrl,
  stats = [],
}) {
  const safeName = name ?? "Instructor"
  const safeSubtitle = subtitle ?? "Manage your classes, students, and earnings"

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Avatar name={safeName} imageUrl={imageUrl} size={56} />

        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 truncate">
            {safeName}
          </h1>
          <p className="text-sm text-gray-600 truncate">{safeSubtitle}</p>
        </div>
      </div>

      {Array.isArray(stats) && stats.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center"
            >
              <div className="text-lg font-semibold text-gray-900">
                {s.value ?? "--"}
              </div>
              <div className="text-xs text-gray-500">{s.label ?? ""}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
