-- ============================================================
-- Row Level Security policies
-- Run after schema.sql
-- ============================================================

alter table user_profiles      enable row level security;
alter table user_day_progress  enable row level security;
alter table user_items         enable row level security;
alter table spaced_reviews     enable row level security;
-- plan_days is public (read-only for all authenticated users)
alter table plan_days          enable row level security;

-- plan_days: anyone authenticated can read
create policy "plan_days read"
  on plan_days for select
  using (auth.role() = 'authenticated');

-- user_profiles
create policy "users can read own profile"
  on user_profiles for select using (auth.uid() = id);
create policy "users can update own profile"
  on user_profiles for update using (auth.uid() = id);
create policy "users can insert own profile"
  on user_profiles for insert with check (auth.uid() = id);

-- user_day_progress
create policy "users manage own progress"
  on user_day_progress for all using (auth.uid() = user_id);

-- user_items
create policy "users manage own items"
  on user_items for all using (auth.uid() = user_id);

-- spaced_reviews
create policy "users manage own reviews"
  on spaced_reviews for all using (auth.uid() = user_id);
