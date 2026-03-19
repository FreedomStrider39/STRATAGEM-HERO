"use client";

import React from "react";
import { cn } from "@/lib/utils";
import stratagemSheet from "@/assets/stratagems_list.png";

interface StratagemIconProps {
  index: number;
  category: string;
  className?: string;
}

const StratagemIcon: React.FC<StratagemIconProps> = ({ index, category, className }) => {
  // The sprite sheet is a 10x10 grid
  const cols = 10;
  const row = Math.floor(index / cols);
  const col = index % cols;
  
  // Calculate percentage positions for background-position
  // For a 10x10 grid, the steps are 100% / (10 - 1) = 11.11%
  const posX = (col / (cols - 1)) * 100;
  const posY = (row / (cols - 1)) * 100;

  const getCategoryBorder = () => {
    switch (category) {
      case "Orbital": return "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
      case "Eagle": return "border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.4)]";
      case "Support": return "border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)]";
      case "Defensive": return "border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)]";
      case "Mission": return "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]";
      default: return "border-white/20";
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden border-2 rounded-md bg-black/60 aspect-square",
      getCategoryBorder(),
      className
    )}>
      <div 
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${stratagemSheet})`,
          backgroundSize: '1000%', // 10 columns = 1000% of the container width
          backgroundPosition: `${posX}% ${posY}%`,
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
};

export default StratagemIcon;