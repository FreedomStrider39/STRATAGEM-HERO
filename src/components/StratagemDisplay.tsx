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

  return <span className="font-serif tracking-[0.3em] md:tracking-[0.5em] text-purple-400 opacity-80">{glyphs}</span>;
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
        x: [0, Math.random() * 8 - 4, 0],
        y: [0, Math.random() * 8 - 4, 0],
        rotate: [0, Math.random() * 6 - 3, 0],
        scale: [1, 1.05, 0.95, 1]
      } : {}}
      transition={{ repeat: Infinity, duration: 0.15 }}
      className={cn(
        "transition-all duration-75 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center",
        completed ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" : "text-[#4a4a4a]",
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
  activeSequence 
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl">
      {/* Top Section: Icon and Queue */}
      <div className="flex items-end gap-2 md:gap-4 mb-2">
        <div className={cn(
          "w-16 h-16 md:w-24 md:h-24 border-2 md:border-4 p-1 bg-black/40 relative overflow-hidden transition-colors duration-500",
          isDisrupted ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" : "border-yellow-400"
        )}>
          <StratagemIcon 
            url={stratagem.iconUrl} 
            category={stratagem.category} 
            className={cn(
              "w-full h-full transition-all duration-500", 
              isDisrupted && "hue-rotate-[280deg] brightness-150"
            )} 
          />
          <div className={cn(
            "absolute -top-1 -left-1 w-3 h-3 md:w-4 md:h-4 border-t-2 md:border-t-4 border-l-2 md:border-l-4 transition-colors duration-500",
            isDisrupted ? "border-purple-500" : "border-yellow-400"
          )} />
        </div>

        <div className="flex gap-1 md:gap-2 pb-1">
          {queue.slice(1, 4).map((nextStrat, idx) => (
            <div key={idx} className="w-8 h-8 md:w-10 md:h-10 opacity-60 grayscale brightness-75 relative overflow-hidden">
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

      {/* Name Bar */}
      <div className={cn(
        "w-full py-1 px-4 md:px-8 mb-4 md:mb-6 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]",
        isDisrupted ? "bg-purple-900/90 border-y border-purple-500/50" : "bg-yellow-400/90"
      )}>
        <h2 className={cn(
          "text-sm md:text-xl font-bold text-center tracking-[0.1em] md:tracking-[0.2em] min-h-[1.25rem] md:min-h-[1.75rem] flex items-center justify-center",
          isDisrupted ? "text-purple-100" : "text-black"
        )}>
          {isDisrupted ? <IlluminateText /> : stratagem.name}
        </h2>
      </div>

      {/* Arrows */}
      <div className={cn(
        "flex flex-wrap justify-center gap-1 md:gap-2 transition-transform duration-75 mb-4 md:mb-8",
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