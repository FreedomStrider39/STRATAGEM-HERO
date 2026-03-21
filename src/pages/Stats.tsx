"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, BarChart3, AlertCircle, Database, RefreshCw } from "lucide-react";

interface Entry {
  username: string;
  score: number;
  level: number;
  created_at: string;
}

const Stats = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLeaderboard = async () => {
    setIsRefreshing(true);
    try {
      const { data, error: supabaseError } = await supabase
        .from('leaderboard')
        .select('username, score, level, created_at')
        .order('score', { ascending: false })
        .limit(50);

      if (supabaseError) throw supabaseError;
      setEntries(data || []);
      setError(null);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError("FAILED TO RETRIEVE INTEL");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white p-4 md:p-12 crt-screen overflow-y-auto font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b-2 border-yellow-400/30 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">GLOBAL STATS</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchLeaderboard}
              disabled={isRefreshing}
              className="p-2 text-white/40 hover:text-yellow-400 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
            </button>

            <Link 
              to="/" 
              className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-black tracking-widest text-xs uppercase hover:bg-yellow-500 transition-colors"
            >
              <ArrowLeft size={16} /> BACK
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent animate-spin" />
            <p className="text-yellow-400 font-black tracking-widest animate-pulse text-xs">DECRYPTING...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 border border-red-500/20 bg-red-500/5 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <p className="text-red-500 font-black text-sm tracking-widest uppercase">{error}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/5 border border-white/10">
                <Database className="w-12 h-12 text-white/10" />
                <p className="text-white/20 font-black tracking-widest italic text-sm uppercase">NO DATA RECORDED</p>
              </div>
            ) : (
              entries.map((entry, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  key={idx} 
                  className={`flex items-center justify-between px-4 py-4 border-l-4 transition-all ${
                    idx === 0 
                      ? 'bg-yellow-400/10 border-yellow-400' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-black text-sm md:text-lg italic text-white/40 w-8">
                      #{idx + 1}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className={`font-black tracking-widest truncate uppercase ${idx === 0 ? 'text-yellow-400 text-lg md:text-xl' : 'text-white text-sm md:text-lg'}`}>
                        {entry.username}
                      </span>
                      <span className="text-[10px] text-white/40 font-bold">LEVEL {entry.level}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-yellow-400 font-black text-lg md:text-2xl italic tracking-tighter">
                      {entry.score.toLocaleString()}
                    </span>
                    <span className="text-[8px] text-white/20 font-bold">POINTS</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;