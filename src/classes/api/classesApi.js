import { supabase } from "@/supabaseClient"

// Fetch active classes
export async function getActiveClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("status", "active")
    .order("start_time", { ascending: true });

  if (error) throw error;
  return data;
}

// Fetch all classes (including archived)
export async function getAllClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select(`*, enrollments(
        id,
        student_id,
        status,
        enrolled_at
      )`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Create a new class
export async function createClass(newClass) {
    delete newClass.id; // Ensure no ID is sent when creating
  const { data, error } = await supabase
    .from("classes")
    .insert([newClass])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update existing class
export async function updateClass(id, updates) {
  const { data, error } = await supabase
    .from("classes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Archive a class
export async function archiveClass(id) {
  const { error } = await supabase
    .from("classes")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) throw error;
}
