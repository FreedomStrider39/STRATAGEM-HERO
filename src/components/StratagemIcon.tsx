"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StratagemIconProps {
  url: string;
  category: string;
  className?: string;
}

const StratagemIcon: React.FC<StratagemIconProps> = ({ url, className }) => {
  return (
    <div className={cn(
      "relative overflow-hidden aspect-square flex items-center justify-center p-1",
      className
    )}>
      <img 
        src={url} 
        alt="Stratagem Icon"
        className="w-full h-full object-contain brightness-125"
      />
    </div>
  );
};

export default StratagemIcon;