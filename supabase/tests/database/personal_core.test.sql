-- RLS and rules for Slice 1 tables. Run with: supabase test db
begin;
create extension if not exists pgtap with schema extensions;
select plan(20);

-- Two users. Signing up creates their profiles.
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'a@test.dev', '{"full_name":"Joe"}'),
  ('22222222-2222-2222-2222-222222222222', 'b@test.dev', '{}');

select is((select display_name from public.profiles where id = '11111111-1111-1111-1111-111111111111'), 'Joe', 'signup creates a profile with the name');

-- Act as user A.
set local role authenticated;
set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is((select count(*)::int from public.categories), 3, 'everyone can read the fixed categories');
select is((select count(*)::int from public.profiles), 1, 'A sees only own profile');

insert into public.habits (id, name, icon, daily_target, category_key)
values ('aaaaaaaa-0000-0000-0000-000000000001', 'Prayer at masjid', 'mosque', 5, 'prayer');
select is((select user_id from public.habits where id = 'aaaaaaaa-0000-0000-0000-000000000001'), '11111111-1111-1111-1111-111111111111'::uuid, 'new habit belongs to A');

select throws_ok(
  $$ insert into public.habits (name, icon, user_id) values ('x', 'book', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null, 'A cannot set user_id (not granted)');

insert into public.check_ins (habit_id, local_date, count)
values ('aaaaaaaa-0000-0000-0000-000000000001', current_date, 3);
select is((select count from public.check_ins where habit_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 3::smallint, 'A logs 3/5 today');
select is((select is_late from public.check_ins where local_date = current_date), false, 'today is not late');

insert into public.check_ins (habit_id, local_date, count)
values ('aaaaaaaa-0000-0000-0000-000000000001', current_date - 4, 1);
select is((select is_late from public.check_ins where local_date = current_date - 4), true, 'past day is marked late');

select throws_ok(
  $$ insert into public.check_ins (habit_id, local_date, count) values ('aaaaaaaa-0000-0000-0000-000000000001', current_date, 1) $$,
  '23505', null, 'one check-in per habit per day');

select throws_ok(
  $$ insert into public.check_ins (habit_id, local_date, count) values ('aaaaaaaa-0000-0000-0000-000000000001', current_date + 5, 1) $$,
  '22023', null, 'cannot log the future');

update public.check_ins set count = 4 where local_date = current_date;
select is((select count from public.check_ins where local_date = current_date), 4::smallint, 'A can change the count');

select throws_ok(
  $$ update public.check_ins set local_date = current_date - 1 where local_date = current_date $$,
  '42501', null, 'A cannot move a check-in to another day');

-- Act as user B.
set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is((select count(*)::int from public.habits), 0, 'B cannot see A''s habits');
select is((select count(*)::int from public.check_ins), 0, 'B cannot see A''s check-ins');

select throws_ok(
  $$ insert into public.check_ins (habit_id, local_date, count) values ('aaaaaaaa-0000-0000-0000-000000000001', current_date - 1, 1) $$,
  '42501', null, 'B cannot log on A''s habit');

update public.habits set name = 'hacked' where id = 'aaaaaaaa-0000-0000-0000-000000000001';
delete from public.check_ins where habit_id = 'aaaaaaaa-0000-0000-0000-000000000001';
update public.profiles set display_name = 'hacked' where id = '11111111-1111-1111-1111-111111111111';

-- Back to A: nothing changed.
set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select is((select name from public.habits where id = 'aaaaaaaa-0000-0000-0000-000000000001'), 'Prayer at masjid', 'B cannot rename A''s habit');
select is((select count(*)::int from public.check_ins), 2, 'B cannot delete A''s check-ins');
select is((select display_name from public.profiles), 'Joe', 'B cannot edit A''s profile');

-- Undo = delete own check-in.
delete from public.check_ins where local_date = current_date;
select is((select count(*)::int from public.check_ins), 1, 'A can undo a check-in');

-- Signed-out visitors see nothing private.
set local role anon;
select throws_ok($$ select * from public.habits $$, '42501', null, 'anon cannot read habits');

select * from finish();
rollback;
