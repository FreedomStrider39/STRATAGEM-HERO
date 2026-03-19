import React, { useState, useEffect } from "react";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import { motion, AnimatePresence } from "framer-motion";
import { MadeWithDyad } from "@/components/made-with-dyad";

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
      <div className="w-full h-screen max-w-[1200px] bg-[#242929] relative flex flex-col items-center justify-center px-12">
        
        {/* Top and Bottom Glowing Lines (Cyan) */}
        <div className="absolute top-12 left-0 right-0 h-[4px] bg-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20" />
        <div className="absolute bottom-12 left-0 right-0 h-[4px] bg-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20" />

        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-10 cursor-pointer"
              onClick={startGame}
            >
              <h1 className="text-7xl font-black tracking-tighter text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] italic">
                STRATAGEM HERO
              </h1>
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-yellow-400 text-2xl font-bold tracking-[0.3em] drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              >
                PRESS ANY KEY TO START
              </motion.p>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div 
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-8 z-10"
            >
              {/* Left: Round */}
              <div className="flex flex-col items-start">
                <span className="text-[#4ade80] text-xl font-bold tracking-widest mb-1">ROUND</span>
                <span className="text-yellow-400 text-7xl font-black leading-none drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                  {level}
                </span>
              </div>

              {/* Center: Game Area */}
              <div className="flex flex-col items-center w-[600px]">
                {missionQueue[currentQueueIndex] && (
                  <StratagemDisplay 
                    stratagem={missionQueue[currentQueueIndex]} 
                    currentIndex={inputIndex}
                    isError={lastInputCorrect === false}
                    queue={missionQueue.slice(currentQueueIndex)}
                  />
                )}

                {/* Timer Bar */}
                <div className="w-full px-4">
                  <div className="relative h-6 bg-[#3a3f3f] overflow-hidden">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]"
                      style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Score */}
              <div className="flex flex-col items-end">
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
              className="flex flex-col items-center text-center z-30 bg-black/40 p-12 border-y-4 border-yellow-400 w-full"
            >
              <h2 className="text-6xl font-black text-yellow-400 mb-4 italic tracking-tighter">
                LEVEL COMPLETE
              </h2>
              <p className="text-2xl font-bold text-white mb-2">PREPARING ROUND {level + 1}</p>
              <div className="text-4xl font-black text-white animate-pulse">
                {Math.ceil(breakTimeLeft)}S
              </div>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center w-full z-10 cursor-pointer"
              onClick={startGame}
            >
              <div className="grid grid-cols-2 gap-x-16 gap-y-6 w-full max-w-2xl">
                <div className="text-left">
                  <p className="text-[#4ade80] text-xl font-bold tracking-widest">ROUND BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-4xl font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">{stats.roundBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-xl font-bold tracking-widest">TIME BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-4xl font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">{stats.timeBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-xl font-bold tracking-widest">PERFECT BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-4xl font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">{stats.perfectBonus}</p>
                </div>

                <div className="col-span-2 h-[2px] bg-white/10 my-4" />

                <div className="text-left">
                  <p className="text-[#4ade80] text-3xl font-black tracking-[0.2em]">TOTAL SCORE</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-6xl font-black drop-shadow-[0_0_20px_rgba(250,204,21,1)]">{stats.totalScore}</p>
                </div>
              </div>

              <p className="mt-16 text-white/40 text-sm font-bold animate-pulse tracking-[0.4em]">CLICK TO REDEPLOY</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;