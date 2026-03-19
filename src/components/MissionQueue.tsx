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
    <div className="flex items-center gap-2 py-1 px-2 no-scrollbar overflow-hidden max-w-[150px]">
      {queue.map((strat, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        
        if (isCompleted) return null;

        return (
          <motion.div
            key={`${strat.name}-${idx}`}
            layout
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex-shrink-0 transition-all duration-300",
              isCurrent ? "w-12 h-12 border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "w-8 h-8 opacity-40"
            )}
          >
            <StratagemIcon 
              url={strat.iconUrl} 
              category={strat.category} 
              className="w-full h-full"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default MissionQueue;