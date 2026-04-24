create table if not exists public.cats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  name text not null,
  breed text,
  age numeric,
  weight numeric,
  gender text,
  is_neutered boolean default false,
  photo_url text,
  food_type text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.meow_analyses (
  id uuid primary key default gen_random_uuid(),
  cat_id uuid references public.cats(id) on delete cascade,
  user_id uuid,
  audio_url text,
  duration numeric,
  context text,
  prediction text,
  confidence numeric,
  explanation text,
  suggestion text,
  user_feedback text,
  created_at timestamptz default now()
);

create table if not exists public.cat_memory_labels (
  id uuid primary key default gen_random_uuid(),
  cat_id uuid references public.cats(id) on delete cascade,
  label text not null,
  sample_count integer default 0,
  confidence_level numeric default 0,
  updated_at timestamptz default now()
);

create table if not exists public.care_tasks (
  id uuid primary key default gen_random_uuid(),
  cat_id uuid references public.cats(id) on delete cascade,
  title text not null,
  type text,
  due_date timestamptz,
  repeat_rule text,
  status text default 'pending',
  created_at timestamptz default now()
);
