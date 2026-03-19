import React, { useState, useEffect } from "react";
import { useStratagemGame } from "@/hooks/useStratagemGame";
import StratagemDisplay from "@/components/StratagemDisplay";
import GameControls from "@/components/GameControls";
import MissionQueue from "@/components/MissionQueue";
import { getRank } from "@/data/stratagems";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Shield, CheckCircle2, Timer, Zap } from "lucide-react";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-400 selection:text-black overflow-hidden flex flex-col items-center justify-center p-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

      {/* Header Info */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
        <div className="flex flex-col">
          <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.3em]">Current Rank</span>
          <span className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">{getRank(level)}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.3em]">High Score</span>
          <span className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">{highScore.toLocaleString()}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === "idle" && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center text-center space-y-8 z-10"
          >
            <div className="relative">
              <Shield className="w-32 h-32 text-yellow-400 mb-4 animate-pulse" />
              <div className="absolute inset-0 blur-2xl bg-yellow-400/20 rounded-full" />
            </div>
            <div>
              <h1 className="text-6xl font-black italic uppercase tracking-tighter text-yellow-400 leading-none">
                Stratagem<br />Hero
              </h1>
              <p className="text-gray-400 mt-4 font-bold uppercase tracking-widest max-w-xs">
                Practice your combinations for the glory of Super Earth.
              </p>
            </div>
            <Button 
              onClick={startGame}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase italic text-xl px-12 py-8 rounded-none skew-x-[-12deg] transition-all hover:scale-105 active:scale-95"
            >
              <Play className="mr-2 fill-current" /> Start Mission
            </Button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-2xl z-10"
          >
            {/* Game Stats */}
            <div className="w-full flex justify-between items-end mb-4 px-4">
              <div className="flex flex-col">
                <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.2em]">Score</span>
                <span className="text-4xl font-black italic tracking-tighter">{score.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 text-yellow-400 mb-1">
                  <Zap className="w-3 h-3 fill-current" />
                  <span className="font-black text-[10px] uppercase tracking-[0.2em]">Level {level}</span>
                </div>
                <span className="text-xl font-black italic tracking-tighter">
                  {currentQueueIndex + 1} / {missionQueue.length}
                </span>
              </div>
            </div>

            {/* Mission Queue Icons */}
            <MissionQueue queue={missionQueue} currentIndex={currentQueueIndex} />

            {/* Timer Bar */}
            <div className="w-full max-w-md mb-12 relative">
              <Progress 
                value={(timeLeft / 20) * 100} 
                className="h-2 bg-white/10 border border-white/20 rounded-none"
              />
              <div className="absolute -bottom-6 right-0 text-white/50 font-mono text-[10px]">
                {timeLeft.toFixed(1)}s
              </div>
            </div>

            {currentStratagem && (
              <StratagemDisplay 
                stratagem={currentStratagem} 
                currentIndex={inputIndex}
                isError={lastInputCorrect}
              />
            )}

            <GameControls onInput={handleInput} />
          </motion.div>
        )}

        {gameState === "break" && (
          <motion.div 
            key="break"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center space-y-8 z-10"
          >
            <div className="bg-yellow-400/10 border-2 border-yellow-400 p-8 skew-x-[-6deg] relative overflow-hidden">
              <div className="absolute inset-0 bg-yellow-400/5 animate-pulse" />
              <CheckCircle2 className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-yellow-400">
                Level {level} Clear
              </h2>
              <p className="text-white font-bold uppercase tracking-widest mt-2">
                Preparing Next Tactical Wave
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-3 text-2xl font-black italic uppercase">
                <Timer className="text-yellow-400" />
                <span>Next Mission in {breakTimeLeft.toFixed(1)}s</span>
              </div>
              <Progress 
                value={(breakTimeLeft / 5) * 100} 
                className="w-64 h-2 bg-white/10 rounded-none"
              />
            </div>
          </motion.div>
        )}

        {gameState === "gameover" && (
          <motion.div 
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-8 z-10"
          >
            <div className="bg-red-600/20 border-2 border-red-600 p-8 skew-x-[-6deg]">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-red-500">
                Mission Failed
              </h2>
              <p className="text-white font-bold uppercase tracking-widest mt-2">
                Time expired. Super Earth expects better.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
              <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10">
                <span className="text-yellow-400 font-black text-xs uppercase tracking-widest">Final Score</span>
                <span className="text-3xl font-black italic">{score.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10">
                <span className="text-yellow-400 font-black text-xs uppercase tracking-widest">Final Rank</span>
                <span className="text-xl font-black italic uppercase">{getRank(level)}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4 w-full max-w-xs">
              <Button 
                onClick={startGame}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase italic text-xl py-8 rounded-none skew-x-[-12deg] transition-all"
              >
                <RotateCcw className="mr-2" /> Redeploy
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;