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
    <div className="flex items-center gap-4 py-2 px-4 no-scrollbar">
      {queue.map((strat, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        
        if (isCompleted) return null; // Official UI hides completed ones or shifts them

        return (
          <motion.div
            key={`${strat.name}-${idx}`}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex-shrink-0 transition-all duration-300",
              isCurrent ? "w-24 h-24 border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]" : "w-14 h-14 opacity-60"
            )}
          >
            <StratagemIcon 
              url={strat.iconUrl} 
              category={strat.category} 
              className="w-full h-full border-none bg-transparent shadow-none"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default MissionQueue;