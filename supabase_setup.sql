-- Create the leaderboard table
create table leaderboard (
  id uuid default gen_random_uuid() primary key,
  username text not null,
  score integer not null,
  level integer not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table leaderboard enable row level security;

-- Allow anyone to read the leaderboard
create policy "Allow public read access"
  on leaderboard for select
  using (true);

-- Allow anyone to submit their scores
create policy "Allow public insert access"
  on leaderboard for insert
  with check (true);