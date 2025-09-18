import React from "react"
import InstructorHeader from "@/instructor/components/InstructorHeader"
import { Outlet } from "react-router-dom"

export default function InstructorLayout() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
