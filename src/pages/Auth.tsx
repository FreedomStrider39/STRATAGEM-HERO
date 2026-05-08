"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowLeft, ShieldCheck, Loader2, Mail, Lock, Save, Camera, Trash2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setInitialLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .maybeSingle();
      
      if (data) {
        setUsername(data.username || "HELLDIVER");
        setAvatarUrl(data.avatar_url || null);
      } else {
        setUsername("HELLDIVER");
      }
      setNewEmail(user.email || "");
      setInitialLoading(false);
    };

    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      if (!event.target.files || event.target.files.length === 0 || !user) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      toast.success("INSIGNIA UPLOADED");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("UPLOAD FAILED: " + error.message.toUpperCase());
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || isSaving) return;

    setIsSaving(true);
    try {
      const finalUsername = username.trim().toUpperCase() || "HELLDIVER";
      
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          username: finalUsername,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (profileError) throw profileError;

      if (newEmail !== user.email) {
        const { error } = await supabase.auth.updateUser({ email: newEmail });
        if (error) throw error;
        toast.info("CHECK NEW EMAIL FOR CONFIRMATION");
      }

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
    <div className="h-screen bg-[#0a0c0c] text-white crt-screen overflow-hidden">
      <ScrollArea className="h-full w-full">
        <div className="min-h-full flex flex-col items-center justify-start md:justify-center p-4 py-12">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 mb-8 border-b-2 border-yellow-400 pb-4">
              <ShieldCheck className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">Helldiver Profile</h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-md"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-black/40 border-2 border-yellow-400/50 overflow-hidden flex items-center justify-center relative">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 md:w-16 md:h-16 text-yellow-400/20" />
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-yellow-400 text-black p-2 rounded-none hover:bg-yellow-500 transition-all shadow-lg"
                  >
                    <Camera size={16} />
                  </button>
                  {avatarUrl && (
                    <button 
                      onClick={() => setAvatarUrl(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <p className="text-[8px] font-black tracking-widest text-white/20 mt-4 uppercase">Upload Combat Insignia</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black tracking-widest text-white/40 mb-1 block uppercase">Designation (Username)</label>
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
                    <label className="text-[10px] font-black tracking-widest text-white/40 mb-1 block uppercase">Email Address</label>
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
                    disabled={isSaving || isUploading}
                    className="w-full bg-yellow-400 text-black py-4 font-black text-lg hover:bg-yellow-500 disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.3)] uppercase"
                  >
                    {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Save Changes
                  </button>

                  <Link 
                    to="/game" 
                    className="w-full border border-white/10 text-white/40 py-4 font-black text-center hover:text-yellow-400 hover:border-yellow-400/50 transition-all flex items-center justify-center gap-2 uppercase"
                  >
                    <ArrowLeft size={20} /> Return to Mission
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Auth;