import { useEffect, useState } from "react"
import * as api from "@/instructor/api/instructorApi"

export default function useClasses() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await api.listClasses()
        if (mounted) setClasses(data)
      } catch (e) {
        setError(e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const createClass = async (payload) => {
    const created = await api.createClass(payload)
    setClasses(prev => [created, ...prev])
  }

  return { classes, loading, error, createClass }
}
