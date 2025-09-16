import React, { useState } from "react"
import CreateClassModal from "@/instructor/components/CreateClassModal"

export default function Classes() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Classes</h2>
        <button className="px-3 py-2 rounded-lg bg-leaf text-white" onClick={() => setOpen(true)}>
          New Class
        </button>
      </div>
      {/* TODO: render class list */}
      <CreateClassModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
