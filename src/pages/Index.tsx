import React, { useState, useEffect } from "react";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import GameControls from "@/components/GameControls";
import MissionQueue from "@/components/MissionQueue";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center p-4">
      {/* Mobile-Sized Container */}
      <div className="w-full max-w-[450px] aspect-[9/16] bg-[#0a0f0f] relative overflow-hidden border-x-2 border-white/10 shadow-2xl flex flex-col items-center justify-center">
        
        {/* Top and Bottom Glowing Lines (Cyan) */}
        <div className="absolute top-8 left-0 right-0 h-[3px] bg-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.8)] z-20" />
        <div className="absolute bottom-8 left-0 right-0 h-[3px] bg-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.8)] z-20" />

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
              <h1 className="text-5xl font-bold tracking-tighter text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                STRATAGEM HERO
              </h1>
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-yellow-400 text-xl font-bold tracking-widest drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              >
                TAP TO START
              </motion.p>
            </motion.div>
          )}

          {gameState === "break" && (
            <motion.div 
              key="break"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-30 bg-black/80 p-8 border-y-4 border-yellow-400 w-full"
            >
              <h2 className="text-4xl font-bold text-yellow-400 mb-2 italic tracking-tighter">
                LEVEL COMPLETE
              </h2>
              <p className="text-lg font-bold text-white mb-1">PREPARING ROUND {level + 1}</p>
              <div className="text-3xl font-bold text-white animate-pulse">
                {Math.ceil(breakTimeLeft)}s
              </div>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div 
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center w-full z-10 px-6"
            >
              <div className="w-full flex justify-between items-center mb-8">
                <div className="flex flex-col items-start">
                  <span className="text-white font-bold text-xs opacity-70">Round</span>
                  <span className="text-yellow-400 text-4xl font-bold leading-none">{level}</span>
                </div>
                <MissionQueue queue={missionQueue} currentIndex={currentQueueIndex} />
                <div className="flex flex-col items-end">
                  <span className="text-yellow-400 text-4xl font-bold leading-none">
                    {score}
                  </span>
                  <span className="text-white font-bold text-xs tracking-widest opacity-70">SCORE</span>
                </div>
              </div>

              {missionQueue[currentQueueIndex] && (
                <StratagemDisplay 
                  stratagem={missionQueue[currentQueueIndex]} 
                  currentIndex={inputIndex}
                  isError={lastInputCorrect === false}
                />
              )}

              <div className="w-full mt-10">
                <div className="relative h-5 bg-gray-900 border border-gray-700 overflow-hidden">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                    style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              <div className="mt-10">
                <GameControls onInput={handleInput} />
              </div>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center w-full z-10 cursor-pointer px-4"
              onClick={startGame}
            >
              <div className="relative w-full flex flex-col items-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <img 
                    src="https://raw.githubusercontent.com/DmitrySandalov/helldivers-2-stratagems/main/icons/reinforce.png" 
                    className="w-[250px] h-[250px] grayscale brightness-200"
                    alt="Super Earth Logo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full relative z-10">
                  <div className="text-left">
                    <p className="text-[#00ff00] text-sm font-bold tracking-wider">ROUND BONUS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#ccff00] text-2xl font-bold drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]">{stats.roundBonus}</p>
                  </div>

                  <div className="text-left">
                    <p className="text-[#00ff00] text-sm font-bold tracking-wider">TIME BONUS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#ccff00] text-2xl font-bold drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]">{stats.timeBonus}</p>
                  </div>

                  <div className="text-left">
                    <p className="text-[#00ff00] text-sm font-bold tracking-wider">PERFECT BONUS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#ccff00] text-2xl font-bold drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]">{stats.perfectBonus}</p>
                  </div>

                  <div className="col-span-2 h-[1px] bg-white/20 my-2" />

                  <div className="text-left">
                    <p className="text-[#00ff00] text-xl font-bold tracking-widest">TOTAL SCORE</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#ccff00] text-4xl font-bold drop-shadow-[0_0_12px_rgba(204,255,0,1)]">{stats.totalScore}</p>
                  </div>
                </div>

                <p className="mt-12 text-white/40 text-xs font-bold animate-pulse tracking-widest">TAP TO REDEPLOY</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;