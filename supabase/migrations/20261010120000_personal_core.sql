-- Slice 1: personal core loop. Profiles, fixed categories, habits, check-ins.
-- Streaks and points are computed in the app from check_ins (src/lib), never stored.
-- Groups come in Slice 2.

-- Profiles -------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 40),
  avatar text not null default '' check (char_length(avatar) <= 40), -- key in Groo's avatar set
  locale text not null default 'ar' check (locale in ('ar', 'en')),
  timezone text not null default 'UTC' check (char_length(timezone) <= 64), -- IANA name from the phone
  created_at timestamptz not null default now()
);

-- Create a profile when someone signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    left(coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''), 40)
  );
  return new;
end;
$$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Fixed categories (shared by everyone, power leaderboards) ------------------
create table public.categories (
  key text primary key check (key ~ '^[a-z_]{1,30}$'),
  icon text not null,
  daily_target smallint not null check (daily_target between 1 and 10),
  name_ar text not null,
  name_en text not null
);

insert into public.categories (key, icon, daily_target, name_ar, name_en) values
  ('prayer', 'mosque', 5, 'الصلاة', 'Prayer'),
  ('quran', 'book', 1, 'القرآن', 'Quran'),
  ('sport', 'dumbbell', 1, 'الرياضة', 'Sport');

-- Habits -----------------------------------------------------------------------
create table public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  category_key text references public.categories (key),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  icon text not null check (char_length(icon) <= 40),
  daily_target smallint not null default 1 check (daily_target between 1 and 10),
  rest_days_per_week smallint not null default 1 check (rest_days_per_week between 0 and 3),
  created_at timestamptz not null default now(),
  archived_at timestamptz
);
create index habits_user_id_idx on public.habits (user_id);
create index habits_category_key_idx on public.habits (category_key);

-- Check-ins: one row per habit per local day. Undo = delete the row. ----------
create table public.check_ins (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid not null references public.habits (id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  local_date date not null,
  count smallint not null check (count between 1 and 10),
  logged_on date not null, -- the user's local day when first logged; set by the server
  is_late boolean generated always as (local_date < logged_on) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (habit_id, local_date)
);
create index check_ins_user_id_local_date_idx on public.check_ins (user_id, local_date);

-- The server decides logged_on from the user's timezone, so "late" cannot be faked.
create function public.set_check_in_logged_on()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  tz text;
  today date;
begin
  select p.timezone into tz from public.profiles p where p.id = new.user_id;
  begin
    today := (now() at time zone coalesce(tz, 'UTC'))::date;
  exception when others then
    today := (now() at time zone 'UTC')::date;
  end;

  if tg_op = 'INSERT' then
    new.logged_on := today;
    new.created_at := now();
  else
    -- Only count can change. Keep identity and the first log day.
    new.id := old.id;
    new.habit_id := old.habit_id;
    new.user_id := old.user_id;
    new.local_date := old.local_date;
    new.logged_on := old.logged_on;
    new.created_at := old.created_at;
  end if;
  new.updated_at := now();

  -- No logging the future (1 day of slack for timezone changes).
  if new.local_date > today + 1 then
    raise exception 'check-in date % is in the future', new.local_date using errcode = '22023';
  end if;
  return new;
end;
$$;

create trigger check_ins_set_logged_on
  before insert or update on public.check_ins
  for each row execute function public.set_check_in_logged_on();

-- Row Level Security -----------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.habits enable row level security;
alter table public.check_ins enable row level security;

-- Start from zero, then grant only what the app needs.
revoke all on public.profiles, public.categories, public.habits, public.check_ins from anon, authenticated;

grant select on public.categories to anon, authenticated;
grant select, update (display_name, avatar, locale, timezone) on public.profiles to authenticated;
grant select, delete on public.habits to authenticated;
grant insert (id, category_key, name, icon, daily_target, rest_days_per_week) on public.habits to authenticated;
grant update (name, icon, daily_target, rest_days_per_week, archived_at) on public.habits to authenticated;
grant select, delete on public.check_ins to authenticated;
grant insert (id, habit_id, local_date, count) on public.check_ins to authenticated;
grant update (count) on public.check_ins to authenticated;

create policy "categories are public"
  on public.categories for select
  to anon, authenticated
  using (true);

create policy "read own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "read own habits"
  on public.habits for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "add own habits"
  on public.habits for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "edit own habits"
  on public.habits for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "delete own habits"
  on public.habits for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "read own check-ins"
  on public.check_ins for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "log own habits"
  on public.check_ins for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.habits h
      where h.id = habit_id and h.user_id = (select auth.uid())
    )
  );

create policy "edit own check-ins"
  on public.check_ins for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "undo own check-ins"
  on public.check_ins for delete
  to authenticated
  using ((select auth.uid()) = user_id);
