"use client";

import React from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileText, LogIn, ShieldCheck } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useAuth } from "@/components/AuthProvider";

const Welcome = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If user is already signed in, redirect them directly to the game's "Press to Start" screen
  if (user) {
    return <Navigate to="/game" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0c0c] text-white font-sans flex items-center justify-center p-0 overflow-hidden">
      <div className="w-full h-full max-w-full bg-[#121616] relative flex flex-col items-center justify-center px-4 md:px-12 crt-screen border-x-[2px] md:border-x-[8px] border-[#1a1f1f] overflow-y-auto">
        
        <div className="absolute inset-0 md:inset-4 border-[2px] md:border-[6px] border-yellow-400/80 shadow-[inset_0_0_15px_rgba(250,204,21,0.3),0_0_15px_rgba(250,204,21,0.3)] pointer-events-none z-50" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center z-10 max-w-xl w-full py-4 md:py-8"
        >
          <motion.div variants={itemVariants} className="relative mb-1 md:mb-2 mt-8 md:mt-0">
            {/* Large background '2' */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={{ opacity: 0.15, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="absolute -right-4 -top-6 md:-right-12 md:-top-12 text-7xl md:text-[14rem] font-black text-yellow-400 italic select-none pointer-events-none z-0 leading-none"
            >
              2
            </motion.span>
            
            <h1 className="text-2xl md:text-6xl font-black tracking-tighter text-white italic leading-none uppercase relative z-10">
              Stratagem <span className="text-yellow-400">Hero</span>
            </h1>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="h-0.5 md:h-1 w-12 md:w-32 bg-yellow-400 mb-6 md:mb-10 shadow-[0_0_15px_rgba(250,204,21,0.6)]" 
          />

          <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full max-w-[200px] md:max-w-xs mb-6 md:mb-10">
            <Link 
              to="/login"
              className="flex items-center justify-center gap-2 bg-yellow-400 text-black px-4 py-3 md:px-6 md:py-4 font-black text-xs md:text-lg tracking-widest hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] uppercase group"
            >
              <LogIn size={16} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" /> Sign In to Play
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 md:gap-4 w-full pt-3 md:pt-4 border-t border-white/10">
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
          </motion.div>
        </motion.div>

        <div className="absolute bottom-1 md:bottom-4 left-0 right-0 flex justify-center z-[60] opacity-20 scale-[0.25] md:scale-50">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Welcome;