"use client";

import React from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white flex items-center justify-center p-4 crt-screen">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-yellow-400 pb-4">
          <FileText className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">Terms of Use</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 backdrop-blur-md space-y-6"
        >
          <div className="space-y-4 text-sm md:text-base font-bold tracking-wide uppercase leading-relaxed">
            <p>
              1. Ce projet est un outil d'entraînement non-officiel créé par des fans.
            </p>
            <p>
              2. Ne pas copier, redistribuer ou modifier le code source ou les ressources de cette application sans autorisation.
            </p>
            <p>
              3. L'utilisation commerciale de cet outil est strictement interdite.
            </p>
            <p>
              4. Respectez la propriété intellectuelle des créateurs originaux (Arrowhead Game Studios).
            </p>
            <p>
              5. L'utilisation de scripts ou de triche pour manipuler le classement global est interdite.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-xs font-black tracking-widest uppercase"
            >
              <ArrowLeft size={16} /> Return to Enrollment
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;