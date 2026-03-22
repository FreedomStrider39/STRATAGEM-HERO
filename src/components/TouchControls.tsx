"use client";

import React from "react";
import { Direction } from "@/data/stratagems";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface TouchControlsProps {
  onInput: (dir: Direction) => void;
  className?: string;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onInput, className }) => {
  const Button = ({ dir, icon: Icon, gridClass }: { dir: Direction; icon: any; gridClass: string }) => (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        onInput(dir);
      }}
      className={cn(
        "w-16 h-16 md:w-28 md:h-28 bg-white/5 border-2 border-white/20 flex items-center justify-center active:bg-yellow-400 active:text-black active:border-yellow-400 active:scale-95 transition-all rounded-none touch-none shadow-[0_0_15px_rgba(255,255,255,0.05)]",
        gridClass
      )}
    >
      <Icon size={32} className="md:w-12 md:h-12" strokeWidth={3} />
    </button>
  );

  return (
    <div className={cn("flex flex-col items-center gap-2 p-4 md:p-8 bg-black/60 border-t border-white/10 backdrop-blur-md pb-8 md:pb-12", className)}>
      <div className="grid grid-cols-3 gap-2">
        <div />
        <Button dir="U" icon={ChevronUp} gridClass="col-start-2" />
        <div />
        
        <Button dir="L" icon={ChevronLeft} gridClass="col-start-1" />
        <Button dir="D" icon={ChevronDown} gridClass="col-start-2" />
        <Button dir="R" icon={ChevronRight} gridClass="col-start-3" />
      </div>
    </div>
  );
};

export default TouchControls;