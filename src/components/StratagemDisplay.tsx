import React from "react";
import { Stratagem, Direction } from "@/data/stratagems";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StratagemDisplayProps {
  stratagem: Stratagem;
  currentIndex: number;
  isError: boolean;
}

const ArrowIcon = ({ direction, active, completed }: { direction: Direction, active: boolean, completed: boolean }) => {
  const icons = {
    U: <ArrowUp className="w-10 h-10 stroke-[4px]" />,
    D: <ArrowDown className="w-10 h-10 stroke-[4px]" />,
    L: <ArrowLeft className="w-10 h-10 stroke-[4px]" />,
    R: <ArrowRight className="w-10 h-10 stroke-[4px]" />,
  };

  return (
    <div className={cn(
      "transition-all duration-75",
      completed ? "text-gray-500" : 
      active ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-110" : 
      "text-white"
    )}>
      {icons[direction]}
    </div>
  );
};

const StratagemDisplay: React.FC<StratagemDisplayProps> = ({ stratagem, currentIndex, isError }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-yellow-400 py-1 px-2 mb-6 shadow-[0_0_15px_rgba(250,204,21,0.4)]">
        <h2 className="text-black text-lg font-black text-center tracking-tight uppercase truncate">
          {stratagem.name}
        </h2>
      </div>

      <div className={cn(
        "flex flex-wrap justify-center gap-2 transition-transform duration-75",
        isError && "animate-shake text-red-500"
      )}>
        {stratagem.sequence.map((dir, idx) => (
          <ArrowIcon 
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