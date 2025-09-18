-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

-- Create students table
create table students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  description text not null,
  created_at timestamp default now()
);