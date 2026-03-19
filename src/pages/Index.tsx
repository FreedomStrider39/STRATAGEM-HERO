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
    <div className="min-h-screen bg-[#1a1f1f] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center p-0 overflow-hidden">
      {/* Main Game Container */}
      <div className="w-full h-screen max-w-[1200px] bg-[#242929] relative flex flex-col items-center justify-center px-4 md:px-12">
        
        {/* Top and Bottom Glowing Lines (Cyan) */}
        <div className="absolute top-8 md:top-12 left-0 right-0 h-[3px] md:h-[4px] bg-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20" />
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 h-[3px] md:h-[4px] bg-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20" />

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
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] italic">
                STRATAGEM HERO
              </h1>
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-yellow-400 text-xl md:text-2xl font-bold tracking-[0.3em] drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              >
                {isMobile ? "TAP TO START" : "PRESS ANY KEY TO START"}
              </motion.p>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div 
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8 z-10"
            >
              {/* Stats Row for Mobile */}
              <div className="flex md:hidden w-full justify-between items-end mb-2">
                <div className="flex flex-col items-start">
                  <span className="text-[#4ade80] text-xs font-bold tracking-widest">ROUND</span>
                  <span className="text-yellow-400 text-4xl font-black leading-none">{level}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-yellow-400 text-4xl font-black leading-none">{score}</span>
                  <span className="text-[#4ade80] text-xs font-bold tracking-widest">SCORE</span>
                </div>
              </div>

              {/* Left: Round (Desktop) */}
              <div className="hidden md:flex flex-col items-start">
                <span className="text-[#4ade80] text-xl font-bold tracking-widest mb-1">ROUND</span>
                <span className="text-yellow-400 text-7xl font-black leading-none drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                  {level}
                </span>
              </div>

              {/* Center: Game Area */}
              <div className="flex flex-col items-center w-full md:w-[600px]">
                {missionQueue[currentQueueIndex] && (
                  <StratagemDisplay 
                    stratagem={missionQueue[currentQueueIndex]} 
                    currentIndex={inputIndex}
                    isError={lastInputCorrect === false}
                    queue={missionQueue.slice(currentQueueIndex)}
                  />
                )}

                {/* Timer Bar */}
                <div className="w-full px-2 md:px-4 mb-6">
                  <div className="relative h-4 md:h-6 bg-[#3a3f3f] overflow-hidden">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]"
                      style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Mobile Controls */}
                {isMobile && (
                  <div className="mt-4 scale-90">
                    <GameControls onInput={handleInput} />
                  </div>
                )}
              </div>

              {/* Right: Score (Desktop) */}
              <div className="hidden md:flex flex-col items-end">
                <span className="text-yellow-400 text-7xl font-black leading-none drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                  {score}
                </span>
                <span className="text-[#4ade80] text-xl font-bold tracking-widest mt-1">SCORE</span>
              </div>
            </motion.div>
          )}

          {gameState === "break" && (
            <motion.div 
              key="break"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-30 bg-black/40 p-8 md:p-12 border-y-4 border-yellow-400 w-full"
            >
              <h2 className="text-4xl md:text-6xl font-black text-yellow-400 mb-4 italic tracking-tighter">
                LEVEL COMPLETE
              </h2>
              <p className="text-xl md:text-2xl font-bold text-white mb-2">PREPARING ROUND {level + 1}</p>
              <div className="text-3xl md:text-4xl font-black text-white animate-pulse">
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
              <div className="grid grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4 md:gap-y-6 w-full max-w-2xl">
                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-xl font-bold tracking-widest">ROUND BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl md:text-4xl font-black">{stats.roundBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-xl font-bold tracking-widest">TIME BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl md:text-4xl font-black">{stats.timeBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-xl font-bold tracking-widest">PERFECT BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl md:text-4xl font-black">{stats.perfectBonus}</p>
                </div>

                <div className="col-span-2 h-[1px] md:h-[2px] bg-white/10 my-2 md:my-4" />

                <div className="text-left">
                  <p className="text-[#4ade80] text-xl md:text-3xl font-black tracking-[0.2em]">TOTAL SCORE</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-4xl md:text-6xl font-black drop-shadow-[0_0_20px_rgba(250,204,21,1)]">{stats.totalScore}</p>
                </div>
              </div>

              <p className="mt-12 md:mt-16 text-white/40 text-xs md:text-sm font-bold animate-pulse tracking-[0.4em]">
                {isMobile ? "TAP TO REDEPLOY" : "CLICK TO REDEPLOY"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center z-30">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;