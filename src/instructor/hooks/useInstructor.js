// src/instructor/hooks/useInstructor.js
import { useEffect, useState } from "react"

export function useInstructor() {
  const [loading, setLoading] = useState(true)
  const [isInstructor, setIsInstructor] = useState(false)

  useEffect(() => {
    // No backend yet: read from localStorage
    let flag = false
    try {
      const role = localStorage.getItem("role") || ""
      const isFlag = localStorage.getItem("is_instructor") || ""
      flag =
        role.toLowerCase() === "instructor" ||
        isFlag.toLowerCase() === "true"
    } catch (_) {}
    setIsInstructor(flag)
    setLoading(false)
  }, [])

  return { isInstructor, loading }
}
