create table classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  instructor text not null,
  location text not null,

  -- scheduling
  start_time timestamptz not null,
  end_time timestamptz not null,
  repeat_pattern text, -- e.g., 'none', 'weekly', 'monthly'

  -- capacity & waitlist
  capacity int not null default 20,
  waitlist_enabled boolean default false,

  -- optional pricing
  price numeric(10,2),
  tier text, -- e.g., 'basic', 'premium'

  status text not null default 'active', -- active | archived
  created_at timestamptz default now()
);