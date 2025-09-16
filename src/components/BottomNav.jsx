// src/components/BottomNav.jsx
import React from "react"
import { NavLink } from "react-router-dom"

const Icon = ({ d }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
)

function Badge({ count }) {
  if (!count || Number(count) <= 0) return null
  return (
    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] leading-[18px] text-center">
      {Number(count) > 99 ? "99+" : String(count)}
    </span>
  )
}

const Tab = ({ to, label, icon, badgeCount }) => (
  <NavLink
    to={to}
    end={to === "/"}
    className={({ isActive }) =>
      [
        "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition",
        isActive ? "text-leaf bg-leaf/10" : "text-gray-600 hover:text-leaf",
      ].join(" ")
    }
  >
    <div className="relative">
      <Icon d={icon} />
      <Badge count={badgeCount} />
    </div>
    <span className="text-xs font-medium">{label}</span>
  </NavLink>
)

export default function BottomNav() {
  // Optional: read unread counts from localStorage (no backend required)
  let unreadAlerts = 0
  let unreadChat = 0
  if (typeof window !== "undefined") {
    unreadAlerts = Number(window.localStorage.getItem("unread_alerts") || 0)
    unreadChat = Number(window.localStorage.getItem("unread_chat") || 0)
  }

  return (
    <nav
      className="fixed left-0 right-0 bottom-0 z-40 p-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-4 rounded-2xl border border-gray-200 bg-white shadow-lg px-2 py-2 grid grid-cols-6">
          <Tab to="/"              label="Home"         icon="M3 10.5 12 3l9 7.5M5 10v10h14V10" />
          <Tab to="/classes"       label="Classes"      icon="M4 19V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12M8 5v14M16 5v14" />
          <Tab to="/schedule"      label="Schedule"     icon="M3 4h18v18H3zM8 2v4M16 2v4M3 10h18" />
          <Tab to="/notifications" label="Alerts"       icon="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" badgeCount={unreadAlerts} />
          <Tab to="/chat"          label="Chat"         icon="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" badgeCount={unreadChat} />
          <Tab to="/settings"      label="Settings"     icon="M12 15a3 3 0 1 0 0-6m9 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
        </div>
      </div>
    </nav>
  )
}
