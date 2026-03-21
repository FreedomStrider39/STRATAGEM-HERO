"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Send, ArrowLeft, LogOut, ShieldCheck } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [savedUsername, setSavedUsername] = useState(() => localStorage.getItem("stratagem-hero-username") || "");
  const [tempUsername, setTempUsername] = useState(savedUsername);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUsername.trim()) return;
    const name = tempUsername.trim().toUpperCase();
    localStorage.setItem("stratagem-hero-username", name);
    setSavedUsername(name);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("stratagem-hero-username");
    setSavedUsername("");
    setTempUsername("");
  };

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white flex items-center justify-center p-4 crt-screen">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-yellow-400 pb-4">
          <ShieldCheck className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter">ENROLLMENT CENTER</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 backdrop-blur-md"
        >
          {savedUsername ? (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-white/40 text-xs font-bold tracking-widest mb-2">CURRENT DESIGNATION</p>
                <h2 className="text-4xl font-black text-yellow-400 italic tracking-widest">{savedUsername}</h2>
              </div>

              <div className="flex flex-col gap-4">
                <Link 
                  to="/" 
                  className="w-full bg-yellow-400 text-black py-4 font-black text-center hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                >
                  RETURN TO FRONT <ArrowLeft size={20} />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full border border-red-500/50 text-red-500 py-4 font-black hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                >
                  RELINQUISH COMMAND <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <p className="text-white/60 text-sm font-bold tracking-widest">ENTER YOUR HELLDIVER DESIGNATION</p>
              </div>

              <input 
                autoFocus
                type="text" 
                maxLength={12}
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value.toUpperCase())}
                placeholder="NAME"
                className="w-full bg-black/40 border-2 border-white/20 px-6 py-4 text-2xl text-yellow-400 font-black tracking-[0.2em] text-center focus:outline-none focus:border-yellow-400 transition-all"
              />

              <button 
                type="submit"
                disabled={!tempUsername.trim()}
                className="w-full bg-yellow-400 text-black py-4 font-black text-xl hover:bg-yellow-500 disabled:opacity-30 transition-all flex items-center justify-center gap-3"
              >
                CONFIRM DEPLOYMENT <Send size={20} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;