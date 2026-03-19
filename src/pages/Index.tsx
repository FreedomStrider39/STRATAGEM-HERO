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
    breakTimeLeft,
    missionQueue,
    currentQueueIndex,
    inputIndex,
    lastInputCorrect,
    startGame,
    handleInput
  } = useStratagemGame();

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("stratagem-hero-highscore");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("stratagem-hero-highscore", score.toString());
    }
  }, [score, highScore]);

  const currentStratagem = missionQueue[currentQueueIndex];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black overflow-hidden flex flex-col items-center justify-center relative">
      {/* Top and Bottom Glowing Lines */}
      <div className="absolute top-12 left-0 right-0 h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20" />
      <div className="absolute bottom-12 left-0 right-0 h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20" />

      {/* Background Logo (Super Earth) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <img 
          src="https://raw.githubusercontent.com/DmitrySandalov/helldivers-2-stratagems/main/icons/reinforce.png" 
          className="w-[600px] h-[600px] grayscale brightness-200"
          alt="Super Earth Logo"
        />
      </div>

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
            <h1 className="text-8xl font-black tracking-tighter text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              STRATAGEM HERO
            </h1>
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-yellow-400 text-2xl font-bold tracking-tight drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
            >
              Press any Stratagem Input to Start!
            </motion.p>
            
            <div className="absolute bottom-24 flex gap-2 opacity-30">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-white rotate-45" />
              ))}
            </div>
          </motion.div>
        )}

        {gameState === "break" && (
          <motion.div 
            key="break"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center z-30 bg-black/80 p-12 border-y-4 border-yellow-400 w-full"
          >
            <h2 className="text-6xl font-black text-yellow-400 mb-4 italic tracking-tighter">
              LEVEL COMPLETE
            </h2>
            <p className="text-2xl font-bold text-white mb-2">PREPARING ROUND {level + 1}</p>
            <div className="text-4xl font-black text-white animate-pulse">
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
            className="flex flex-col items-center w-full max-w-5xl z-10 px-12"
          >
            {/* HUD Layout */}
            <div className="w-full grid grid-cols-3 items-center mb-8">
              <div className="flex flex-col items-start">
                <span className="text-white font-bold text-xl">Round</span>
                <span className="text-yellow-400 text-5xl font-black leading-none">{level}</span>
              </div>

              <div className="flex flex-col items-center">
                <MissionQueue queue={missionQueue} currentIndex={currentQueueIndex} />
              </div>

              <div className="flex flex-col items-end">
                <span className="text-yellow-400 text-5xl font-black leading-none drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                  {score}
                </span>
                <span className="text-white font-bold text-xl tracking-widest">SCORE</span>
              </div>
            </div>

            {currentStratagem && (
              <StratagemDisplay 
                stratagem={currentStratagem} 
                currentIndex={inputIndex}
                isError={lastInputCorrect === false}
              />
            )}

            <div className="w-full max-w-3xl mt-12">
              <div className="relative h-6 bg-gray-700/50 border-2 border-gray-600 overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            <div className="mt-8 flex gap-2 opacity-30">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-white rotate-45" />
              ))}
            </div>

            <div className="md:hidden mt-8">
              <GameControls onInput={handleInput} />
            </div>
          </motion.div>
        )}

        {gameState === "gameover" && (
          <motion.div 
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center z-10 cursor-pointer"
            onClick={startGame}
          >
            <h2 className="text-7xl font-black text-red-600 mb-2 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              MISSION FAILED
            </h2>
            <div className="bg-white/10 p-6 border-2 border-white/20 mb-8">
              <p className="text-yellow-400 text-xl font-bold mb-1">FINAL SCORE</p>
              <p className="text-6xl font-black">{score}</p>
            </div>
            <p className="text-white/50 font-bold animate-pulse">CLICK TO REDEPLOY</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;