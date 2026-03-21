import React, { useState, useEffect } from "react";
import { Stratagem, Direction } from "@/data/stratagems";
import { cn } from "@/lib/utils";
import StratagemIcon from "./StratagemIcon";
import { motion } from "framer-motion";

interface StratagemDisplayProps {
  stratagem: Stratagem;
  currentIndex: number;
  isError: boolean;
  queue: Stratagem[];
  isDisrupted?: boolean;
  activeSequence: Direction[];
  round: number;
  score: number;
}

const IlluminateText = () => {
  const [glyphs, setGlyphs] = useState("");
  const symbols = "᚛᚜ᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ᚛᚜";

  useEffect(() => {
    const interval = setInterval(() => {
      let result = "";
      for (let i = 0; i < 12; i++) {
        result += symbols.charAt(Math.floor(Math.random() * symbols.length));
      }
      setGlyphs(result);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-serif tracking-[0.2em] text-purple-400 opacity-80">{glyphs}</span>;
};

const CustomArrow = ({ direction, completed, isDisrupted }: { direction: Direction, completed: boolean, isDisrupted?: boolean }) => {
  const rotation = {
    U: "rotate-0",
    D: "rotate-180",
    L: "-rotate-90",
    R: "rotate-90",
  };

  return (
    <motion.div 
      animate={isDisrupted ? {
        x: [0, Math.random() * 4 - 2, 0],
        y: [0, Math.random() * 4 - 2, 0],
        rotate: [0, Math.random() * 2 - 1, 0],
        scale: [1, 1.03, 0.97, 1]
      } : {}}
      transition={{ repeat: Infinity, duration: 0.15 }}
      className={cn(
        "transition-all duration-75 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0",
        completed ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]" : "text-[#222222]",
        isDisrupted && !completed && "text-purple-400/70"
      )}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={cn("w-full h-full", rotation[direction])}
      >
        <path d="M12 2L3 11H8V22H16V11H21L12 2Z" />
      </svg>
    </motion.div>
  );
};

const StratagemDisplay: React.FC<StratagemDisplayProps> = ({ 
  stratagem, 
  currentIndex, 
  isError, 
  queue,
  isDisrupted,
  activeSequence,
  round,
  score
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-2">
      {/* Mobile-only Round/Score Row */}
      <div className="flex md:hidden items-center justify-between w-full px-4 mb-4">
        <div className="flex flex-col items-start">
          <span className="text-white/60 text-[10px] font-bold tracking-[0.2em]">ROUND</span>
          <span className="text-yellow-400 text-3xl font-black leading-none text-glow-yellow">{round}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white/60 text-[10px] font-bold tracking-[0.2em]">SCORE</span>
          <span className="text-yellow-400 text-3xl font-black leading-none text-glow-yellow">{score}</span>
        </div>
      </div>

      {/* Main Icon + Queue Row */}
      <div className="flex items-center justify-center w-full mb-6 md:mb-12 gap-2 md:gap-12">
        {/* Desktop Round Indicator */}
        <div className="hidden md:flex flex-col items-center w-40 flex-shrink-0">
          <span className="text-white/60 text-lg font-bold tracking-[0.2em]">ROUND</span>
          <span className="text-yellow-400 text-8xl font-black leading-none text-glow-yellow">{round}</span>
        </div>

        {/* Center: Main Icon and Upcoming Queue */}
        <div className="flex items-end gap-2 md:gap-6 overflow-hidden">
          <div className={cn(
            "w-28 h-28 md:w-64 md:h-64 border-2 md:border-[6px] p-1 md:p-3 bg-black/40 relative overflow-hidden transition-colors duration-500 flex-shrink-0",
            isDisrupted ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)]" : "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]"
          )}>
            <StratagemIcon 
              url={stratagem.iconUrl} 
              category={stratagem.category} 
              className={cn(
                "w-full h-full transition-all duration-500", 
                isDisrupted && "hue-rotate-[280deg] brightness-150"
              )} 
            />
          </div>

          {/* Upcoming Queue Icons */}
          <div className="flex gap-1.5 md:gap-4 pb-1 md:pb-3">
            {queue.slice(1, 4).map((nextStrat, idx) => (
              <div key={idx} className="w-12 h-12 md:w-28 md:h-28 opacity-30 grayscale brightness-75 relative overflow-hidden border border-white/5 flex-shrink-0">
                <StratagemIcon 
                  url={nextStrat.iconUrl} 
                  category={nextStrat.category} 
                  className={cn(
                    "w-full h-full", 
                    isDisrupted && "hue-rotate-[280deg]"
                  )} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Score Indicator */}
        <div className="hidden md:flex flex-col items-center w-40 flex-shrink-0">
          <span className="text-white/60 text-lg font-bold tracking-[0.2em]">SCORE</span>
          <span className="text-yellow-400 text-8xl font-black leading-none text-glow-yellow">{score}</span>
        </div>
      </div>

      {/* Name Bar */}
      <div className={cn(
        "w-full py-3 md:py-6 px-4 md:px-12 mb-6 md:mb-10 transition-all duration-500",
        isDisrupted ? "bg-purple-900/90 border-y-2 border-purple-500/50" : "bg-yellow-400"
      )}>
        <h2 className={cn(
          "text-base md:text-4xl font-black text-center tracking-[0.1em] md:tracking-[0.2em] min-h-[1.5rem] md:min-h-[3rem] flex items-center justify-center",
          isDisrupted ? "text-purple-100" : "text-black"
        )}>
          {isDisrupted ? <IlluminateText /> : stratagem.name}
        </h2>
      </div>

      {/* Arrows */}
      <div className={cn(
        "flex flex-wrap justify-center gap-2 md:gap-4 transition-transform duration-75 mb-6 md:mb-12",
        isError && "animate-shake"
      )}>
        {activeSequence.map((dir, idx) => (
          <CustomArrow 
            key={`${stratagem.name}-${idx}`} 
            direction={dir} 
            completed={idx < currentIndex}
            isDisrupted={isDisrupted}
          />
        ))}
      </div>
    </div>
  );
};

export default StratagemDisplay;