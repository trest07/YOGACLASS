// Replace with Supabase later
export async function listClasses() {
  return [
    { id: "c1", title: "Morning Flow", level: "Beginner", starts_at: "2025-09-12T09:00:00Z" },
    { id: "c2", title: "Power Yoga", level: "Intermediate", starts_at: "2025-09-12T18:00:00Z" },
  ]
}
export async function createClass(payload) {
  return { id: crypto.randomUUID?.() || String(Date.now()), ...payload }
}
export async function listStudents() {
  return [
    { id: "u1", name: "Ava" },
    { id: "u2", name: "Leo" },
  ]
}
