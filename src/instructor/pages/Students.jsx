// src/instructor/pages/Students.jsx
import React, { useState } from "react"

export default function Students() {
  // demo state with dummy students
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", classes: 5 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", classes: 3 },
    { id: 3, name: "Carlos Rivera", email: "carlos@example.com", classes: 8 },
    { id: 4, name: "Diana Lee", email: "diana@example.com", classes: 2 },
  ])

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Students</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Classes Attended</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.classes}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeStudent(s.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No students enrolled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
