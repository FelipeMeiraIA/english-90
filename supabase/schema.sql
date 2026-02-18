-- ============================================================
-- English 90 — Schema
-- Run this in Supabase SQL editor (or via supabase db push)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- 1. plan_days  (static curriculum content)
-- ─────────────────────────────────────────
create table if not exists plan_days (
  id             serial primary key,
  day_number     int not null unique,
  phase          int not null check (phase between 1 and 3),
  week_number    int not null,
  focus_title    text not null,
  theme          text not null,
  item_1_type    text not null, -- connector|structure|verb|expression|word
  item_1         text not null,
  item_1_example text not null,
  item_2_type    text not null,
  item_2         text not null,
  item_2_example text not null,
  connection_prompt text not null,
  notes          text default ''
);

-- ─────────────────────────────────────────
-- 2. user_profiles  (extends auth.users)
-- ─────────────────────────────────────────
create table if not exists user_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  start_date    date,                  -- chosen during onboarding
  onboarding_done boolean default false,
  timezone      text default 'America/Sao_Paulo',
  created_at    timestamptz default now()
);

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- 3. user_day_progress
-- ─────────────────────────────────────────
create table if not exists user_day_progress (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  day_number          int not null,
  date                date not null,
  review_done         boolean default false,
  new_learning_done   boolean default false,
  production_done     boolean default false,
  connection_done     boolean default false,
  mini_paragraph      text default '',
  sentences           jsonb default '[]',   -- array of 2 strings
  idea_1              text default '',
  idea_2              text default '',
  connected_sentence  text default '',
  scores              jsonb default '{}',   -- {fluency, confidence, difficulty}
  time_spent_minutes  int default 0,
  completed           boolean default false,
  created_at          timestamptz default now(),
  unique (user_id, day_number)
);

-- ─────────────────────────────────────────
-- 4. user_items  (learned vocabulary bank)
-- ─────────────────────────────────────────
create table if not exists user_items (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  source_day_number int not null,
  item_type        text not null,
  term             text not null,
  meaning          text not null,
  example          text not null,
  created_at       timestamptz default now()
);

-- ─────────────────────────────────────────
-- 5. spaced_reviews
-- ─────────────────────────────────────────
create table if not exists spaced_reviews (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  user_item_id uuid not null references user_items(id) on delete cascade,
  due_date     date not null,
  interval_tag text not null,  -- D1, D3, D7, D15, D30
  done         boolean default false,
  done_at      timestamptz,
  created_at   timestamptz default now()
);

-- ─────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────
create index if not exists idx_udp_user_day   on user_day_progress (user_id, day_number);
create index if not exists idx_udp_completed  on user_day_progress (user_id, completed);
create index if not exists idx_sr_user_due    on spaced_reviews (user_id, due_date, done);
create index if not exists idx_ui_user        on user_items (user_id, source_day_number);
