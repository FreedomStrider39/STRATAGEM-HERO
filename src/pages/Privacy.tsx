"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white flex items-center justify-center p-4 crt-screen">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-yellow-400 pb-4">
          <Shield className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">Privacy Policy</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 backdrop-blur-md space-y-6"
        >
          <div className="space-y-4 text-sm md:text-base font-bold tracking-wide uppercase leading-relaxed">
            <p>
              Ton email sert uniquement à créer ton compte et lier tes données de jeu (scores, progression, pseudonyme).
            </p>
            <p>
              Nous ne partageons pas tes données avec des tiers à des fins commerciales.
            </p>
            <p>
              Tes données sont stockées de manière sécurisée via l'infrastructure Supabase.
            </p>
            <p>
              Tu peux demander la suppression de ton compte et de toutes les données associées à tout moment en nous contactant ou via les paramètres de ton profil.
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

export default Privacy;