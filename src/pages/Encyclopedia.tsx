"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { STRATAGEMS, Direction } from "@/data/stratagems";
import StratagemIcon from "@/components/StratagemIcon";
import { ArrowLeft, Book, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Encyclopedia = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Orbital", "Eagle", "Support", "Defensive", "Mission"];

  const filtered = useMemo(() => {
    return STRATAGEMS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || s.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const Arrow = ({ dir }: { dir: Direction }) => {
    const rotation = { U: "rotate-0", D: "rotate-180", L: "-rotate-90", R: "rotate-90" };
    return (
      <div className={cn("w-4 h-4 md:w-6 md:h-6 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]", rotation[dir])}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 11H8V22H16V11H21L12 2Z" /></svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white crt-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0c0c]/90 backdrop-blur-md border-b-2 border-yellow-400 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
              <h1 className="text-xl md:text-4xl font-black italic tracking-tighter uppercase text-glow-yellow">Stratagem Intel</h1>
            </div>
            <Link to="/game" className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-black tracking-widest text-[10px] md:text-xs uppercase hover:bg-yellow-500 transition-all shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              <ArrowLeft size={14} /> Back
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="text"
                placeholder="SEARCH INTEL..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-10 pr-10 py-3 font-bold tracking-widest focus:outline-none focus:border-yellow-400 transition-all uppercase text-sm"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-black tracking-widest uppercase border transition-all whitespace-nowrap",
                    filter === cat ? "bg-yellow-400 text-black border-yellow-400" : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((strat) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={strat.name}
                  className="bg-white/5 border border-white/10 p-4 flex flex-col gap-4 group hover:border-yellow-400/50 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-tighter">{strat.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border border-white/10 p-1 bg-black/40 shrink-0 group-hover:border-yellow-400 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      <StratagemIcon url={strat.iconUrl} category={strat.category} />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="text-[10px] md:text-xs font-black tracking-widest uppercase truncate text-white/80 group-hover:text-yellow-400 transition-colors leading-tight">
                        {strat.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {strat.sequence.map((dir, i) => (
                          <Arrow key={i} dir={dir} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-white/20">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-xl font-black italic tracking-widest uppercase">No Intel Found</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-4 text-center border-t border-white/5 bg-black/20">
        <p className="text-[8px] md:text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">
          Total Stratagems Cataloged: {STRATAGEMS.length}
        </p>
      </footer>
    </div>
  );
};

export default Encyclopedia;