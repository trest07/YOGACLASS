create table attendance (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid references enrollments(id) on delete cascade,
  attended boolean default false,
  notes text,
  marked_at timestamptz default now()
);
