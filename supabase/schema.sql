-- Rulează acest fișier o singură dată, în Supabase → SQL Editor → New query → Run.
-- Creează tabela de programări (funcționează și ca mini-CRM) și regulile de acces.

create extension if not exists pgcrypto;

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  date date not null,
  time text not null,
  name text not null,
  phone text not null,
  language text not null,
  message text,
  status text not null default 'new' check (status in ('new', 'confirmed', 'cancelled', 'completed')),
  notes text
);

-- Nu permite două programări active pe aceeași zi + oră (protecție împotriva race conditions,
-- de exemplu doi oameni care apasă "Trimite" în aceeași secundă pentru aceeași oră).
create unique index if not exists bookings_active_slot_unique
  on bookings (date, time)
  where status <> 'cancelled';

alter table bookings enable row level security;

-- Oricine (vizitatorii site-ului) poate trimite o cerere nouă de programare.
-- Nu verificăm aici explicit "status = 'new'": vizitatorii nu au voie oricum să seteze
-- coloana status (vezi GRANT-urile de mai jos), deci ea ia mereu valoarea implicită 'new'.
drop policy if exists "public can insert bookings" on bookings;
create policy "public can insert bookings"
  on bookings for insert
  to anon
  with check (true);

-- Vizitatorii pot vedea doar ce ore active (necancelate) există, ca să știe ce e liber —
-- fără să vadă numele/telefonul altor persoane (vezi și GRANT-urile pe coloane mai jos).
drop policy if exists "public can view availability" on bookings;
create policy "public can view availability"
  on bookings for select
  to anon
  using (status <> 'cancelled');

-- Contul autentificat (psihologul, din panoul de admin) vede tot.
drop policy if exists "admin can read all bookings" on bookings;
create policy "admin can read all bookings"
  on bookings for select
  to authenticated
  using (true);

drop policy if exists "admin can update bookings" on bookings;
create policy "admin can update bookings"
  on bookings for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admin can delete bookings" on bookings;
create policy "admin can delete bookings"
  on bookings for delete
  to authenticated
  using (true);

-- Restricționează exact ce coloane poate citi/scrie un vizitator neautentificat (anon),
-- ca datele de contact ale altor persoane să nu fie niciodată expuse public.
revoke select on bookings from anon;
grant select (date, time, status) on bookings to anon;
grant insert (date, time, name, phone, language, message) on bookings to anon;

-- Contul autentificat (admin) are acces normal, complet, pe toate coloanele.
grant select, insert, update, delete on bookings to authenticated;
