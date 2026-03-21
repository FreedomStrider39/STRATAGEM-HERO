"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Send, ArrowLeft, LogOut, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setInitialLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle();
      
      if (data?.username) {
        setUsername(data.username);
      }
      setInitialLoading(false);
    };

    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !username.trim() || isSaving) return;

    setIsSaving(true);
    const cleanName = username.trim().toUpperCase();

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username: cleanName })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success("DESIGNATION UPDATED");
      navigate("/");
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err.message.includes("unique") ? "NAME ALREADY TAKEN" : "UPDATE FAILED");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || initialLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c0c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0c0c] text-white flex items-center justify-center p-4 crt-screen">
        <div className="text-center space-y-6">
          <ShieldCheck className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
          <h1 className="text-2xl font-black italic tracking-widest">ENROLLMENT REQUIRED</h1>
          <Link to="/login" className="inline-block bg-yellow-400 text-black px-8 py-4 font-black hover:bg-yellow-500 transition-all">
            PROCEED TO LOGIN
          </Link>
        </div>
      </div>
    );
  }

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
          <form onSubmit={handleSave} className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-white/60 text-sm font-bold tracking-widest">UPDATE YOUR HELLDIVER DESIGNATION</p>
            </div>

            <input 
              autoFocus
              type="text" 
              maxLength={12}
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
              placeholder="NAME"
              className="w-full bg-black/40 border-2 border-white/20 px-6 py-4 text-2xl text-yellow-400 font-black tracking-[0.2em] text-center focus:outline-none focus:border-yellow-400 transition-all"
            />

            <div className="flex flex-col gap-4">
              <button 
                type="submit"
                disabled={!username.trim() || isSaving}
                className="w-full bg-yellow-400 text-black py-4 font-black text-xl hover:bg-yellow-500 disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : "CONFIRM CHANGES"} <Send size={20} />
              </button>

              <Link 
                to="/" 
                className="w-full border border-white/10 text-white/40 py-4 font-black text-center hover:text-yellow-400 hover:border-yellow-400/50 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} /> RETURN TO FRONT
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;