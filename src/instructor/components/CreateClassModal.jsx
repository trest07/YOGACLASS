import React from "react"

export default function CreateClassModal({ open, onClose, onCreate }) {
  const [title, setTitle] = React.useState("")
  const [level, setLevel] = React.useState("Beginner")
  const [instructor, setInstructor] = React.useState("Ana")
  const [price, setPrice] = React.useState(0)
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("09:00")

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    onCreate({ id: crypto.randomUUID(), title, level, instructor, price: Number(price), date, time })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Create Class</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={submit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
                   value={title} onChange={(e)=>setTitle(e.target.value)} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
                    value={level} onChange={(e)=>setLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>All Levels</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
                   value={instructor} onChange={(e)=>setInstructor(e.target.value)} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input type="number" min="0" step="1"
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
                   value={price} onChange={(e)=>setPrice(e.target.value)} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date"
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
                   value={date} onChange={(e)=>setDate(e.target.value)} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input type="time"
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
                   value={time} onChange={(e)=>setTime(e.target.value)} required/>
          </div>

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancel</button>
            <button type="submit"
                    className="px-4 py-2 rounded-lg bg-leaf text-white font-semibold">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}
