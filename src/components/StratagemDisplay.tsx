import React from "react";
import { Stratagem, Direction } from "@/data/stratagems";
import { cn } from "@/lib/utils";

interface StratagemDisplayProps {
  stratagem: Stratagem;
  currentIndex: number;
  isError: boolean;
}

const CustomArrow = ({ direction, active, completed }: { direction: Direction, active: boolean, completed: boolean }) => {
  const rotation = {
    U: "rotate-0",
    D: "rotate-180",
    L: "-rotate-90",
    R: "rotate-90",
  };

  return (
    <div className={cn(
      "transition-all duration-75 w-10 h-10 flex items-center justify-center",
      completed ? "text-gray-600" : 
      active ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] scale-110" : 
      "text-white"
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={cn("w-full h-full", rotation[direction])}
      >
        <path d="M12 4L4 12H9V20H15V12H20L12 4Z" />
      </svg>
    </div>
  );
};

const StratagemDisplay: React.FC<StratagemDisplayProps> = ({ stratagem, currentIndex, isError }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-yellow-400 py-1.5 px-4 mb-8 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
        <h2 className="text-black text-xl font-bold text-center tracking-wider truncate">
          {stratagem.name}
        </h2>
      </div>

      <div className={cn(
        "flex flex-wrap justify-center gap-3 transition-transform duration-75",
        isError && "animate-shake text-red-500"
      )}>
        {stratagem.sequence.map((dir, idx) => (
          <CustomArrow 
            key={`${stratagem.name}-${idx}`} 
            direction={dir} 
            active={idx === currentIndex}
            completed={idx < currentIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default StratagemDisplay;