// src/screens/Notifications.jsx
import React, { useEffect, useState } from "react"

function NotificationItem({ n }) {
  return (
    <div className="flex gap-3 p-3 border-b border-gray-100">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
        🔔
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{n.title}</div>
        <div className="text-sm text-gray-600">{n.body}</div>
        <div className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</div>
      </div>
    </div>
  )
}

export default function Notifications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now; replace with Supabase later
    const demo = [
      { id: "n1", title: "New class booked", body: "A student booked Morning Flow.", created_at: Date.now() - 3600_000 },
      { id: "n2", title: "Payment received", body: "You received a $20 payment.", created_at: Date.now() - 7200_000 },
      { id: "n3", title: "Schedule update", body: "Power Yoga moved to 6:30 PM.", created_at: Date.now() - 10800_000 },
    ]
    setItems(demo)
    setLoading(false)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <h1 className="text-xl font-semibold mb-3">Alerts</h1>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No alerts yet.</div>
        ) : (
          items.map(n => <NotificationItem key={n.id} n={n} />)
        )}
      </div>
    </div>
  )
}
