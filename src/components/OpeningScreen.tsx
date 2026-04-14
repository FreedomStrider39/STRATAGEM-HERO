"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import openingBg from "@/assets/opening_bg.png";

interface OpeningScreenProps {
  onComplete: () => void;
}

const OpeningScreen: React.FC<OpeningScreenProps> = ({ onComplete }) => {
  const [status, setStatus] = useState("INITIALIZING...");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStatus("ESTABLISHING UPLINK..."), 1000),
      setTimeout(() => setStatus("VERIFYING CITIZENSHIP..."), 2000),
      setTimeout(() => setStatus("READY FOR DEPLOYMENT"), 3000),
      setTimeout(() => onComplete(), 4500),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden crt-screen">
      {/* Background Image with Ken Burns effect */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={openingBg} 
          alt="Super Earth" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">
            Stratagem <span className="text-yellow-400">Hero 2</span>
          </h1>
          <div className="h-1 w-full bg-yellow-400 mt-2 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-xs md:text-sm font-black tracking-[0.3em] uppercase italic">
              {status}
            </span>
          </div>
          
          <div className="w-48 h-1 bg-white/10 relative overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-yellow-400/50"
            />
          </div>
        </motion.div>
      </div>

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};

export default OpeningScreen;