"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Send, ArrowLeft, ShieldCheck, Loader2, Mail, Lock, Save } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setInitialLoading(false);
        return;
      }
      
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle();
      
      if (data?.username) {
        setUsername(data.username);
      }
      setNewEmail(user.email || "");
      setInitialLoading(false);
    };

    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || isSaving) return;

    setIsSaving(true);
    try {
      // Update Username
      if (username.trim()) {
        const { error } = await supabase
          .from('profiles')
          .update({ username: username.trim().toUpperCase() })
          .eq('id', user.id);
        if (error) throw error;
      }

      // Update Email
      if (newEmail !== user.email) {
        const { error } = await supabase.auth.updateUser({ email: newEmail });
        if (error) throw error;
        toast.info("CHECK NEW EMAIL FOR CONFIRMATION");
      }

      // Update Password
      if (newPassword) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        setNewPassword("");
        toast.success("PASSWORD UPDATED");
      }

      toast.success("INTEL UPDATED SUCCESSFULLY");
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err.message.toUpperCase());
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
          <Link to="/" className="inline-block bg-yellow-400 text-black px-8 py-4 font-black hover:bg-yellow-500 transition-all">
            PROCEED TO LOGIN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white flex items-center justify-center p-4 crt-screen overflow-y-auto">
      <div className="w-full max-w-md py-8">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-yellow-400 pb-4">
          <ShieldCheck className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter">HELLDIVER PROFILE</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-md"
        >
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black tracking-widest text-white/40 mb-1 block">DESIGNATION (USERNAME)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50" />
                  <input 
                    type="text" 
                    maxLength={12}
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toUpperCase())}
                    className="w-full bg-black/40 border border-white/20 pl-10 pr-4 py-3 text-yellow-400 font-black tracking-widest focus:outline-none focus:border-yellow-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest text-white/40 mb-1 block">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50" />
                  <input 
                    type="email" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 pl-10 pr-4 py-3 text-white font-bold focus:outline-none focus:border-yellow-400 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <label className="text-[10px] font-black tracking-widest text-yellow-400/60 mb-1 block uppercase">Optional: Change Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50" />
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="LEAVE BLANK TO KEEP CURRENT"
                    className="w-full bg-black/40 border border-white/20 pl-10 pr-4 py-3 text-white font-bold focus:outline-none focus:border-yellow-400 transition-all placeholder:text-white/10 placeholder:text-[10px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full bg-yellow-400 text-black py-4 font-black text-lg hover:bg-yellow-500 disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />} SAVE CHANGES
              </button>

              <Link 
                to="/game" 
                className="w-full border border-white/10 text-white/40 py-4 font-black text-center hover:text-yellow-400 hover:border-yellow-400/50 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} /> RETURN TO MISSION
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;