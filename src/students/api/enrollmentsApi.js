import { supabase } from "@/supabaseClient";

export async function enroll(studentId, classId) {
  const { data, error } = await supabase
    .from("enrollments")
    .insert([{ student_id: studentId, class_id: classId }])
    .select();
  if (error) throw error;

  // Crear registro de attendance
  await supabase.from("attendance").insert([
    {
      enrollment_id: data[0].id,
      attended: false,
      notes: "",
    },
  ]);
  return data;
}

export async function unenroll(studentId, classId) {
  // 1️⃣ obtener el enrollment correspondiente
  const { data: enrollments, error: enrollError } = await supabase
    .from("enrollments")
    .select("id")
    .match({ student_id: studentId, class_id: classId })
    .single();

  if (enrollError) throw enrollError;
  if (!enrollments) return; // no hay enrollment

  const enrollmentId = enrollments.id;

  // 2️⃣ borrar attendance asociado
  const { error: attendanceError } = await supabase
    .from("attendance")
    .delete()
    .eq("enrollment_id", enrollmentId);

  if (attendanceError) throw attendanceError;

  // 3️⃣ borrar enrollment
  const { error: delError } = await supabase
    .from("enrollments")
    .delete()
    .eq("id", enrollmentId);

  if (delError) throw delError;

  return true;
}

// Get classes of a specific student
export async function getMyClasses(studentId) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("id, status, class:classes(*)")
    .eq("student_id", studentId);
  if (error) throw error;
  return data;
}
