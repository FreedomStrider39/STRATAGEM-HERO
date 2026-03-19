import React from "react";
import { Direction } from "@/data/stratagems";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameControlsProps {
  onInput: (direction: Direction) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onInput }) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-[280px] mt-8">
      <div />
      <Button 
        variant="outline" 
        className="h-16 w-16 rounded-xl border-2 border-yellow-400/50 bg-black/40 hover:bg-yellow-400 hover:text-black transition-all active:scale-90"
        onClick={() => onInput("U")}
      >
        <ArrowUp className="w-8 h-8" />
      </Button>
      <div />
      
      <Button 
        variant="outline" 
        className="h-16 w-16 rounded-xl border-2 border-yellow-400/50 bg-black/40 hover:bg-yellow-400 hover:text-black transition-all active:scale-90"
        onClick={() => onInput("L")}
      >
        <ArrowLeft className="w-8 h-8" />
      </Button>
      <Button 
        variant="outline" 
        className="h-16 w-16 rounded-xl border-2 border-yellow-400/50 bg-black/40 hover:bg-yellow-400 hover:text-black transition-all active:scale-90"
        onClick={() => onInput("D")}
      >
        <ArrowDown className="w-8 h-8" />
      </Button>
      <Button 
        variant="outline" 
        className="h-16 w-16 rounded-xl border-2 border-yellow-400/50 bg-black/40 hover:bg-yellow-400 hover:text-black transition-all active:scale-90"
        onClick={() => onInput("R")}
      >
        <ArrowRight className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default GameControls;