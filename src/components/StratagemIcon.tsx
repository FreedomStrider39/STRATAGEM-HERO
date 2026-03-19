"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StratagemIconProps {
  url: string;
  category: string;
  className?: string;
}

const StratagemIcon: React.FC<StratagemIconProps> = ({ url, category, className }) => {
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
      "relative overflow-hidden border-2 rounded-md bg-black/60 aspect-square flex items-center justify-center p-1",
      getCategoryBorder(),
      className
    )}>
      <img 
        src={url} 
        alt="Stratagem Icon"
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/DmitrySandalov/helldivers-2-stratagems/main/icons/reinforce.png";
        }}
      />
    </div>
  );
};

export default StratagemIcon;