import { supabase } from "@/supabaseClient";

// Fetch all students with their enrollment counts
export async function getStudents() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, description, enrollments(count)")
    .eq("role", "student"); // solo estudiantes
  if (error) throw error;
  return data;
}

// Fetch roster per class with attendance info
export async function getRoster(classId) {
  const { data, error } = await supabase
    .from("attendance")
    .select(
      `
    id,
    attended,
    notes,
    enrollment:enrollments(
      student:profiles(id, full_name, role)
    )
  `
    )
    .eq("enrollment.class_id", classId); // relacion con enrollments -> class

  if (error) throw error;

  return data;
}

// Update attendance record
export async function updateAttendance(id, updates) {
  const { data, error } = await supabase
    .from("attendance")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}
