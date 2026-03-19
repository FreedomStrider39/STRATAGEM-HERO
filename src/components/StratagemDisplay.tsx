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
  isInterfered?: boolean;
  isDisrupted?: boolean;
}

const IlluminateText = () => {
  const [glyphs, setGlyphs] = useState("");
  const symbols = "᚛᚜ᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ᚛᚜"; // Ogham-like symbols for alien feel

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

  return <span className="font-serif tracking-[0.5em] text-purple-400 opacity-80">{glyphs}</span>;
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
        rotate: [0, Math.random() * 2 - 1, 0]
      } : {}}
      transition={{ repeat: Infinity, duration: 0.2 }}
      className={cn(
        "transition-all duration-75 w-12 h-12 flex items-center justify-center",
        completed ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" : "text-[#4a4a4a]",
        isDisrupted && !completed && "text-purple-400/50"
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

const StratagemDisplay: React.FC<StratagemDisplayProps> = ({ stratagem, currentIndex, isError, queue, isInterfered, isDisrupted }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      {/* Top Section: Icon and Queue */}
      <div className="flex items-end gap-4 mb-2">
        {/* Current Icon */}
        <div className={cn(
          "w-24 h-24 border-4 p-1 bg-black/40 relative overflow-hidden transition-colors duration-500",
          isDisrupted ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" : "border-yellow-400"
        )}>
          <StratagemIcon 
            url={stratagem.iconUrl} 
            category={stratagem.category} 
            className={cn(
              "w-full h-full transition-all duration-500", 
              isInterfered && "blur-md opacity-20",
              isDisrupted && "hue-rotate-[280deg] brightness-150"
            )} 
          />
          {isInterfered && (
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUqnW9kA/giphy.gif')] opacity-40 mix-blend-screen pointer-events-none" />
          )}
          <div className={cn(
            "absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 transition-colors duration-500",
            isDisrupted ? "border-purple-500" : "border-yellow-400"
          )} />
        </div>

        {/* Upcoming Queue */}
        <div className="flex gap-2 pb-1">
          {queue.slice(1, 6).map((nextStrat, idx) => (
            <div key={idx} className="w-10 h-10 opacity-60 grayscale brightness-75 relative overflow-hidden">
              <StratagemIcon 
                url={nextStrat.iconUrl} 
                category={nextStrat.category} 
                className={cn(
                  "w-full h-full", 
                  isInterfered && "blur-sm opacity-10",
                  isDisrupted && "hue-rotate-[280deg]"
                )} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Name Bar */}
      <div className={cn(
        "w-full py-1 px-8 mb-6 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]",
        isDisrupted ? "bg-purple-900/90 border-y border-purple-500/50" : "bg-yellow-400/90"
      )}>
        <h2 className={cn(
          "text-xl font-bold text-center tracking-[0.2em] min-h-[1.75rem] flex items-center justify-center",
          isDisrupted ? "text-purple-100" : "text-black"
        )}>
          {isDisrupted ? <IlluminateText /> : stratagem.name}
        </h2>
      </div>

      {/* Arrows */}
      <div className={cn(
        "flex flex-wrap justify-center gap-2 transition-transform duration-75 mb-8",
        isError && "animate-shake"
      )}>
        {stratagem.sequence.map((dir, idx) => (
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