"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, AlertCircle, RefreshCw } from "lucide-react";

interface Entry {
  score: number;
  level: number;
  profiles: {
    username: string;
  } | null;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const { data, error: supabaseError } = await supabase
        .from('leaderboard')
        .select(`
          score, 
          level,
          profiles (
            username
          )
        `)
        .order('score', { ascending: false })
        .limit(10);

      if (supabaseError) throw supabaseError;
      
      setEntries((data as any) || []);
      setError(null);
    } catch (err: any) {
      console.error("Leaderboard fetch failed:", err);
      setError("CONNECTION ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading && entries.length === 0) return <div className="text-white/20 text-[10px] animate-pulse">LOADING GLOBAL INTEL...</div>;

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
            <p className="text-[10px] text-white/20 italic uppercase tracking-widest">NO DATA RECORDED IN THIS SECTOR</p>
            <p className="text-[8px] text-white/10 mt-1">BE THE FIRST TO DEPLOY</p>
          </div>
        ) : (
          entries.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between text-[10px] md:text-xs">
              <div className="flex items-center gap-3">
                <span className={idx < 3 ? "text-yellow-400 font-black" : "text-white/40"}>
                  #{idx + 1}
                </span>
                <span className="text-white font-bold truncate max-w-[100px] uppercase">
                  {entry.profiles?.username || "UNKNOWN"}
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