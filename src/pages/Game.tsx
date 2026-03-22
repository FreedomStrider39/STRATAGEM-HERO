"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import TouchControls from "@/components/TouchControls";
import Leaderboard from "@/components/Leaderboard";
import { motion, AnimatePresence } from "framer-motion";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { AlertTriangle, CheckCircle2, Trophy, Zap, Edit2, BarChart3, Home, LogOut, Loader2, X, ArrowLeft, Globe } from "lucide-react";
import { getRank } from "@/data/stratagems";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

const Game = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const {
    gameState,
    score,
    level,
    timeLeft,
    maxTime,
    breakTimeLeft,
    missionQueue,
    currentQueueIndex,
    inputIndex,
    lastInputCorrect,
    isDisrupted,
    showDisruptorDestroyed,
    activeSequence,
    stats,
    combo,
    startGame,
    handleInput
  } = useStratagemGame();

  const [highScore, setHighScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [globalRank, setGlobalRank] = useState<number | null>(null);
  
  const submissionTriggeredRef = useRef(false);

  // Scaling logic to handle browser zoom and maintain proportions
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const targetHeight = 900; // Reference height for scaling
      const currentHeight = window.innerHeight;
      const newScale = currentHeight / targetHeight;
      
      if (window.innerWidth < 768) {
        setScale(1);
      } else {
        // Allow scaling to fit the window height
        setScale(Math.max(0.5, newScale));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setIsProfileLoading(false);
        return;
      }
      
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profile?.username) {
          setUsername(profile.username);
        } else {
          navigate("/auth");
        }

        const { data: leaderboard } = await supabase
          .from('leaderboard')
          .select('score')
          .eq('user_id', user.id)
          .maybeSingle();

        if (leaderboard) {
          setHighScore(leaderboard.score);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setIsProfileLoading(false);
      }
    };

    if (!authLoading) {
      fetchUserData();
    }
  }, [user, authLoading, navigate]);

  const fetchGlobalRank = async (currentScore: number) => {
    if (!user) return;
    try {
      const { count, error } = await supabase
        .from('leaderboard')
        .select('*', { count: 'exact', head: true })
        .gt('score', currentScore);
      
      if (error) throw error;
      setGlobalRank((count || 0) + 1);
    } catch (err) {
      console.error("Failed to fetch global rank:", err);
    }
  };

  const submitScore = async () => {
    if (!user || isSubmitting || hasSubmitted || stats.totalScore <= 0) return;

    setIsSubmitting(true);
    try {
      if (stats.totalScore > highScore) {
        const { error } = await supabase
          .from('leaderboard')
          .upsert(
            { 
              user_id: user.id, 
              score: stats.totalScore, 
              level: level 
            }, 
            { onConflict: 'user_id' }
          );
          
        if (error) throw error;
        setHighScore(stats.totalScore);
        toast.success("NEW PERSONAL BEST RECORDED!");
      }
      
      await fetchGlobalRank(stats.totalScore > highScore ? stats.totalScore : highScore);
      setHasSubmitted(true);
    } catch (err: any) {
      console.error("Score submission failed:", err);
      toast.error("FAILED TO UPLOAD INTEL: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (gameState === "playing") {
      submissionTriggeredRef.current = false;
      setHasSubmitted(false);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === "gameover" && user && !hasSubmitted && !isSubmitting && stats.totalScore > 0 && !submissionTriggeredRef.current) {
      submissionTriggeredRef.current = true;
      submitScore();
    }
  }, [gameState, user, hasSubmitted, isSubmitting, stats.totalScore]);

  useEffect(() => {
    const handleGlobalInput = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('input')) {
        return;
      }

      if (gameState === "idle" || (gameState === "gameover" && (hasSubmitted || stats.totalScore === 0))) {
        startGame();
      }
    };

    window.addEventListener("keydown", handleGlobalInput);
    window.addEventListener("mousedown", handleGlobalInput);
    window.addEventListener("touchstart", handleGlobalInput, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleGlobalInput);
      window.removeEventListener("mousedown", handleGlobalInput);
      window.removeEventListener("touchstart", handleGlobalInput);
    };
  }, [gameState, startGame, hasSubmitted, stats.totalScore]);

  if (authLoading || isProfileLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0c0c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="fixed inset-0 bg-[#0a0c0c] text-white font-sans flex items-center justify-center overflow-hidden">
      {/* Main Container - No max-width, fills screen */}
      <div className="w-full h-full bg-[#121616] relative flex flex-col items-center justify-center crt-screen border-x-[2px] md:border-x-[6px] border-[#1a1f1f] overflow-hidden">
        
        {/* Yellow Border Frame - Now inset-0 to touch edges */}
        <div className="absolute inset-0 border-[2px] md:border-[6px] border-yellow-400/80 shadow-[inset_0_0_15px_rgba(250,204,21,0.3),0_0_15px_rgba(250,204,21,0.3)] pointer-events-none z-50" />

        {(gameState === "playing" || gameState === "break") && (
          <button 
            onClick={() => window.location.reload()}
            className="absolute top-6 left-6 md:top-10 md:left-10 z-[60] bg-black/60 border border-white/10 px-2 py-1 md:px-4 md:py-2 flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition-all group"
          >
            <ArrowLeft size={12} className="md:w-5 md:h-5" />
            <span className="text-[7px] md:text-[12px] font-black tracking-widest uppercase">Abort</span>
          </button>
        )}

        {/* Content Area - Scales to fit browser window */}
        <div 
          className="w-full h-full z-10 flex flex-col justify-center overflow-hidden origin-center"
          style={{ transform: `scale(${scale})` }}
        >
          <AnimatePresence mode="wait">
            {gameState === "idle" && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center w-full h-full justify-center gap-4 md:gap-8 overflow-hidden py-4"
              >
                <div className="flex flex-col items-center shrink-0">
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-1 md:mb-2 italic drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] leading-none uppercase">
                    Stratagem Hero
                  </h1>
                  <div className="h-1 w-32 md:h-2 md:w-[24rem] bg-yellow-400 mb-4 md:mb-8 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
                  
                  <div className="flex flex-col items-center gap-2 mb-4 md:mb-8">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-[10px] md:text-base font-bold tracking-widest">HELLDIVER:</span>
                      <span className="text-white text-sm md:text-2xl font-black italic tracking-widest uppercase">{username || "UNASSIGNED"}</span>
                      <Link to="/auth" className="text-yellow-400/40 hover:text-yellow-400 transition-colors">
                        <Edit2 size={14} className="md:w-5 md:h-5" />
                      </Link>
                    </div>
                    <div className="flex gap-6">
                      <Link to="/stats" className="text-[10px] md:text-sm font-bold text-white/40 hover:text-yellow-400 flex items-center gap-1 transition-colors uppercase">
                        <BarChart3 size={12} className="md:w-5 md:h-5" /> Global Stats
                      </Link>
                      <button 
                        onClick={() => signOut().then(() => navigate("/"))}
                        className="text-[10px] md:text-sm font-bold text-red-500/60 hover:text-red-500 flex items-center gap-1 transition-colors uppercase"
                      >
                        <LogOut size={12} className="md:w-5 md:h-5" /> Sign Out
                      </button>
                    </div>
                  </div>

                  <motion.p 
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-yellow-400 text-xl md:text-5xl font-black tracking-[0.2em] md:tracking-[0.4em] text-glow-yellow mb-4 md:mb-8 uppercase italic"
                  >
                    {('ontouchstart' in window) ? 'Tap to Start' : 'Press Any Key to Start'}
                  </motion.p>
                </div>

                <div className="scale-90 md:scale-110 origin-center shrink min-h-0 overflow-hidden">
                  <Leaderboard />
                </div>
                
                <div className="text-white/40 text-xs md:text-2xl tracking-widest mt-4 shrink-0 uppercase font-black italic">
                  Personal Best: <span className="text-yellow-400">{highScore}</span>
                </div>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div 
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center overflow-hidden p-0"
              >
                <div className="w-full h-full flex flex-col overflow-hidden">
                  <div className="h-6 md:h-10 flex flex-col gap-1 shrink-0 mt-4 md:mt-8">
                    <AnimatePresence>
                      {isDisrupted && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2 bg-purple-600/30 border border-purple-500/50 py-1 px-4 backdrop-blur-md"
                        >
                          <AlertTriangle className="w-3 h-3 md:w-5 md:h-5 text-purple-400 animate-pulse" />
                          <span className="text-purple-400 text-[8px] md:text-sm font-bold tracking-[0.1em] animate-pulse text-center uppercase">
                            Cognitive Disruptor Detected
                          </span>
                        </motion.div>
                      )}
                      {showDisruptorDestroyed && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2 bg-orange-600/30 border border-orange-500/50 py-1 px-4 backdrop-blur-md"
                        >
                          <CheckCircle2 className="w-3 h-3 md:w-5 md:h-5 text-orange-400" />
                          <span className="text-white text-[8px] md:text-sm font-bold tracking-[0.1em] text-center uppercase">
                            Disruptor Destroyed
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`flex-1 flex flex-col items-center justify-center w-full relative ${isDisrupted ? 'animate-flicker' : ''} overflow-hidden`}>
                    {missionQueue[currentQueueIndex] && (
                      <StratagemDisplay 
                        stratagem={missionQueue[currentQueueIndex]} 
                        currentIndex={inputIndex}
                        isError={lastInputCorrect === false}
                        queue={missionQueue.slice(currentQueueIndex)}
                        isDisrupted={isDisrupted}
                        activeSequence={activeSequence}
                        round={level}
                        score={score}
                      />
                    )}
                    
                    <AnimatePresence>
                      {combo > 1 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 1.5 }}
                          className="absolute top-1/2 right-4 md:right-16 flex flex-col items-center z-20"
                        >
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Zap className="w-4 h-4 md:w-8 md:h-8 fill-yellow-400" />
                            <span className="text-xl md:text-5xl font-black italic text-glow-yellow">x{combo}</span>
                          </div>
                          <span className="text-[8px] md:text-sm font-bold tracking-[0.1em] text-white/60 uppercase">Combo</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="w-full flex flex-col items-center gap-2 mb-4 md:mb-12 shrink-0">
                    <div className="w-full px-6 md:px-16">
                      <div className="relative h-2 md:h-6 bg-black/60 border md:border-[3px] border-white/20 overflow-hidden">
                        <motion.div 
                          className={`absolute inset-y-0 left-0 shadow-[0_0_15px_rgba(250,204,21,0.6)] ${isDisrupted ? 'bg-purple-500' : 'bg-yellow-400'}`}
                          style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>

                    <div className="md:hidden w-full">
                      <TouchControls onInput={handleInput} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === "break" && (
              <motion.div 
                key="break"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center z-30 bg-black/80 p-8 md:p-16 border-y-[3px] md:border-y-[6px] border-yellow-400 w-full"
              >
                <h2 className="text-2xl md:text-6xl font-black text-yellow-400 mb-2 md:mb-6 italic tracking-tighter text-glow-yellow leading-none uppercase">
                  Round Complete
                </h2>
                <div className="h-1 w-16 md:h-2 md:w-[16rem] bg-white/20 mb-4 md:mb-8" />
                <p className="text-xs md:text-3xl font-bold text-white mb-2 md:mb-6 tracking-widest uppercase">Preparing Next Wave</p>
                <div className="text-3xl md:text-7xl font-black text-yellow-400 animate-pulse italic">
                  {Math.ceil(breakTimeLeft)}S
                </div>
              </motion.div>
            )}

            {gameState === "gameover" && (
              <motion.div 
                key="gameover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center w-full h-full z-10 px-6 py-8 overflow-hidden"
              >
                <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-4xl">
                  <h2 className="text-4xl md:text-8xl font-black text-red-500 italic tracking-tighter drop-shadow-[0_0_40px_rgba(239,68,68,0.5)] leading-none uppercase text-center">
                    Mission Failed
                  </h2>

                  <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <div className="flex items-center gap-3 md:gap-6 bg-yellow-400/10 border border-yellow-400/30 px-4 md:px-8 py-2 md:py-4">
                      <Trophy className="text-yellow-400 w-4 h-4 md:w-8 md:h-8" />
                      <div className="flex flex-col">
                        <span className="text-[8px] md:text-[12px] text-white/60 font-bold tracking-widest uppercase">Current Rank</span>
                        <span className="text-sm md:text-2xl font-black text-yellow-400 italic uppercase">{getRank(level)}</span>
                      </div>
                    </div>

                    {globalRank !== null && (
                      <div className="flex items-center gap-3 md:gap-6 bg-cyan-400/10 border border-cyan-400/30 px-4 md:px-8 py-2 md:py-4">
                        <Globe className="text-cyan-400 w-4 h-4 md:w-8 md:h-8" />
                        <div className="flex flex-col">
                          <span className="text-[8px] md:text-[12px] text-white/60 font-bold tracking-widest uppercase">Global Position</span>
                          <span className="text-sm md:text-2xl font-black text-cyan-400 italic uppercase">#{globalRank}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center gap-3 md:gap-5 w-full max-w-[280px] md:max-w-[450px] bg-black/60 p-6 md:p-10 border-2 md:border-[4px] border-white/10 shadow-2xl min-h-[200px] md:min-h-[300px]">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[#4ade80] text-[10px] md:text-xl font-bold tracking-widest uppercase whitespace-nowrap">Round Bonus</span>
                      <span className="text-yellow-400 text-sm md:text-2xl font-black italic">{stats.roundBonus}</span>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <span className="text-[#4ade80] text-[10px] md:text-xl font-bold tracking-widest uppercase whitespace-nowrap">Time Bonus</span>
                      <span className="text-yellow-400 text-sm md:text-2xl font-black italic">{stats.timeBonus}</span>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <span className="text-[#4ade80] text-[10px] md:text-xl font-bold tracking-widest uppercase whitespace-nowrap">Max Combo</span>
                      <span className="text-yellow-400 text-sm md:text-2xl font-black italic">{stats.maxCombo}</span>
                    </div>

                    <div className="w-full h-[1px] bg-white/20 my-1 md:my-2" />

                    <div className="flex justify-between items-center w-full">
                      <span className="text-[#4ade80] text-xs md:text-2xl font-black tracking-[0.1em] uppercase whitespace-nowrap">Total Score</span>
                      <span className="text-yellow-400 text-lg md:text-4xl font-black text-glow-yellow leading-none italic">{stats.totalScore}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1 text-white/60 text-[10px] md:text-sm font-bold tracking-widest uppercase">
                        Recording As: <span className="text-yellow-400">{username || "UNASSIGNED"}</span>
                      </div>
                      {hasSubmitted ? (
                        <div className="bg-green-500/20 border border-green-500/50 px-4 py-0.5">
                          <p className="text-green-400 text-[8px] md:text-[12px] font-black tracking-widest uppercase">Record Secured</p>
                        </div>
                      ) : isSubmitting ? (
                        <div className="animate-pulse text-yellow-400 text-[8px] md:text-[12px] font-black tracking-widest uppercase">
                          Uploading Intel...
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col items-center gap-3">
                      <p className="text-white/40 text-[10px] md:text-xl font-bold animate-pulse tracking-[0.1em] text-center uppercase">
                        {('ontouchstart' in window) ? 'Tap to Redeploy' : 'Press Any Key to Redeploy'}
                      </p>
                      
                      <button 
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 bg-white/5 border border-white/20 px-4 py-1.5 md:py-3 hover:bg-white/10 transition-colors text-[10px] md:text-sm font-black tracking-widest uppercase"
                      >
                        <Home size={14} className="md:w-5 md:h-5" /> Main Menu
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-1 md:bottom-4 left-0 right-0 flex justify-center z-[60] opacity-20 scale-[0.25] md:scale-50">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Game;