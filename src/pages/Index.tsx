"use client";

import React, { useState, useEffect } from "react";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import TouchControls from "@/components/TouchControls";
import { motion, AnimatePresence } from "framer-motion";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

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

  useEffect(() => {
    const handleGlobalKey = () => {
      if (gameState === "idle" || gameState === "gameover") {
        startGame();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [gameState, startGame]);

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center p-0 overflow-hidden">
      <div className="w-full h-screen max-w-full bg-[#121616] relative flex flex-col items-center justify-center px-4 md:px-12 crt-screen border-x-[8px] border-[#1a1f1f]">
        
        <div className="absolute inset-2 border-[4px] border-yellow-400/80 shadow-[inset_0_0_20px_rgba(250,204,21,0.3),0_0_20px_rgba(250,204,21,0.3)] pointer-events-none z-50" />

        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-10"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-4 italic drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] leading-none">
                STRATAGEM HERO
              </h1>
              <div className="h-1 w-48 md:h-1.5 md:w-[25rem] bg-yellow-400 mb-8 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
              
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-yellow-400 text-xl md:text-4xl font-bold tracking-[0.4em] text-glow-yellow mb-12"
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

              <div className="md:hidden" onClick={() => startGame()}>
                <TouchControls onInput={handleInput} className="opacity-50 pointer-events-none" />
              </div>
              
              <div className="mt-12 text-white/40 text-lg md:text-xl tracking-widest">
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
              className="w-full h-full flex flex-col items-center justify-center z-10 py-4 md:py-12"
            >
              <div className="flex flex-col items-center justify-between h-full w-full max-w-[1100px] mx-auto relative">
                <div className="absolute top-0 md:top-4 left-0 right-0 flex flex-col gap-2 z-50">
                  <AnimatePresence>
                    {isDisrupted && (
                      <motion.div 
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3 bg-purple-600/30 border-2 border-purple-500/50 py-1 md:py-2 px-4 md:px-8 backdrop-blur-md"
                      >
                        <AlertTriangle className="w-4 h-4 md:w-6 md:h-6 text-purple-400 animate-pulse" />
                        <span className="text-purple-400 text-sm md:text-lg font-bold tracking-[0.2em] animate-pulse text-center">
                          COGNITIVE DISRUPTOR DETECTED
                        </span>
                      </motion.div>
                    )}
                    {showDisruptorDestroyed && (
                      <motion.div 
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3 bg-orange-600/30 border-2 border-orange-500/50 py-1 md:py-2 px-4 md:px-8 backdrop-blur-md"
                      >
                        <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-orange-400" />
                        <span className="text-white text-sm md:text-lg font-bold tracking-[0.2em] text-center">
                          DISRUPTOR DESTROYED
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className={`flex-1 flex flex-col items-center justify-center w-full ${isDisrupted ? 'animate-flicker' : ''}`}>
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
                </div>

                <div className="w-full flex flex-col items-center gap-4 md:gap-8">
                  <div className="w-full px-4 max-w-3xl">
                    <div className="relative h-4 md:h-6 bg-black/60 border-2 md:border-[3px] border-white/20 overflow-hidden">
                      <motion.div 
                        className={`absolute inset-y-0 left-0 shadow-[0_0_15px_rgba(250,204,21,0.8)] ${isDisrupted ? 'bg-purple-500' : 'bg-yellow-400'}`}
                        style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>

                  <div className="md:hidden pb-4">
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
              className="flex flex-col items-center text-center z-30 bg-black/60 p-10 md:p-20 border-y-[4px] md:border-y-[8px] border-yellow-400 w-full"
            >
              <h2 className="text-4xl md:text-7xl font-black text-yellow-400 mb-4 italic tracking-tighter text-glow-yellow leading-none">
                ROUND COMPLETE
              </h2>
              <div className="h-1 w-32 md:h-1.5 md:w-[20rem] bg-white/20 mb-8" />
              <p className="text-xl md:text-4xl font-bold text-white mb-6 tracking-widest">PREPARING NEXT WAVE</p>
              <div className="text-4xl md:text-6xl font-black text-yellow-400 animate-pulse">
                {Math.ceil(breakTimeLeft)}S
              </div>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center w-full z-10 px-4 overflow-y-auto max-h-full py-8"
            >
              <h2 className="text-4xl md:text-7xl font-black text-red-500 mb-8 md:mb-12 italic tracking-tighter drop-shadow-[0_0_40px_rgba(239,68,68,0.5)] leading-none">
                MISSION FAILED
              </h2>

              <div className="grid grid-cols-2 gap-x-8 md:gap-x-32 gap-y-4 md:gap-y-8 w-full max-w-[1100px] bg-black/40 p-6 md:p-12 border-2 md:border-[4px] border-white/10">
                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-3xl font-bold tracking-widest">ROUND BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl md:text-5xl font-black">{stats.roundBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-3xl font-bold tracking-widest">TIME BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl md:text-5xl font-black">{stats.timeBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-3xl font-bold tracking-widest">PERFECT BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl md:text-5xl font-black">{stats.perfectBonus}</p>
                </div>

                <div className="col-span-2 h-[2px] bg-white/20 my-2 md:my-6" />

                <div className="text-left">
                  <p className="text-[#4ade80] text-lg md:text-4xl font-black tracking-[0.2em]">TOTAL SCORE</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-4xl md:text-7xl font-black text-glow-yellow leading-none">{stats.totalScore}</p>
                </div>

                <div className="col-span-2 flex justify-center mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/40 text-sm md:text-2xl tracking-[0.3em]">
                    HIGH SCORE: <span className="text-yellow-400/60">{highScore}</span>
                  </p>
                </div>
              </div>

              <p className="mt-8 md:mt-16 text-white/40 text-lg md:text-2xl font-bold animate-pulse tracking-[0.3em] md:tracking-[0.5em] text-center">
                {('ontouchstart' in window) ? 'TAP TO REDEPLOY' : 'PRESS ANY KEY TO REDEPLOY'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center z-30 opacity-30 scale-75 md:scale-100">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;