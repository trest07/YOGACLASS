-- Enrollments (link students <-> classes)
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  status text not null default 'enrolled', -- enrolled | waitlist | cancelled
  enrolled_at timestamptz default now(),
  unique(student_id, class_id) -- prevent double enrollment
);

-- Attendance per enrollment
create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid references enrollments(id) on delete cascade,
  attended boolean default false,
  notes text,
  marked_at timestamptz default now(),
  unique(enrollment_id) -- prevent duplicate attendance records per enrollment
);