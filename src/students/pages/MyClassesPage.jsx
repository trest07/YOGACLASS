import React, { useEffect, useState } from "react";
import MyClasses from "../components/MyClasses";
import { getMyClasses } from "../api/enrollmentsApi";
import { useAuth } from "../../context/AuthProvider";

export default function MyClassesPage() {
  const [classes, setClasses] = useState([]);
  const { profile } = useAuth();

  const loadMyClasses = async () => {
    const data = await getMyClasses(profile?.id);
    setClasses(data || []);
  };

  useEffect(() => {
    loadMyClasses();
  }, []);

  return (
    <section className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-leaf">📅 My Classes</h2>
      <MyClasses enrolled={classes} />
    </section>
  );
}
