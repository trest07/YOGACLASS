import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function TopNav() {
  const { session, profile, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const links = [
    { to: "/classes", label: "Classes" },
    { to: "/schedule", label: "Schedule" },
    { to: "/instructor", label: "Instructor" }, // 👈 always visible
    { to: "/instructor/students", label: "Students" }, // 👈 added
    { to: "/student/myclasses", label: "My Classes" }, // 👈 added
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-5xl mx-auto gap-4">
        {/* left: logo */}
        <Link to="/" className="font-bold text-xl text-leaf whitespace-nowrap">
          Vibez Yoga
        </Link>

        {/* center: navigation */}
        <nav className="flex items-center gap-6 flex-1 justify-center">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-leaf" : "text-gray-600 hover:text-leaf"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* right: login/avatar */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4">
          {!session ? (
            <Link
              to="/login"
              className="px-3 py-1 bg-leaf text-white rounded-xl shadow hover:bg-leaf/90 transition whitespace-nowrap"
            >
              Login/
            </Link>
          ) : (
            <div className="relative" ref={menuRef}>
              {/* Avatar */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-leaf text-white font-semibold shadow hover:opacity-90"
              >
                {profile?.full_name
                  ? profile.full_name.charAt(0).toUpperCase()
                  : session.user.email.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-1 bg-gray-100 rounded-xl shadow-lg p-4 z-50">
                  <p className="font-semibold text-gray-800 mt-4">
                    {profile?.full_name}
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    {session.user.email}
                  </p>
                  <p className="absolute right-2 top-1 text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                    {(profile?.role || "user").toLowerCase()}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="w-full px-2 py-1 mt-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-green-400 transition text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
