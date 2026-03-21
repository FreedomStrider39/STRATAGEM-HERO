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
  const Button = ({ dir, icon: Icon }: { dir: Direction; icon: any }) => (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        onInput(dir);
      }}
      className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border-2 border-white/20 flex items-center justify-center active:bg-yellow-400 active:text-black active:border-yellow-400 transition-all rounded-none touch-none"
    >
      <Icon size={32} strokeWidth={3} />
    </button>
  );

  return (
    <div className={cn("grid grid-cols-3 gap-2 p-4", className)}>
      <div />
      <Button dir="U" icon={ChevronUp} />
      <div />
      <Button dir="L" icon={ChevronLeft} />
      <Button dir="D" icon={ChevronDown} />
      <Button dir="R" icon={ChevronRight} />
    </div>
  );
};

export default TouchControls;