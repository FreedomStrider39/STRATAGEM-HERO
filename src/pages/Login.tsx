"use client";

import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const Login = () => {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (session) return <Navigate to="/" replace />;

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
          <div className="mb-6 text-center">
            <p className="text-white/60 text-sm font-bold tracking-widest uppercase">Secure your progress across the galaxy</p>
          </div>

          <Auth
            supabaseClient={supabase}
            providers={["google"]} // Steam requires manual config in Supabase dashboard
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#facc15',
                    brandAccent: '#eab308',
                    inputBackground: 'rgba(0,0,0,0.4)',
                    inputText: 'white',
                    inputBorder: 'rgba(255,255,255,0.2)',
                  },
                },
              },
            }}
            theme="dark"
          />

          <div className="mt-8">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 text-white/40 hover:text-yellow-400 transition-colors text-xs font-bold tracking-widest uppercase"
            >
              <ArrowLeft size={14} /> Return to Front
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;