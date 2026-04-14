"use client";

import React from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileText, LogIn, ShieldCheck } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import logoImg from "@/assets/logo.png";
import { useAuth } from "@/components/AuthProvider";

const Welcome = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If user is already signed in, redirect them directly to the game's "Press to Start" screen
  if (user) {
    return <Navigate to="/game" replace />;
  }

  return (
    <div className="fixed inset-0 bg-[#0a0c0c] text-white font-sans flex items-center justify-center p-0 overflow-hidden">
      <div className="w-full h-full max-w-full bg-[#121616] relative flex flex-col items-center justify-center px-4 md:px-12 crt-screen border-x-[2px] md:border-x-[8px] border-[#1a1f1f] overflow-y-auto">
        
        <div className="absolute inset-0 md:inset-4 border-[2px] md:border-[6px] border-yellow-400/80 shadow-[inset_0_0_15px_rgba(250,204,21,0.3),0_0_15px_rgba(250,204,21,0.3)] pointer-events-none z-50" />

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center z-10 max-w-xl w-full py-4 md:py-8"
        >
          <div className="relative mb-2 md:mb-6 group">
            <div className="absolute inset-0 bg-yellow-400/10 blur-2xl rounded-full" />
            <img 
              src={logoImg} 
              alt="Stratagem Hero 2 Logo" 
              className="w-24 h-24 md:w-48 md:h-48 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            />
          </div>

          <h1 className="text-2xl md:text-5xl font-black tracking-tighter text-white mb-1 md:mb-2 italic leading-none uppercase">
            <span className="text-yellow-400">Stratagem Hero 2</span>
          </h1>

          <div className="h-0.5 md:h-1 w-12 md:w-32 bg-yellow-400 mb-3 md:mb-6 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />

          <div className="bg-white/5 border border-white/10 p-3 md:p-6 backdrop-blur-md mb-4 md:mb-8">
            <p className="text-white/80 text-[8px] md:text-sm font-bold tracking-widest uppercase leading-relaxed mb-2 md:mb-4">
              Mandatory training for all Helldivers. 
              Master your inputs to ensure victory for Super Earth.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-400/80 text-[7px] md:text-[10px] font-black tracking-widest uppercase animate-pulse">
              <ShieldCheck size={10} className="md:w-3 md:h-3" /> Enrollment Required to Proceed
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[200px] md:max-w-xs mb-6 md:mb-10">
            <Link 
              to="/login"
              className="flex items-center justify-center gap-2 bg-yellow-400 text-black px-4 py-3 md:px-6 md:py-4 font-black text-xs md:text-lg tracking-widest hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] uppercase"
            >
              <LogIn size={16} className="md:w-5 md:h-5" /> Sign In to Play
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-4 w-full pt-3 md:pt-4 border-t border-white/10">
            <div className="flex gap-4 md:gap-6">
              <Link to="/privacy" className="flex items-center gap-1 text-[7px] md:text-[10px] text-yellow-400 hover:text-yellow-300 font-black tracking-widest uppercase transition-colors">
                <Shield size={10} className="md:w-3 md:h-3" /> Privacy
              </Link>
              <Link to="/terms" className="flex items-center gap-1 text-[7px] md:text-[10px] text-yellow-400 hover:text-yellow-300 font-black tracking-widest uppercase transition-colors">
                <FileText size={10} className="md:w-3 md:h-3" /> Terms
              </Link>
            </div>
            <p className="text-[6px] md:text-[8px] text-white/20 font-bold tracking-widest uppercase">
              © 2024 Stratagem Hero 2 - Fan-made tool
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-1 md:bottom-4 left-0 right-0 flex justify-center z-[60] opacity-20 scale-[0.25] md:scale-50">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Welcome;