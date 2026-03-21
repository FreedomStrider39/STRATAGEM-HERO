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
        "transition-all duration-75 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center",
        completed ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]" : "text-[#222222]",
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
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Top Row: Round, Main Icon + Queue, Score */}
      <div className="flex items-center justify-between w-full mb-2 md:mb-8 px-2 md:px-4">
        {/* Round Indicator */}
        <div className="flex flex-col items-center w-16 md:w-32">
          <span className="text-white/60 text-[8px] md:text-sm font-bold tracking-[0.2em]">ROUND</span>
          <span className="text-yellow-400 text-xl md:text-5xl font-black leading-none text-glow-yellow">{round}</span>
        </div>

        {/* Center: Main Icon and Upcoming Queue */}
        <div className="flex items-end gap-1.5 md:gap-3">
          <div className={cn(
            "w-20 h-20 md:w-36 md:h-36 border-2 md:border-[4px] p-1 md:p-1.5 bg-black/40 relative overflow-hidden transition-colors duration-500",
            isDisrupted ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]" : "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
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

          {/* Upcoming Queue Icons - Hidden on very small screens to save space */}
          <div className="hidden xs:flex gap-1 md:gap-2 pb-1 md:pb-1.5">
            {queue.slice(1, 4).map((nextStrat, idx) => (
              <div key={idx} className="w-8 h-8 md:w-12 md:h-12 opacity-30 grayscale brightness-75 relative overflow-hidden border border-white/5">
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

        {/* Score Indicator */}
        <div className="flex flex-col items-center w-16 md:w-32">
          <span className="text-white/60 text-[8px] md:text-sm font-bold tracking-[0.2em]">SCORE</span>
          <span className="text-yellow-400 text-xl md:text-5xl font-black leading-none text-glow-yellow">{score}</span>
        </div>
      </div>

      {/* Name Bar */}
      <div className={cn(
        "w-full py-1 md:py-3 px-4 md:px-10 mb-3 md:mb-8 transition-all duration-500",
        isDisrupted ? "bg-purple-900/90 border-y-2 border-purple-500/50" : "bg-yellow-400"
      )}>
        <h2 className={cn(
          "text-xs md:text-2xl font-black text-center tracking-[0.1em] md:tracking-[0.2em] min-h-[1rem] md:min-h-[2rem] flex items-center justify-center",
          isDisrupted ? "text-purple-100" : "text-black"
        )}>
          {isDisrupted ? <IlluminateText /> : stratagem.name}
        </h2>
      </div>

      {/* Arrows */}
      <div className={cn(
        "flex flex-wrap justify-center gap-1.5 md:gap-4 transition-transform duration-75 mb-2 md:mb-6",
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