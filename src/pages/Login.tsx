"use client";

import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, AlertCircle, CheckSquare } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const Login = () => {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (session) return <Navigate to="/game" replace />;

  const redirectTo = window.location.origin;

  return (
    <div className="fixed inset-0 bg-[#0a0c0c] text-white flex items-center justify-center p-4 crt-screen overflow-hidden">
      <div className="w-full max-w-md z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-yellow-400 text-glow-yellow uppercase">
            Stratagem Hero 2
          </h1>
          <div className="h-1 w-24 bg-yellow-400 mx-auto mt-4 shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 p-8 backdrop-blur-md relative"
        >
          <Auth
            supabaseClient={supabase}
            providers={[]}
            redirectTo={redirectTo}
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

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
              <Link to="/privacy" className="text-[10px] text-white/40 hover:text-yellow-400 font-black tracking-widest uppercase transition-colors">
                Privacy
              </Link>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <Link to="/terms" className="text-[10px] text-white/40 hover:text-yellow-400 font-black tracking-widest uppercase transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;