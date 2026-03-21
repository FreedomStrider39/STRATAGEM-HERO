"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, BarChart3, Shield, AlertCircle, Database } from "lucide-react";

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

  useEffect(() => {
    let isMounted = true;

    const fetchLeaderboard = async () => {
      if (!supabase) {
        if (isMounted) {
          setError("DATABASE NOT CONNECTED");
          setLoading(false);
        }
        return;
      }

      try {
        // Add a timeout to the fetch to prevent hanging
        const fetchPromise = supabase
          .from('leaderboard')
          .select('*')
          .order('score', { ascending: false })
          .limit(50);

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("TIMEOUT")), 8000)
        );

        const result = await Promise.race([fetchPromise, timeoutPromise]) as any;

        if (result instanceof Error) throw result;
        if (result.error) throw result.error;
        
        if (isMounted && result.data) {
          setEntries(result.data);
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        if (isMounted) {
          setError(err.message === "TIMEOUT" ? "CONNECTION TIMED OUT" : "FAILED TO RETRIEVE INTEL");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeaderboard();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white p-4 md:p-8 crt-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b-2 border-yellow-400 pb-4">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter">GLOBAL WAR EFFORT</h1>
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors font-bold tracking-widest text-xs md:text-sm"
          >
            <ArrowLeft size={18} /> RETURN
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent animate-spin" />
            <p className="text-yellow-400 font-black tracking-[0.3em] animate-pulse">DECRYPTING INTEL...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6 border-2 border-red-500/20 bg-red-500/5 p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <div>
              <p className="text-red-500 font-black text-xl tracking-[0.2em] mb-2">{error}</p>
              <p className="text-white/40 text-xs max-w-xs mx-auto">
                {error === "DATABASE NOT CONNECTED" 
                  ? "PLEASE ENSURE SUPABASE INTEGRATION IS CONFIGURED IN THE EDITOR." 
                  : "THE STRATAGEM NETWORK IS CURRENTLY UNREACHABLE. PLEASE TRY AGAIN LATER."}
              </p>
            </div>
            {error === "DATABASE NOT CONNECTED" && (
              <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-sm">
                <p className="text-yellow-400 text-[10px] font-bold mb-2">REQUIRED ACTION:</p>
                <p className="text-white/80 text-[10px]">CLICK THE 'ADD SUPABASE' BUTTON IN THE CHAT TO CONNECT THE DATABASE.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid grid-cols-12 px-4 py-2 text-[10px] md:text-xs font-black text-white/40 tracking-widest border-b border-white/10">
              <div className="col-span-1">RANK</div>
              <div className="col-span-5">HELLDIVER</div>
              <div className="col-span-2 text-center">LEVEL</div>
              <div className="col-span-4 text-right">SCORE</div>
            </div>

            <div className="space-y-2">
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Database className="w-12 h-12 text-white/10" />
                  <p className="text-white/20 font-bold tracking-widest italic">NO DATA RECORDED IN THIS SECTOR</p>
                </div>
              ) : (
                entries.map((entry, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx} 
                    className={`grid grid-cols-12 items-center px-4 py-3 md:py-4 border ${
                      idx === 0 ? 'bg-yellow-400/10 border-yellow-400/50' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="col-span-1 font-black text-sm md:text-xl italic">
                      {idx === 0 ? <Trophy className="text-yellow-400 w-5 h-5" /> : `#${idx + 1}`}
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      {idx < 3 && <Shield className="w-3 h-3 text-yellow-400 hidden md:block" />}
                      <span className={`font-black tracking-widest truncate ${idx === 0 ? 'text-yellow-400 text-lg' : 'text-white'}`}>
                        {entry.username}
                      </span>
                    </div>
                    <div className="col-span-2 text-center font-bold text-white/60 text-xs md:text-sm">
                      {entry.level}
                    </div>
                    <div className="col-span-4 text-right font-black text-yellow-400 text-sm md:text-2xl italic">
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