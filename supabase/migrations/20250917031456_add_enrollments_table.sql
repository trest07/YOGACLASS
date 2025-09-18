create table enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  status text not null default 'enrolled', -- enrolled | waitlist | cancelled
  enrolled_at timestamptz default now(),
  unique(student_id, class_id) -- evita doble inscripción
);