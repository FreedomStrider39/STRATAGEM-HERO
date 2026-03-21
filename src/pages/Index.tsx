"use client";

import React, { useState, useEffect } from "react";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import TouchControls from "@/components/TouchControls";
import { motion, AnimatePresence } from "framer-motion";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { AlertTriangle, CheckCircle2, Trophy, Zap } from "lucide-react";
import { getRank } from "@/data/stratagems";

const Index = () => {
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

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("stratagem-hero-highscore");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    if (gameState === "gameover" && stats.totalScore > highScore) {
      setHighScore(stats.totalScore);
      localStorage.setItem("stratagem-hero-highscore", stats.totalScore.toString());
    }
  }, [gameState, stats.totalScore, highScore]);

  // Global input listener for starting/restarting the game
  useEffect(() => {
    const handleGlobalInput = (e: KeyboardEvent | TouchEvent | MouseEvent) => {
      if (gameState === "idle" || gameState === "gameover") {
        // We don't want to trigger start if they are clicking the "Made with Dyad" link
        if (e.target instanceof HTMLElement && e.target.closest('a')) return;
        
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
  }, [gameState, startGame]);

  return (
    <div className="h-dynamic-screen bg-[#0a0c0c] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center p-0 overflow-hidden">
      <div className="w-full h-full max-w-full bg-[#121616] relative flex flex-col items-center justify-center px-1 md:px-12 crt-screen border-x-[2px] md:border-x-[8px] border-[#1a1f1f]">
        
        <div className="absolute inset-0.5 md:inset-2 border-[1px] md:border-[4px] border-yellow-400/80 shadow-[inset_0_0_10px_rgba(250,204,21,0.2),0_0_10px_rgba(250,204,21,0.2)] pointer-events-none z-50" />

        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-10 px-4 w-full h-full justify-center"
            >
              <h1 className="text-3xl md:text-8xl font-black tracking-tighter text-white mb-2 md:mb-4 italic drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] leading-none">
                STRATAGEM HERO
              </h1>
              <div className="h-1 w-24 md:h-1.5 md:w-[25rem] bg-yellow-400 mb-6 md:mb-8 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
              
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-yellow-400 text-base md:text-4xl font-bold tracking-[0.2em] md:tracking-[0.4em] text-glow-yellow mb-8 md:mb-12"
              >
                {('ontouchstart' in window) ? 'TAP TO START' : 'PRESS ANY KEY TO START'}
              </motion.p>

              <div className="hidden md:flex gap-8 items-center justify-center bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">W</kbd>
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">A</kbd>
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">S</kbd>
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">D</kbd>
                  </div>
                  <span className="text-[10px] text-white/40 tracking-widest">MOVEMENT</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">↑</kbd>
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">←</kbd>
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">↓</kbd>
                    <kbd className="px-3 py-1.5 bg-white/10 border-b-4 border-white/20 rounded text-sm font-bold">→</kbd>
                  </div>
                  <span className="text-[10px] text-white/40 tracking-widest">ARROWS</span>
                </div>
              </div>

              <div className="md:hidden">
                <TouchControls onInput={() => {}} className="opacity-20 pointer-events-none scale-75" />
              </div>
              
              <div className="mt-6 md:mt-12 text-white/40 text-xs md:text-xl tracking-widest">
                HIGH SCORE: <span className="text-yellow-400">{highScore}</span>
              </div>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div 
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-between z-10 py-1 md:py-4"
            >
              <div className="w-full max-w-[1100px] mx-auto flex flex-col h-full">
                {/* Status Alerts */}
                <div className="h-6 md:h-8 flex flex-col gap-1 mb-1">
                  <AnimatePresence>
                    {isDisrupted && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 bg-purple-600/30 border border-purple-500/50 py-0.5 md:py-1 px-4 backdrop-blur-md"
                      >
                        <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-purple-400 animate-pulse" />
                        <span className="text-purple-400 text-[7px] md:text-sm font-bold tracking-[0.1em] animate-pulse text-center">
                          COGNITIVE DISRUPTOR DETECTED
                        </span>
                      </motion.div>
                    )}
                    {showDisruptorDestroyed && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 bg-orange-600/30 border border-orange-500/50 py-0.5 md:py-1 px-4 backdrop-blur-md"
                      >
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
                        <span className="text-white text-[7px] md:text-sm font-bold tracking-[0.1em] text-center">
                          DISRUPTOR DESTROYED
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Main Game Area */}
                <div className={`flex-1 flex flex-col items-center justify-center w-full relative ${isDisrupted ? 'animate-flicker' : ''}`}>
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
                  
                  {/* Combo Display */}
                  <AnimatePresence>
                    {combo > 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute top-1/2 right-1 md:right-8 flex flex-col items-center z-20"
                      >
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Zap className="w-3 h-3 md:w-6 md:h-6 fill-yellow-400" />
                          <span className="text-lg md:text-4xl font-black italic text-glow-yellow">x{combo}</span>
                        </div>
                        <span className="text-[6px] md:text-[10px] font-bold tracking-[0.1em] text-white/60">COMBO</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Controls & Timer */}
                <div className="w-full flex flex-col items-center gap-1 md:gap-2">
                  <div className="w-full px-2 max-w-2xl">
                    <div className="relative h-2 md:h-4 bg-black/60 border md:border-[2px] border-white/20 overflow-hidden">
                      <motion.div 
                        className={`absolute inset-y-0 left-0 shadow-[0_0_10px_rgba(250,204,21,0.6)] ${isDisrupted ? 'bg-purple-500' : 'bg-yellow-400'}`}
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
              className="flex flex-col items-center text-center z-30 bg-black/60 p-4 md:p-12 border-y-[2px] md:border-y-[4px] border-yellow-400 w-full"
            >
              <h2 className="text-2xl md:text-5xl font-black text-yellow-400 mb-1 md:mb-2 italic tracking-tighter text-glow-yellow leading-none">
                ROUND COMPLETE
              </h2>
              <div className="h-0.5 w-16 md:h-1 md:w-[12rem] bg-white/20 mb-4 md:mb-4" />
              <p className="text-[10px] md:text-2xl font-bold text-white mb-2 md:mb-2 tracking-widest">PREPARING NEXT WAVE</p>
              <div className="text-2xl md:text-4xl font-black text-yellow-400 animate-pulse">
                {Math.ceil(breakTimeLeft)}S
              </div>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center w-full h-full z-10 px-4 overflow-y-auto max-h-full py-2 md:py-4"
            >
              <h2 className="text-2xl md:text-5xl font-black text-red-500 mb-2 md:mb-4 italic tracking-tighter drop-shadow-[0_0_40px_rgba(239,68,68,0.5)] leading-none">
                MISSION FAILED
              </h2>

              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4 bg-yellow-400/10 border border-yellow-400/30 px-3 md:px-6 py-1 md:py-1.5">
                <Trophy className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                <div className="flex flex-col">
                  <span className="text-[6px] md:text-[9px] text-white/60 font-bold tracking-widest">CURRENT RANK</span>
                  <span className="text-xs md:text-lg font-black text-yellow-400 italic">{getRank(level)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-2 md:gap-x-16 gap-y-1 md:gap-y-4 w-full max-w-[800px] bg-black/40 p-3 md:p-6 border md:border-[2px] border-white/10">
                <div className="text-left">
                  <p className="text-[#4ade80] text-[8px] md:text-xl font-bold tracking-widest">ROUND BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-sm md:text-3xl font-black">{stats.roundBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-[8px] md:text-xl font-bold tracking-widest">TIME BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-sm md:text-3xl font-black">{stats.timeBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-[8px] md:text-xl font-bold tracking-widest">MAX COMBO</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-sm md:text-3xl font-black">{stats.maxCombo}</p>
                </div>

                <div className="col-span-2 h-[1px] md:h-[1px] bg-white/20 my-1 md:my-2" />

                <div className="text-left">
                  <p className="text-[#4ade80] text-[10px] md:text-2xl font-black tracking-[0.1em]">TOTAL SCORE</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-lg md:text-5xl font-black text-glow-yellow leading-none">{stats.totalScore}</p>
                </div>

                <div className="col-span-2 flex justify-center mt-1 pt-1 border-t border-white/10">
                  <p className="text-white/40 text-[8px] md:text-lg tracking-[0.1em]">
                    HIGH SCORE: <span className="text-yellow-400/60">{highScore}</span>
                  </p>
                </div>
              </div>

              <p className="mt-4 md:mt-8 text-white/40 text-[10px] md:text-lg font-bold animate-pulse tracking-[0.1em] text-center">
                {('ontouchstart' in window) ? 'TAP TO REDEPLOY' : 'PRESS ANY KEY TO REDEPLOY'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0.5 md:bottom-2 left-0 right-0 flex justify-center z-30 opacity-30 scale-[0.4] md:scale-75">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;