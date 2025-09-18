
-- 1️⃣ Eliminar tabla students si existe
drop table if exists public.students cascade;

-- 1. Agregar columna description
alter table public.profiles
add column if not exists description text;

-- 2. Asegurarnos que role tenga valores válidos
alter table public.profiles
alter column role set default 'student';

-- 3. Opcional: verificar que role solo acepte ciertos valores
-- (user, student, instructor, admin)
-- Esto es PostgreSQL enum-like check
alter table public.profiles
add constraint role_check
check (role in ('user','student','instructor','admin'));

-- 4️⃣ Ajustar enrollments para que apunte a profiles.id
-- Primero eliminar constraint existente que apunta a students
alter table public.enrollments
drop constraint if exists enrollments_student_id_fkey;

-- Crear la nueva foreign key hacia profiles
alter table public.enrollments
add constraint enrollments_student_id_fkey
foreign key (student_id) references public.profiles(id) on delete cascade;