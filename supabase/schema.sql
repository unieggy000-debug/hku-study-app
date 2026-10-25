-- Demo data model for the study app.
-- Run this in Supabase SQL Editor after creating a project.
-- The browser must never receive the service_role key.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null,
  title text not null,
  created_at timestamptz not null default now(),
  unique (user_id, code)
);

create table if not exists public.study_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  item_type text not null check (item_type in ('mistake', 'english', 'definition', 'note', 'question')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  storage_path text not null unique,
  original_name text not null,
  mime_type text not null,
  byte_size bigint not null default 0,
  parse_status text not null default 'queued' check (parse_status in ('queued', 'processing', 'ready', 'failed')),
  parse_error text,
  extracted_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.study_items enable row level security;
alter table public.uploads enable row level security;

create policy "profiles own row" on public.profiles
  for all to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "courses own rows" on public.courses
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "study items own rows" on public.study_items
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "uploads own rows" on public.uploads
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

insert into storage.buckets (id, name, public)
values ('course-files', 'course-files', false)
on conflict (id) do nothing;

create policy "course files own read" on storage.objects
  for select to authenticated
  using (bucket_id = 'course-files' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "course files own upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'course-files' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "course files own delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'course-files' and (storage.foldername(name))[1] = auth.uid()::text);

