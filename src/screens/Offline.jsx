import React from "react"
import { Link } from "react-router-dom"

export default function Offline() {
  return (
    <div className="text-center space-y-3">
      <h1 className="text-2xl font-semibold">You’re Offline</h1>
      <p className="text-white/70">No internet connection. You can still open installed pages.</p>
      <div>
        <Link to="/" className="underline text-white/80">Go Home</Link>
      </div>
    </div>
  )
}
