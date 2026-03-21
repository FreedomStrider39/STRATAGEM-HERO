"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileText, LogIn, Play, Info } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center p-4 md:p-8 crt-screen overflow-y-auto">
      <div className="max-w-4xl w-full flex flex-col items-center gap-8 md:gap-12 py-12">
        
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
          <img 
            src="dyad-media://media/quick-panda-dart/.dyad/media/b303d87568649e5be5e635b9de420c08.png" 
            alt="Stratagem Hero 2 Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]"
            style={{ mixBlendMode: 'lighten' }} // Attempting to blend out dark backgrounds
          />
        </motion.div>

        {/* Title & Description */}
        <div className="text-center space-y-6 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            STRATAGEM HERO 2
          </motion.h1>
          
          <div className="h-1 w-24 bg-yellow-400 mx-auto shadow-[0_0_15px_rgba(250,204,21,0.8)]" />

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-lg md:text-xl font-bold tracking-widest text-yellow-400 uppercase italic">
              Elite Training for Super Earth's Finest
            </p>
            <p className="text-sm md:text-base text-white/70 font-medium tracking-wide leading-relaxed uppercase">
              Stratagem Hero 2 is a specialized training application designed to help Helldivers master their combat inputs. 
              Practice the complex directional sequences required for orbital strikes and support weaponry to increase your efficiency on the front lines.
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 w-full max-w-md"
        >
          {user ? (
            <Link 
              to="/game" 
              className="flex-1 bg-yellow-400 text-black py-4 px-8 font-black text-xl tracking-widest hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.3)] group"
            >
              START TRAINING <Play className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className="flex-1 bg-yellow-400 text-black py-4 px-8 font-black text-xl tracking-widest hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                ENROLL NOW <LogIn />
              </Link>
              <Link 
                to="/game" 
                className="flex-1 border-2 border-white/20 text-white py-4 px-8 font-black text-xl tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                GUEST ACCESS
              </Link>
            </>
          )}
        </motion.div>

        {/* Credits & Legal */}
        <div className="mt-auto pt-12 w-full max-w-3xl border-t border-white/10 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link to="/privacy" className="flex items-center gap-2 text-xs text-white/40 hover:text-yellow-400 font-black tracking-widest uppercase transition-colors">
              <Shield size={14} /> Privacy Policy
            </Link>
            <Link to="/terms" className="flex items-center gap-2 text-xs text-white/40 hover:text-yellow-400 font-black tracking-widest uppercase transition-colors">
              <FileText size={14} /> Terms of Use
            </Link>
            <Link to="/stats" className="flex items-center gap-2 text-xs text-white/40 hover:text-yellow-400 font-black tracking-widest uppercase transition-colors">
              <Info size={14} /> Global Intel
            </Link>
          </div>

          <div className="text-center space-y-4">
            <p className="text-[10px] md:text-xs text-white/30 font-bold tracking-[0.2em] uppercase max-w-xl mx-auto leading-loose">
              All credits to the Helldivers 2 game team at Arrowhead Game Studios for the original game and inspiration. 
              This is a fan-made training tool and is not affiliated with Sony Interactive Entertainment.
            </p>
            <div className="opacity-40 scale-75">
              <MadeWithDyad />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;