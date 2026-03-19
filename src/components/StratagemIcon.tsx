import React from "react";
import { cn } from "@/lib/utils";

interface StratagemIconProps {
  index: number;
  category: string;
  className?: string;
}

const StratagemIcon: React.FC<StratagemIconProps> = ({ index, category, className }) => {
  // Assuming the sprite sheet is a 10x10 grid
  const cols = 10;
  const row = Math.floor(index / cols);
  const col = index % cols;
  
  // Calculate percentage positions for background-position
  const posX = (col / (cols - 1)) * 100;
  const posY = (row / (cols - 1)) * 100;

  const getCategoryBorder = () => {
    switch (category) {
      case "Orbital": return "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]";
      case "Eagle": return "border-red-400 shadow-[0_0_10px_rgba(248,113,113,0.3)]";
      case "Support": return "border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]";
      case "Defensive": return "border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]";
      case "Mission": return "border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]";
      default: return "border-white/20";
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden border-2 rounded-md bg-black/40",
      getCategoryBorder(),
      className
    )}>
      <div 
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/stratagems_list.png')`,
          backgroundSize: '1000%', // 10 columns = 1000%
          backgroundPosition: `${posX}% ${posY}%`,
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
};

export default StratagemIcon;