import React from "react";
import { Stratagem } from "@/data/stratagems";
import StratagemIcon from "./StratagemIcon";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MissionQueueProps {
  queue: Stratagem[];
  currentIndex: number;
}

const MissionQueue: React.FC<MissionQueueProps> = ({ queue, currentIndex }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto py-4 px-2 w-full max-w-xl no-scrollbar">
      {queue.map((strat, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        
        return (
          <motion.div
            key={`${strat.name}-${idx}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isCompleted ? 0.2 : 1, 
              scale: isCurrent ? 1.2 : 1,
              zIndex: isCurrent ? 10 : 0
            }}
            className={cn(
              "flex-shrink-0 w-12 h-12 transition-all duration-300 relative",
              isCurrent && "drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]"
            )}
          >
            <StratagemIcon 
              index={strat.iconIndex} 
              category={strat.category} 
              className={cn(
                "w-full h-full",
                !isCurrent && "border-white/10 bg-black/40"
              )}
            />
            {isCurrent && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default MissionQueue;