"use client";

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
  isTrumpCard?: boolean;
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

const CustomArrow = ({ direction, completed, isDisrupted, isTrumpCard }: { direction: Direction, completed: boolean, isDisrupted?: boolean, isTrumpCard?: boolean }) => {
  const rotation = {
    U: "rotate-0",
    D: "rotate-180",
    L: "-rotate-90",
    R: "rotate-90",
  };

  return (
    <motion.div 
      animate={(isDisrupted || isTrumpCard) ? {
        x: [0, Math.random() * 4 - 2, 0],
        y: [0, Math.random() * 4 - 2, 0],
        rotate: [0, Math.random() * 2 - 1, 0],
        scale: [1, 1.03, 0.97, 1]
      } : {}}
      transition={{ repeat: Infinity, duration: 0.15 }}
      className={cn(
        "transition-all duration-75 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0",
        completed ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]" : "text-[#222222]",
        isDisrupted && !completed && "text-purple-400/70",
        isTrumpCard && !completed && "text-red-500/70"
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
  isTrumpCard,
  activeSequence,
  round,
  score
}) => {
  return (
    <div className="flex flex-col items-center w-full h-full max-h-full justify-between py-1 md:py-4">
      {/* Header - Round & Score */}
      <div className="flex items-start justify-between w-full px-6 md:px-12 shrink-0 pt-4 md:pt-2">
        <div className="flex flex-col items-start">
          <span className="text-white/40 text-[8px] md:text-[10px] font-bold tracking-[0.2em]">ROUND</span>
          <span className="text-yellow-400 text-2xl md:text-5xl font-black leading-none text-glow-yellow italic">{round}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white/40 text-[8px] md:text-[10px] font-bold tracking-[0.2em]">SCORE</span>
          <span className="text-yellow-400 text-2xl md:text-5xl font-black leading-none text-glow-yellow italic">{score}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-4 md:gap-8 min-h-0">
        {/* Icon and Queue */}
        <div className="flex items-center justify-center gap-4 md:gap-10 relative">
          <div className={cn(
            "w-32 h-32 md:w-44 md:h-44 border-2 md:border-[4px] p-1.5 md:p-2 bg-black/40 relative overflow-hidden transition-colors duration-500 flex-shrink-0",
            isDisrupted ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)]" : "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]",
            isTrumpCard && "border-red-600 shadow-[0_0_60px_rgba(239,68,68,1)] animate-pulse"
          )}>
            {isTrumpCard && (
              <div className="absolute inset-0 bg-red-600/20 animate-pulse z-0" />
            )}
            <StratagemIcon 
              url={stratagem.iconUrl} 
              category={stratagem.category} 
              className={cn(
                "w-full h-full transition-all duration-500 relative z-10", 
                isDisrupted && "hue-rotate-[280deg] brightness-150",
                isTrumpCard && "brightness-150 contrast-125"
              )} 
            />
          </div>

          {/* Upcoming Queue */}
          <div className="flex flex-col md:flex-row gap-2 opacity-30">
            {queue.slice(1, 5).map((nextStrat, idx) => (
              <div key={idx} className="w-8 h-8 md:w-12 md:h-12 grayscale brightness-75 relative overflow-hidden border border-white/10 flex-shrink-0">
                <StratagemIcon 
                  url={nextStrat.iconUrl} 
                  category={nextStrat.category} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Name Bar */}
        <div className={cn(
          "w-full py-2 md:py-4 transition-all duration-500 shrink-0 relative",
          isDisrupted ? "bg-purple-900/90 border-y-2 border-purple-500/50" : "bg-yellow-400",
          isTrumpCard && "bg-red-600 border-y-[6px] border-white shadow-[0_0_40px_rgba(239,68,68,1)]"
        )}>
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
          
          <h2 className={cn(
            "text-[10px] md:text-3xl font-black text-center tracking-[0.1em] md:tracking-[0.2em] min-h-[1rem] md:min-h-[2.5rem] flex flex-col items-center justify-center uppercase italic relative z-10",
            isDisrupted ? "text-purple-100" : "text-black",
            isTrumpCard && "text-black"
          )}>
            {isTrumpCard ? (
              <div className="flex flex-col items-center">
                <span className="text-[8px] md:text-xs font-black tracking-[0.3em] mb-1 text-black/60">CAUTION: DEPLOYING 500KG</span>
                <span className="text-black">TO YOUR LOCATION</span>
              </div>
            ) : (
              isDisrupted ? <IlluminateText /> : stratagem.name
            )}
          </h2>
        </div>

        {/* Arrows */}
        <div className={cn(
          "flex flex-nowrap justify-center gap-1.5 md:gap-4 transition-transform duration-75 w-full px-4 overflow-x-auto no-scrollbar shrink-0",
          isError && "animate-shake"
        )}>
          {activeSequence.map((dir, idx) => (
            <CustomArrow 
              key={`${stratagem.name}-${idx}`} 
              direction={dir} 
              completed={idx < currentIndex}
              isDisrupted={isDisrupted}
              isTrumpCard={isTrumpCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StratagemDisplay;