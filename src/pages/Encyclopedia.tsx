"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { STRATAGEMS, Direction } from "@/data/stratagems";
import StratagemIcon from "@/components/StratagemIcon";
import { ArrowLeft, Book, Search, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Encyclopedia = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Orbital", "Eagle", "Support", "Defensive", "Mission"];

  const filtered = STRATAGEMS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || s.category === filter;
    return matchesSearch && matchesFilter;
  });

  const Arrow = ({ dir }: { dir: Direction }) => {
    const rotation = { U: "rotate-0", D: "rotate-180", L: "-rotate-90", R: "rotate-90" };
    return (
      <div className={cn("w-4 h-4 md:w-6 md:h-6 text-yellow-400", rotation[dir])}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 11H8V22H16V11H21L12 2Z" /></svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white p-4 md:p-12 crt-screen overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b-2 border-yellow-400 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">Stratagem Intel</h1>
          </div>
          <Link to="/game" className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-2 font-black tracking-widest text-xs uppercase hover:bg-yellow-500 transition-all">
            <ArrowLeft size={16} /> Back to Mission
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
            <input 
              type="text"
              placeholder="SEARCH STRATAGEM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 font-bold tracking-widest focus:outline-none focus:border-yellow-400 transition-all uppercase"
            />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((strat, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={strat.name}
                className="bg-white/5 border border-white/10 p-4 flex items-center gap-4 group hover:border-yellow-400/50 transition-all"
              >
                <div className="w-16 h-16 border border-white/10 p-1 bg-black/40 shrink-0 group-hover:border-yellow-400 transition-colors">
                  <StratagemIcon url={strat.iconUrl} category={strat.category} />
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                  <h3 className="text-xs font-black tracking-widest uppercase truncate text-white/80 group-hover:text-yellow-400 transition-colors">
                    {strat.name}
                  </h3>
                  <div className="flex gap-1">
                    {strat.sequence.map((dir, i) => (
                      <Arrow key={i} dir={dir} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Encyclopedia;