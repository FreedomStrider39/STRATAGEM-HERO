import React, { useState, useEffect } from "react";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import GameControls from "@/components/GameControls";
import { motion, AnimatePresence } from "framer-motion";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
    // Detect if the device has a touch screen (phones/tablets)
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (gameState === "gameover" && stats.totalScore > highScore) {
      setHighScore(stats.totalScore);
      localStorage.setItem("stratagem-hero-highscore", stats.totalScore.toString());
    }
  }, [gameState, stats.totalScore, highScore]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0c0c] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center p-0 overflow-hidden">
      <div className="w-full h-[100dvh] max-w-[1920px] bg-[#121616] relative flex flex-col items-center justify-center px-4 md:px-12 crt-screen border-x-0 md:border-x-8 border-[#1a1f1f]">
        
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
              <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-white mb-4 italic drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                STRATAGEM HERO
              </h1>
              <div className="h-1 w-48 md:w-96 bg-yellow-400 mb-8 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-yellow-400 text-xl md:text-4xl font-bold tracking-[0.4em] text-glow-yellow"
              >
                {isTouchDevice ? "TAP TO START" : "PRESS ANY KEY TO START"}
              </motion.p>
              
              <div className="mt-12 text-white/40 text-xs md:text-xl tracking-widest">
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
              className="w-full h-full flex flex-col md:grid md:grid-cols-[300px_1fr_300px] items-center gap-2 md:gap-8 z-10 py-4 md:py-12"
            >
              <div className="hidden md:flex flex-col items-center justify-center border-r-2 border-white/10 h-full">
                <span className="text-[#4ade80] text-2xl font-bold tracking-[0.2em] mb-4">ROUND</span>
                <span className="text-yellow-400 text-9xl font-black leading-none text-glow-yellow">
                  {level}
                </span>
              </div>

              <div className="flex flex-col items-center justify-between h-full w-full max-w-[1200px] mx-auto relative">
                {/* Challenge Warnings */}
                <div className="absolute top-0 left-0 right-0 flex flex-col gap-1 z-50">
                  <AnimatePresence>
                    {isDisrupted && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 bg-purple-600/20 border border-purple-500/50 py-2 px-6 backdrop-blur-sm"
                      >
                        <AlertTriangle className="w-6 h-6 text-purple-400 animate-pulse" />
                        <span className="text-purple-400 text-xs md:text-lg font-bold tracking-[0.2em] animate-pulse text-center">
                          COGNITIVE DISRUPTOR DETECTED
                        </span>
                      </motion.div>
                    )}
                    {showDisruptorDestroyed && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 bg-orange-600/20 border border-orange-500/50 py-2 px-6 backdrop-blur-sm"
                      >
                        <CheckCircle2 className="w-6 h-6 text-orange-400" />
                        <span className="text-white text-xs md:text-lg font-bold tracking-[0.2em] text-center">
                          DISRUPTOR DESTROYED
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex md:hidden w-full justify-between items-end px-4 pt-8 mb-2">
                  <div className="flex flex-col items-start">
                    <span className="text-[#4ade80] text-[10px] font-bold tracking-widest">ROUND</span>
                    <span className="text-yellow-400 text-3xl font-black leading-none">{level}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-yellow-400 text-3xl font-black leading-none">{score}</span>
                    <span className="text-[#4ade80] text-[10px] font-bold tracking-widest">SCORE</span>
                  </div>
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
                    />
                  )}
                </div>

                <div className="w-full px-4 mt-4">
                  <div className="relative h-4 md:h-12 bg-black/60 border-2 md:border-4 border-white/20 overflow-hidden">
                    <motion.div 
                      className={`absolute inset-y-0 left-0 shadow-[0_0_30px_rgba(250,204,21,0.8)] ${isDisrupted ? 'bg-purple-500' : 'bg-yellow-400'}`}
                      style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[8px] md:text-sm font-bold tracking-[0.5em] text-white/60">REMAINING TIME</span>
                    </div>
                  </div>
                </div>

                {/* On-screen controls: Strictly only rendered if it's a touch device AND not on a large screen */}
                {isTouchDevice && (
                  <div className="md:hidden mt-4 mb-8 scale-90 origin-bottom">
                    <GameControls onInput={handleInput} />
                  </div>
                )}
              </div>

              <div className="hidden md:flex flex-col items-center justify-center border-l-2 border-white/10 h-full">
                <span className="text-yellow-400 text-9xl font-black leading-none text-glow-yellow">
                  {score}
                </span>
                <span className="text-[#4ade80] text-2xl font-bold tracking-[0.2em] mt-4">SCORE</span>
              </div>
            </motion.div>
          )}

          {gameState === "break" && (
            <motion.div 
              key="break"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center z-30 bg-black/60 p-8 md:p-24 border-y-8 border-yellow-400 w-full"
            >
              <h2 className="text-4xl md:text-9xl font-black text-yellow-400 mb-4 italic tracking-tighter text-glow-yellow">
                ROUND COMPLETE
              </h2>
              <div className="h-2 w-32 md:w-64 bg-white/20 mb-8" />
              <p className="text-xl md:text-5xl font-bold text-white mb-4 tracking-widest">PREPARING NEXT WAVE</p>
              <div className="text-3xl md:text-7xl font-black text-yellow-400 animate-pulse">
                {Math.ceil(breakTimeLeft)}S
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
              <h2 className="text-4xl md:text-9xl font-black text-red-500 mb-6 md:mb-12 italic tracking-tighter drop-shadow-[0_0_40px_rgba(239,68,68,0.6)]">
                MISSION FAILED
              </h2>

              <div className="grid grid-cols-2 gap-x-6 md:gap-x-32 gap-y-2 md:gap-y-8 w-full max-w-5xl bg-black/40 p-6 md:p-12 border-4 border-white/10">
                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-3xl font-bold tracking-widest">ROUND BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-lg md:text-5xl font-black">{stats.roundBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-3xl font-bold tracking-widest">TIME BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-lg md:text-5xl font-black">{stats.timeBonus}</p>
                </div>

                <div className="text-left">
                  <p className="text-[#4ade80] text-sm md:text-3xl font-bold tracking-widest">PERFECT BONUS</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-lg md:text-5xl font-black">{stats.perfectBonus}</p>
                </div>

                <div className="col-span-2 h-[1px] md:h-[4px] bg-white/20 my-1 md:my-4" />

                <div className="text-left">
                  <p className="text-[#4ade80] text-lg md:text-5xl font-black tracking-[0.1em] md:tracking-[0.2em]">TOTAL SCORE</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl md:text-8xl font-black text-glow-yellow">{stats.totalScore}</p>
                </div>

                <div className="col-span-2 flex justify-center mt-4 pt-4 border-t-2 border-white/10">
                  <p className="text-white/40 text-[10px] md:text-2xl tracking-[0.2em] md:tracking-[0.3em]">
                    HIGH SCORE: <span className="text-yellow-400/60">{highScore}</span>
                  </p>
                </div>
              </div>

              <p className="mt-8 md:mt-16 text-white/40 text-xs md:text-2xl font-bold animate-pulse tracking-[0.3em] md:tracking-[0.5em]">
                {isTouchDevice ? "TAP TO REDEPLOY" : "CLICK TO REDEPLOY"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-30 opacity-30">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;