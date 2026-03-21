-- STRATAGEM HERO 2 - DATABASE SETUP
-- This script initializes the global leaderboard system.

-- 1. Table Definition
CREATE TABLE public.leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Security Configuration
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- 3. Access Policies
CREATE POLICY "leaderboard_read_policy" ON public.leaderboard FOR SELECT USING (true);
CREATE POLICY "leaderboard_insert_policy" ON public.leaderboard FOR INSERT WITH CHECK (true);
CREATE POLICY "leaderboard_update_policy" ON public.leaderboard FOR UPDATE USING (true);
CREATE POLICY "leaderboard_delete_policy" ON public.leaderboard FOR DELETE USING (true);