// src/instructor/components/ProtectedInstructorRoute.jsx
import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useInstructor } from "@/instructor/hooks/useInstructor"  // <-- named import

export default function ProtectedInstructorRoute() {
  const { isInstructor, loading } = useInstructor()

  if (loading) return <div>Loading…</div>
  if (!isInstructor) return <Navigate to="/" replace />

  return <Outlet />
}
