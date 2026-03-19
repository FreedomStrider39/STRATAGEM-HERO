import React, { useState, useEffect } from "react";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import GameControls from "@/components/GameControls";
import { motion, AnimatePresence } from "framer-motion";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
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
    stats,
    startGame,
    handleInput
  } = useStratagemGame();

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("stratagem-hero-highscore");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    if (stats.totalScore > highScore) {
      setHighScore(stats.totalScore);
      localStorage.setItem("stratagem-hero-highscore", stats.totalScore.toString());
    }
  }, [stats.totalScore, highScore]);

  return (
    <div className="min-h-screen bg-[#0a0c0c] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center p-0 overflow-hidden">
      {/* Main Game Container with CRT Effect */}
      <div className="w-full h-screen max-w-[1400px] bg-[#121616] relative flex flex-col items-center justify-center px-4 md:px-12 crt-screen border-x-8 border-[#1a1f1f]">
        
        {/* Top and Bottom Glowing Lines (Cyan) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20" />

        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-10 cursor-pointer px-6"
              onClick={startGame}
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4 italic drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                STRATAGEM HERO
              </h1>
              <div className="h-1 w-64 bg-yellow-400 mb-8 shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-yellow-400 text-2xl md:text-3xl font-bold tracking-[0.4em] text-glow-yellow"
              >
                {isMobile ? "TAP TO START" : "PRESS ANY KEY TO START"}
              </motion.p>
              
              <div className="mt-12 text-white/40 text-sm tracking-widest">
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
              className="w-full h-full flex flex-col md:grid md:grid-cols-[250px_1fr_250px] items-center gap-4 z-10 py-12"
            >
              {/* Left Panel: Round (Desktop) */}
              <div className="hidden md:flex flex-col items-center justify-center border-r-2 border-white/10 h-full">
                <span className="text-[#4ade80] text-2xl font-bold tracking-[0.2em] mb-2">ROUND</span>
                <span className="text-yellow-400 text-8xl font-black leading-none text-glow-yellow">
                  {level}
                </span>
              </div>

              {/* Center: Game Area */}
              <div className="flex flex-col items-center justify-between h-full w-full max-w-[700px] mx-auto">
                {/* Mobile Stats Header */}
                <div className="flex md:hidden w-full justify-between items-end px-4 mb-4">
                  <div className="flex flex-col items-start">
                    <span className="text-[#4ade80] text-xs font-bold tracking-widest">ROUND</span>
                    <span className="text-yellow-400 text-4xl font-black leading-none">{level}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-yellow-400 text-4xl font-black leading-none">{score}</span>
                    <span className="text-[#4ade80] text-xs font-bold tracking-widest">SCORE</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  {missionQueue[currentQueueIndex] && (
                    <StratagemDisplay 
                      stratagem={missionQueue[currentQueueIndex]} 
                      currentIndex={inputIndex}
                      isError={lastInputCorrect === false}
                      queue={missionQueue.slice(currentQueueIndex)}
                    />
                  )}
                </div>

                {/* Timer Bar - Positioned at bottom of center area */}
                <div className="w-full px-4 mt-8">
                  <div className="relative h-6 md:h-8 bg-black/60 border-2 border-white/20 overflow-hidden">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]"
                      style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold tracking-[0.5em] text-white/40">REMAINING TIME</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Controls */}
                {isMobile && (
                  <div className="mt-8 scale-90">
                    <GameControls onInput={handleInput} />
                  </div>
                )}
              </div>

              {/* Right Panel: Score (Desktop) */}
              <div className="hidden md:flex flex-col items-center justify-center border-l-2 border-white/10 h-full">
                <span className="text-yellow-400 text-8xl font-black leading-none text-glow-yellow">
                  {score}
                </span>
                <span className="text-[#4ade80] text-2xl font-bold tracking-[0.2em] mt-2">SCORE</span>
              </div>
            </motion.div>
          )}

          {gameState === "break" && (
            <motion.div 
              key="break"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-30 bg-black/60 p-12 border-y-4 border-yellow-400 w-full"
            >
              <h2 className="text-5xl md:text-7xl font-black text-yellow-400 mb-4 italic tracking-tighter text-glow-yellow">
                ROUND COMPLETE
              </h2>
              <div className="h-1 w-48 bg-white/20 mb-6" />
              <p className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-widest">PREPARING NEXT WAVE</p>
              <div className="text-4xl md:text-5xl font-black text-yellow-400 animate-pulse">
                {Math.ceil(breakTimeLeft)}S
              </div>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center w-full z-10 cursor-pointer px-6"
              onClick={startGame}
            >
              <h2 className="text-5xl md:text-7xl font-black text-red-500 mb-12 italic tracking-tighter drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                MISSION FAILED
              </h2>

              <div className="grid grid-cols-2 gap-x-12 md:gap-x-24 gap-y-6 w-full max-w-3xl bg-black/40 p-8 border-2 border-white/10">
                <div className="text-left">
                  <p className="text-[#4ade80] text-lg md:text-2xl font-bold tracking-widest">ROUND BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-3xl md:text-5xl font-black">{stats.roundBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-lg md:text-2xl font-bold tracking-widest">TIME BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-3xl md:text-5xl font-black">{stats.timeBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-lg md:text-2xl font-bold tracking-widest">PERFECT BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-3xl md:text-5xl font-black">{stats.perfectBonus}</p>
                </div>

                <div className="col-span-2 h-[2px] bg-white/20 my-4" />

                <div className="text-left">
                  <p className="text-[#4ade80] text-2xl md:text-4xl font-black tracking-[0.2em]">TOTAL SCORE</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-5xl md:text-8xl font-black text-glow-yellow">{stats.totalScore}</p>
                </div>
              </div>

              <p className="mt-16 text-white/40 text-sm md:text-base font-bold animate-pulse tracking-[0.5em]">
                {isMobile ? "TAP TO REDEPLOY" : "CLICK TO REDEPLOY"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30 opacity-50">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;