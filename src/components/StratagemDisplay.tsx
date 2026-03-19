import React from "react";
import { Stratagem, Direction } from "@/data/stratagems";
import { cn } from "@/lib/utils";
import StratagemIcon from "./StratagemIcon";

interface StratagemDisplayProps {
  stratagem: Stratagem;
  currentIndex: number;
  isError: boolean;
  queue: Stratagem[];
  isInterfered?: boolean;
}

const CustomArrow = ({ direction, completed }: { direction: Direction, completed: boolean }) => {
  const rotation = {
    U: "rotate-0",
    D: "rotate-180",
    L: "-rotate-90",
    R: "rotate-90",
  };

  return (
    <div className={cn(
      "transition-all duration-75 w-12 h-12 flex items-center justify-center",
      completed ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" : "text-[#4a4a4a]"
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={cn("w-full h-full", rotation[direction])}
      >
        <path d="M12 2L3 11H8V22H16V11H21L12 2Z" />
      </svg>
    </div>
  );
};

const StratagemDisplay: React.FC<StratagemDisplayProps> = ({ stratagem, currentIndex, isError, queue, isInterfered }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      {/* Top Section: Icon and Queue */}
      <div className="flex items-end gap-4 mb-2">
        {/* Current Icon */}
        <div className="w-24 h-24 border-4 border-yellow-400 p-1 bg-black/40 relative overflow-hidden">
          <StratagemIcon url={stratagem.iconUrl} category={stratagem.category} className={cn("w-full h-full", isInterfered && "blur-md opacity-20")} />
          {isInterfered && (
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUqnW9kA/giphy.gif')] opacity-40 mix-blend-screen pointer-events-none" />
          )}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-yellow-400" />
        </div>

        {/* Upcoming Queue */}
        <div className="flex gap-2 pb-1">
          {queue.slice(1, 6).map((nextStrat, idx) => (
            <div key={idx} className="w-10 h-10 opacity-60 grayscale brightness-75 relative overflow-hidden">
              <StratagemIcon url={nextStrat.iconUrl} category={nextStrat.category} className={cn("w-full h-full", isInterfered && "blur-sm opacity-10")} />
              {isInterfered && (
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUqnW9kA/giphy.gif')] opacity-20 mix-blend-screen" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Name Bar */}
      <div className="w-full bg-yellow-400/90 py-1 px-8 mb-6 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
        <h2 className="text-black text-xl font-bold text-center tracking-[0.2em]">
          {stratagem.name}
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
          />
        ))}
      </div>
    </div>
  );
};

export default StratagemDisplay;