import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentRoster from "../components/StudentRoster";
import { supabase } from "@/supabaseClient";

export default function RosterPage() {
  const { classId } = useParams();
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("id, status, student:students(name, email)")
        .eq("class_id", classId);
      setRoster(data || []);
    };
    load();
  }, [classId]);

  return (
    <section className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-leaf">📋 Class Roster</h2>
      <StudentRoster roster={roster} />
    </section>
  );
}
