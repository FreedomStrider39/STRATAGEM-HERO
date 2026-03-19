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
    <div className="flex items-center justify-center gap-3 mb-8 overflow-x-auto py-6 px-4 w-full max-w-2xl no-scrollbar">
      {queue.map((strat, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        
        return (
          <motion.div
            key={`${strat.name}-${idx}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isCompleted ? 0.2 : 1, 
              scale: isCurrent ? 1.25 : 1,
              zIndex: isCurrent ? 10 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "flex-shrink-0 w-12 h-12 transition-all duration-300 relative",
              isCurrent && "drop-shadow-[0_0_20px_rgba(250,204,21,0.7)]"
            )}
          >
            <StratagemIcon 
              url={strat.iconUrl} 
              category={strat.category} 
              className={cn(
                "w-full h-full",
                !isCurrent && "border-white/10 bg-black/40"
              )}
            />
            {isCurrent && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,1)]"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default MissionQueue;