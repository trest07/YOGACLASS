import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [done, setDone] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin, // adjust if you want a custom route
      },
    });
    
    if (error) return setError(error.message);

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user?.id,
      full_name: email,
      role: "student",
    });

    if (profileError) return setError(profileError.message);
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold text-leaf mb-1">
          Create your account
        </h1>
        <p className="text-sm text-gray-600 mb-6">Join Vibez Yoga</p>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {done ? (
          <div className="text-sm text-gray-700">
            Check your inbox to confirm your email. After confirming, you can
            sign in.
            <div className="mt-4">
              <Link to="/auth/login" className="text-leaf hover:underline">
                Go to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-leaf"
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-leaf hover:bg-leaf/90 text-white font-semibold py-2 transition disabled:opacity-60"
            >
              {loading ? "Creating…" : "Create Account"}
            </button>
          </form>
        )}

        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-leaf hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
