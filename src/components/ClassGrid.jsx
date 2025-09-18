import React from "react";
import ClassCardStudent from "./ClassCardStudent";
import { useAuth } from "../context/AuthProvider";

/**
 * ClassGrid
 * - classes: array of class objects
 * - size: 'sm' | 'md' | 'lg' controls card size
 * - columns: responsive grid class (optional)
 */
export default function ClassGrid({ classes = [], size = "md", columns = "sm:grid-cols-2 lg:grid-cols-3" }) {
    const { profile } = useAuth();
  if (!classes.length) {
    return <p className="text-gray-500">No classes found.</p>;
  }

  return (
    <div className={`grid gap-6 ${columns}`}>
      {classes.map((c) => (
        <ClassCardStudent key={c.id} cls={c} size={size} studentId={profile?.id} />
      ))}
    </div>
  );
}
