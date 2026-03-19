import React from "react";
import { Stratagem } from "@/data/stratagems";
import { Target, Plane, Wrench, Shield, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MissionQueueProps {
  queue: Stratagem[];
  currentIndex: number;
}

const CategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  switch (category) {
    case "Orbital": return <Target className={className} />;
    case "Eagle": return <Plane className={className} />;
    case "Support": return <Wrench className={className} />;
    case "Defensive": return <Shield className={className} />;
    default: return <Flag className={className} />;
  }
};

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
              opacity: isCompleted ? 0.3 : 1, 
              scale: isCurrent ? 1.1 : 1,
              borderColor: isCurrent ? "rgb(250 204 21)" : "rgba(255,255,255,0.1)"
            }}
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 relative",
              isCurrent ? "bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.3)]" : "bg-black/40",
              isCompleted && "grayscale"
            )}
          >
            <CategoryIcon 
              category={strat.category} 
              className={cn("w-6 h-6", isCurrent ? "text-yellow-400" : "text-gray-500")} 
            />
            {isCurrent && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute -bottom-2 w-1 h-1 bg-yellow-400 rounded-full"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default MissionQueue;