"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileText, LogIn, Play } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import logoImg from "@/assets/logo.png";
import { useAuth } from "@/components/AuthProvider";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <div className="fixed inset-0 bg-[#0a0c0c] text-white font-sans flex items-center justify-center p-0 overflow-hidden">
      <div className="w-full h-full max-w-full bg-[#121616] relative flex flex-col items-center justify-center px-6 md:px-12 crt-screen border-x-[2px] md:border-x-[8px] border-[#1a1f1f] overflow-y-auto">
        
        <div className="absolute inset-0 md:inset-4 border-[2px] md:border-[6px] border-yellow-400/80 shadow-[inset_0_0_15px_rgba(250,204,21,0.3),0_0_15px_rgba(250,204,21,0.3)] pointer-events-none z-50" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center z-10 max-w-2xl w-full py-12"
        >
          {/* Logo Section */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full group-hover:bg-yellow-400/30 transition-all duration-500" />
            <img 
              src={logoImg} 
              alt="Stratagem Hero 2 Logo" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]"
            />
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-4 italic drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] leading-none uppercase">
            Welcome to <br/>
            <span className="text-yellow-400">Stratagem Hero 2</span>
          </h1>

          <div className="h-1 w-24 md:w-48 bg-yellow-400 mb-8 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />

          <div className="bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-md mb-10">
            <h2 className="text-yellow-400 text-sm font-black tracking-widest mb-4 uppercase flex items-center justify-center gap-2">
              Mission Briefing
            </h2>
            <p className="text-white/80 text-xs md:text-base font-bold tracking-widest uppercase leading-relaxed mb-6">
              Stratagem Hero 2 is an app so Helldivers can train to get faster with stratagem sequences. 
              Master the directional inputs required for orbital strikes and reinforcements to ensure victory for Super Earth.
            </p>
            <p className="text-white/40 text-[10px] md:text-xs font-bold tracking-widest uppercase italic">
              All credits to the Helldivers 2 game team for the original game.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mb-12">
            <Link 
              to="/game"
              className="flex-1 flex items-center justify-center gap-3 bg-yellow-400 text-black px-8 py-4 font-black text-lg tracking-widest hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] uppercase"
            >
              <Play size={20} fill="currentColor" /> Start Training
            </Link>
            
            {!user && (
              <Link 
                to="/login"
                className="flex-1 flex items-center justify-center gap-3 bg-white/5 border-2 border-white/20 text-white px-8 py-4 font-black text-lg tracking-widest hover:bg-white/10 transition-all uppercase"
              >
                <LogIn size={20} /> Sign In
              </Link>
            )}
          </div>

          {/* Legal Links Footer */}
          <div className="flex flex-col items-center gap-6 w-full pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/privacy" className="flex items-center gap-2 text-xs text-yellow-400 hover:text-yellow-300 font-black tracking-widest uppercase transition-colors">
                <Shield size={14} /> Privacy Policy
              </Link>
              <Link to="/terms" className="flex items-center gap-2 text-xs text-yellow-400 hover:text-yellow-300 font-black tracking-widest uppercase transition-colors">
                <FileText size={14} /> Terms of Use
              </Link>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
                © 2024 Stratagem Hero 2 - Fan-made training tool
              </p>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center z-[60] opacity-30 scale-[0.4] md:scale-75">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Welcome;