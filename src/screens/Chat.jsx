// src/screens/Chat.jsx
import React, { useEffect, useMemo, useState } from "react"

function ThreadItem({ t, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left p-3 border-b border-gray-100 hover:bg-gray-50 transition",
        active ? "bg-leaf/10" : ""
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-900">{t.name}</div>
        <div className="text-xs text-gray-400">{new Date(t.updated_at).toLocaleTimeString()}</div>
      </div>
      <div className="text-sm text-gray-600 line-clamp-1">{t.last_message}</div>
    </button>
  )
}

function Message({ m }) {
  const mine = m.author === "me"
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] rounded-2xl px-4 py-2 my-1 ${mine ? "bg-leaf text-white" : "bg-gray-100 text-gray-900"}`}>
        <div className="text-sm">{m.text}</div>
        <div className={`text-[10px] mt-1 ${mine ? "text-white/80" : "text-gray-500"}`}>
          {new Date(m.created_at).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default function Chat() {
  const [threads, setThreads] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [input, setInput] = useState("")

  useEffect(() => {
    // Mock threads; swap with Supabase later
    const demoThreads = [
      {
        id: "t1",
        name: "Ava",
        last_message: "See you at 9 AM!",
        updated_at: Date.now() - 1800_000,
        messages: [
          { id: "m1", author: "Ava", text: "See you at 9 AM!", created_at: Date.now() - 1800_000 },
          { id: "m2", author: "me", text: "Perfect 👍", created_at: Date.now() - 1700_000 },
        ],
      },
      {
        id: "t2",
        name: "Group: Power Yoga",
        last_message: "Bring water.",
        updated_at: Date.now() - 3600_000,
        messages: [
          { id: "m3", author: "Leo", text: "Bring water.", created_at: Date.now() - 3600_000 },
          { id: "m4", author: "me", text: "On it!", created_at: Date.now() - 3500_000 },
        ],
      },
    ]
    setThreads(demoThreads)
    setActiveId(demoThreads[0]?.id ?? null)
  }, [])

  const activeThread = useMemo(() => threads.find(t => t.id === activeId) || null, [threads, activeId])

  const send = () => {
    if (!input.trim() || !activeThread) return
    const m = { id: crypto.randomUUID?.() || String(Date.now()), author: "me", text: input.trim(), created_at: Date.now() }
    setThreads(prev =>
      prev.map(t => t.id === activeThread.id
        ? { ...t, messages: [...t.messages, m], last_message: m.text, updated_at: m.created_at }
        : t
      )
    )
    setInput("")
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Thread list */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden md:col-span-1">
        <div className="p-3 font-semibold border-b border-gray-100">Chats</div>
        <div className="max-h-[60vh] overflow-auto">
          {threads.map(t => (
            <ThreadItem key={t.id} t={t} active={t.id === activeId} onClick={() => setActiveId(t.id)} />
          ))}
          {threads.length === 0 && <div className="p-4 text-center text-gray-500">No conversations yet.</div>}
        </div>
      </div>

      {/* Active conversation */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden md:col-span-2 flex flex-col">
        <div className="p-3 font-semibold border-b border-gray-100">
          {activeThread ? activeThread.name : "No conversation selected"}
        </div>

        <div className="flex-1 p-3 overflow-auto">
          {activeThread ? (
            activeThread.messages.map(m => <Message key={m.id} m={m} />)
          ) : (
            <div className="h-full grid place-items-center text-gray-500">Select a conversation</div>
          )}
        </div>

        {/* Composer */}
        <div className="p-3 border-t border-gray-100 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-leaf/30"
            placeholder="Type a message…"
          />
          <button onClick={send} className="px-4 py-2 rounded-xl bg-leaf text-white font-medium">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
