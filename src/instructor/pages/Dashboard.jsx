import React from "react"
import InstructorHeader from "@/instructor/components/InstructorHeader.jsx"

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-leaf">{value}</div>
      {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
    </div>
  )
}

export default function InstructorDashboard() {
  const upcoming = [
    { id: "1", title: "Morning Flow", level: "Beginner", date: "2025-09-12", time: "09:00", spots: 12, booked: 9 },
    { id: "2", title: "Power Yoga", level: "Intermediate", date: "2025-09-12", time: "18:00", spots: 15, booked: 11 },
    { id: "3", title: "Yin Relaxation", level: "All Levels", date: "2025-09-13", time: "20:00", spots: 20, booked: 7 },
  ]
  const totalStudents = upcoming.reduce((a,c)=>a + c.booked, 0)
  const classesCount  = upcoming.length
  const fillRate = Math.round(
    100 * (upcoming.reduce((a,c)=>a+c.booked,0)) / (upcoming.reduce((a,c)=>a+c.spots,0) || 1)
  )

  return (
    <section className="space-y-8">
      {/* Instructor identity (name + email) */}
      <InstructorHeader />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Upcoming Classes" value={classesCount} />
        <StatCard label="Total Booked" value={totalStudents} />
        <StatCard label="Avg. Fill Rate" value={`${fillRate}%`} />
        <StatCard label="Est. Earnings" value="$—" sub="(wire later)" />
      </div>

      {/* Upcoming table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-800">Upcoming Classes</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Level</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Booked</th>
                <th className="px-4 py-2 text-left">Capacity</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((c) => (
                <tr key={c.id} className="border-t border-gray-100">
                  <td className="px-4 py-2">{c.title}</td>
                  <td className="px-4 py-2">{c.level}</td>
                  <td className="px-4 py-2">{c.date}</td>
                  <td className="px-4 py-2">{c.time}</td>
                  <td className="px-4 py-2">{c.booked}</td>
                  <td className="px-4 py-2">{c.spots}</td>
                  <td className="px-4 py-2">
                    <button className="text-red-600 hover:underline mr-3">Cancel</button>
                    <button className="text-leaf hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
              {upcoming.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No classes scheduled.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent students (placeholder) */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="font-semibold text-gray-800 mb-3">Recent Students</div>
        <ul className="text-sm text-gray-700 grid sm:grid-cols-2 gap-y-2">
          <li>• Alex Johnson — Power Yoga</li>
          <li>• Mira Patel — Morning Flow</li>
          <li>• Daniel Kim — Yin Relaxation</li>
          <li>• Sofia Lopez — Morning Flow</li>
        </ul>
      </div>
    </section>
  )
}
