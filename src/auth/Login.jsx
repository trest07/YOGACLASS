import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "@/supabaseClient"


export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    navigate('/') // go home on success
  }

  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold text-leaf mb-1">Welcome back</h1>
        <p className="text-sm text-gray-600 mb-6">Sign in to continue</p>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-leaf hover:bg-leaf/90 text-white font-semibold py-2 transition disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm">
          <Link to="/auth/reset" className="text-leaf hover:underline">Forgot password?</Link>
          <Link to="/auth/register" className="text-leaf hover:underline">Create account</Link>
        </div>
      </div>
    </div>
  )
}
