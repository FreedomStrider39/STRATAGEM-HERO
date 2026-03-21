"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, AlertCircle } from "lucide-react";

interface Entry {
  username: string;
  score: number;
  level: number;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('username, score, level')
          .order('score', { ascending: false })
          .limit(10);

        if (error) throw error;
        if (data) setEntries(data);
      } catch (err) {
        console.error("Leaderboard fetch failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-white/20 text-[10px] animate-pulse">LOADING GLOBAL INTEL...</div>;

  if (error) return (
    <div className="w-full max-w-md bg-red-500/5 border border-red-500/20 p-2 flex items-center gap-2">
      <AlertCircle className="w-3 h-3 text-red-500" />
      <span className="text-[8px] text-red-500/80 font-bold">DATABASE TABLE NOT FOUND</span>
    </div>
  );

  return (
    <div className="w-full max-w-md bg-black/40 border border-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <Users className="w-4 h-4 text-yellow-400" />
        <h3 className="text-xs font-black tracking-[0.2em] text-white/80">GLOBAL HEROES</h3>
      </div>
      
      <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar">
        {entries.length === 0 ? (
          <p className="text-[10px] text-white/40 italic">NO DATA RECORDED YET</p>
        ) : (
          entries.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between text-[10px] md:text-xs">
              <div className="flex items-center gap-3">
                <span className={idx < 3 ? "text-yellow-400 font-black" : "text-white/40"}>
                  #{idx + 1}
                </span>
                <span className="text-white font-bold truncate max-w-[100px]">{entry.username}</span>
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