-- AI Scaling — lead capture schema
-- Run this in the Supabase SQL editor (or via the CLI) to provision the table.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text,
  source text default 'website',
  created_at timestamptz not null default now()
);

-- Keep the table locked down. Inserts happen server-side through the API
-- route using the service_role key, which bypasses RLS. Enabling RLS with
-- no public policies means the anon/public keys cannot read or write leads.
alter table public.leads enable row level security;

-- Helpful index for the most common query (newest leads first).
create index if not exists leads_created_at_idx on public.leads (created_at desc);
