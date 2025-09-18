-- ============================
-- Enrollments adjustments
-- ============================

-- Add status if missing
alter table enrollments
  add column if not exists status text not null default 'enrolled';

-- Add enrolled_at timestamp if missing
alter table enrollments
  add column if not exists enrolled_at timestamptz default now();

-- Add uniqueness constraint if not exists
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'enrollments_student_id_class_id_key'
  ) then
    alter table enrollments
      add constraint enrollments_student_id_class_id_key unique(student_id, class_id);
  end if;
end $$;

-- ============================
-- Attendance adjustments
-- ============================

-- Add enrollment_id if missing
alter table attendance
  add column if not exists enrollment_id uuid references enrollments(id) on delete cascade;

-- Add attended flag if missing
alter table attendance
  add column if not exists attended boolean default false;

-- Add notes field if missing
alter table attendance
  add column if not exists notes text;

-- Add marked_at timestamp if missing
alter table attendance
  add column if not exists marked_at timestamptz default now();

-- Add unique constraint per enrollment
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'attendance_enrollment_id_key'
  ) then
    alter table attendance
      add constraint attendance_enrollment_id_key unique(enrollment_id);
  end if;
end $$;