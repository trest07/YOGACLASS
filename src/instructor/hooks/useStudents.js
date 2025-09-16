import { useEffect, useState } from "react"
import * as api from "@/instructor/api/instructorApi"

export default function useStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await api.listStudents()
        if (mounted) setStudents(data)
      } catch (e) {
        setError(e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  return { students, loading, error }
}
