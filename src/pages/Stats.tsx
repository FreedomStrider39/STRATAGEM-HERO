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
      // Using a more aggressive filter to catch any variation of "TEST"
      const { data, error: supabaseError } = await supabase
        .from('leaderboard')
        .select('*')
        .not('username', 'ilike', '%TEST%') 
        .order('score', { ascending: false })
        .limit(50);

      if (supabaseError) throw supabaseError;
      if (data) setEntries(data);
      setError(null);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "FAILED TO RETRIEVE INTEL");
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
      <div className="max-w-5xl mx-auto">
        {/* Header Section matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b-2 border-yellow-400/30 pb-6 gap-6">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-10 h-10 text-yellow-400" />
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase">GLOBAL WAR EFFORT</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchLeaderboard}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-white/5 border border-white/20 px-4 py-2 text-xs font-black hover:bg-white/10 transition-colors disabled:opacity-50 uppercase tracking-widest"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} /> REFRESH
            </button>

            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors font-black tracking-widest text-xs md:text-sm ml-4 uppercase"
            >
              <ArrowLeft size={20} /> RETURN
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent animate-spin" />
            <p className="text-yellow-400 font-black tracking-[0.4em] animate-pulse text-xl">DECRYPTING INTEL...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6 border-2 border-red-500/20 bg-red-500/5 p-12 text-center">
            <AlertCircle className="w-20 h-20 text-red-500" />
            <div>
              <p className="text-red-500 font-black text-2xl tracking-[0.2em] mb-4 uppercase">{error}</p>
              <p className="text-white/40 text-sm max-w-md mx-auto font-bold tracking-widest">
                THE STRATAGEM NETWORK IS EXPERIENCING INTERFERENCE. PLEASE TRY AGAIN.
              </p>
            </div>
            <button 
              onClick={fetchLeaderboard}
              className="bg-white/10 border border-white/20 px-8 py-4 font-black text-sm hover:bg-white/20 transition-all uppercase tracking-widest"
            >
              RETRY CONNECTION
            </button>
          </div>
        ) : (
          <div className="w-full">
            {/* Table Headers */}
            <div className="grid grid-cols-12 px-8 py-4 text-xs md:text-sm font-black text-white/30 tracking-[0.2em] uppercase mb-4">
              <div className="col-span-2">RANK</div>
              <div className="col-span-5">HELLDIVER</div>
              <div className="col-span-2 text-center">LEVEL</div>
              <div className="col-span-3 text-right">SCORE</div>
            </div>

            <div className="space-y-3">
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6 bg-white/5 border border-white/10">
                  <Database className="w-16 h-16 text-white/10" />
                  <p className="text-white/20 font-black tracking-[0.3em] italic text-xl uppercase">NO DATA RECORDED IN THIS SECTOR</p>
                </div>
              ) : (
                entries.map((entry, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    key={idx} 
                    className={`grid grid-cols-12 items-center px-8 py-5 md:py-6 border-l-4 transition-all ${
                      idx === 0 
                        ? 'bg-yellow-400/5 border-yellow-400 shadow-[inset_0_0_20px_rgba(250,204,21,0.1)]' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="col-span-2 font-black text-lg md:text-2xl italic text-white/80">
                      {idx === 0 ? <Trophy className="text-yellow-400 w-8 h-8" /> : `#${idx + 1}`}
                    </div>
                    <div className="col-span-5 flex items-center gap-4">
                      <div className={`w-2 h-2 rotate-45 ${idx < 3 ? 'bg-yellow-400' : 'bg-white/20'}`} />
                      <span className={`font-black tracking-[0.15em] truncate uppercase ${idx === 0 ? 'text-yellow-400 text-xl md:text-3xl' : 'text-white text-lg md:text-2xl'}`}>
                        {entry.username}
                      </span>
                    </div>
                    <div className="col-span-2 text-center font-black text-white/40 text-sm md:text-xl">
                      {entry.level}
                    </div>
                    <div className="col-span-3 text-right font-black text-yellow-400 text-xl md:text-4xl italic tracking-tighter">
                      {entry.score.toLocaleString()}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;