import React from "react";
import { Stratagem, Direction } from "@/data/stratagems";
import StratagemIcon from "./StratagemIcon";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StratagemDisplayProps {
  stratagem: Stratagem;
  currentIndex: number;
  isError: boolean | null;
}

const ArrowIcon = ({ direction, active, completed }: { direction: Direction, active: boolean, completed: boolean }) => {
  const icons = {
    U: <ArrowUp className="w-8 h-8" />,
    D: <ArrowDown className="w-8 h-8" />,
    L: <ArrowLeft className="w-8 h-8" />,
    R: <ArrowRight className="w-8 h-8" />,
  };

  return (
    <div className={cn(
      "p-2 rounded-md transition-all duration-150 border-2",
      completed ? "bg-yellow-400 text-black border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" : 
      active ? "bg-white/20 text-white border-white animate-pulse" : 
      "bg-black/40 text-gray-500 border-gray-700"
    )}>
      {icons[direction]}
    </div>
  );
};

const StratagemDisplay: React.FC<StratagemDisplayProps> = ({ stratagem, currentIndex, isError }) => {
  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <motion.div 
        key={stratagem.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center"
      >
        <StratagemIcon 
          index={stratagem.iconIndex} 
          category={stratagem.category} 
          className="w-24 h-24 mb-4 border-4"
        />
        <h2 className="text-3xl font-black text-yellow-400 uppercase tracking-tighter italic">
          {stratagem.name}
        </h2>
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">
          {stratagem.category} Stratagem
        </p>
      </motion.div>

      <div className={cn(
        "flex flex-wrap justify-center gap-3 p-6 rounded-xl bg-black/60 border-2 border-yellow-400/30 backdrop-blur-sm transition-colors duration-150",
        isError === false && "border-red-500 bg-red-500/10"
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