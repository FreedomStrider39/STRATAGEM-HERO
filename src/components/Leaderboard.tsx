"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, AlertCircle, RefreshCw } from "lucide-react";

interface Entry {
  score: number;
  level: number;
  username: string;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Fetch leaderboard data
      const { data: scores, error: scoreError } = await supabase
        .from('leaderboard')
        .select('score, level, user_id')
        .order('score', { ascending: false })
        .limit(10);

      if (scoreError) {
        console.error("Leaderboard Score Fetch Error:", scoreError);
        throw scoreError;
      }

      if (!scores || scores.length === 0) {
        setEntries([]);
        setLoading(false);
        return;
      }

      // Fetch profiles for these users to get usernames
      const userIds = scores.map(s => s.user_id);
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds);

      if (profileError) {
        console.error("Leaderboard Profile Fetch Error:", profileError);
      }

      // Map usernames back to scores
      const combinedData = scores.map(score => {
        const profile = profiles?.find(p => p.id === score.user_id);
        return {
          score: score.score,
          level: score.level,
          username: profile?.username || "REDACTED"
        };
      });

      setEntries(combinedData);
      setError(null);
    } catch (err: any) {
      console.error("Leaderboard Full Error Object:", err);
      setError("INTEL OFFLINE");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading && entries.length === 0) return <div className="text-white/20 text-[10px] animate-pulse">DECRYPTING GLOBAL INTEL...</div>;

  if (error) return (
    <div className="w-full max-w-md bg-red-500/5 border border-red-500/20 p-2 flex items-center gap-2">
      <AlertCircle className="w-3 h-3 text-red-500" />
      <span className="text-[8px] text-red-500/80 font-bold uppercase">{error}</span>
    </div>
  );

  return (
    <div className="w-full max-w-md bg-black/40 border border-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-yellow-400" />
          <h3 className="text-xs font-black tracking-[0.2em] text-white/80">GLOBAL HEROES</h3>
        </div>
        <button onClick={fetchLeaderboard} className="text-white/20 hover:text-yellow-400 transition-colors">
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      
      <div className="space-y-2 max-h-[180px] overflow-y-auto no-scrollbar">
        {entries.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-[10px] text-white/20 italic uppercase tracking-widest">NO DATA RECORDED</p>
          </div>
        ) : (
          entries.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between text-[10px] md:text-xs">
              <div className="flex items-center gap-3">
                <span className={idx < 3 ? "text-yellow-400 font-black" : "text-white/40"}>
                  #{idx + 1}
                </span>
                <span className="text-white font-bold truncate max-w-[100px] uppercase">
                  {entry.username}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/40">LVL {entry.level}</span>
                <span className="text-yellow-400 font-black">{entry.score.toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;