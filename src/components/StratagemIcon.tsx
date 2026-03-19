import React from "react";
import { 
  Target, Plane, Wrench, Shield, Flag, 
  Zap, Flame, Crosshair, Bomb, Rocket, 
  Cpu, Radio, Loader, Swords, MoveUp,
  Skull, Cloud, Wind, Activity, ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StratagemIconProps {
  type: string;
  category: string;
  className?: string;
}

const StratagemIcon: React.FC<StratagemIconProps> = ({ type, category, className }) => {
  const getIcon = () => {
    switch (type) {
      case "gatling": return <Activity />;
      case "walking": return <MoveUp />;
      case "barrage": return <Target />;
      case "heavy-barrage": return <Target className="stroke-[3px]" />;
      case "gas": return <Skull />;
      case "ems": return <Zap />;
      case "smoke": return <Cloud />;
      case "airburst": return <Wind />;
      case "precision": return <Crosshair />;
      case "railcannon": return <Zap className="stroke-[3px]" />;
      case "laser": return <Zap />;
      case "strafing": return <Plane />;
      case "napalm": return <Flame />;
      case "rocket-pods": return <Rocket />;
      case "airstrike": return <Bomb />;
      case "cluster": return <Bomb className="scale-75" />;
      case "500kg": return <Bomb className="stroke-[3px]" />;
      case "machine-gun": return <Swords />;
      case "grenade": return <Bomb />;
      case "eat": return <Rocket />;
      case "recoilless": return <Rocket />;
      case "spear": return <Crosshair />;
      case "railgun": return <Zap />;
      case "amr": return <Crosshair />;
      case "autocannon": return <Loader />;
      case "laser-cannon": return <Zap />;
      case "quasar": return <Zap className="stroke-[3px]" />;
      case "arc": return <Zap />;
      case "flame": return <Flame />;
      case "sentry": return <Shield />;
      case "sentry-ems": return <ShieldAlert />;
      case "tesla": return <Zap />;
      case "shield": return <Shield />;
      case "hmg-e": return <Shield />;
      case "sos": return <Radio />;
      case "resupply": return <Loader />;
      case "mech": return <Cpu />;
      default: return <Flag />;
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case "Orbital": return "text-red-500 border-red-500/50 bg-red-500/10";
      case "Eagle": return "text-red-400 border-red-400/50 bg-red-400/10";
      case "Support": return "text-blue-400 border-blue-400/50 bg-blue-400/10";
      case "Defensive": return "text-green-400 border-green-400/50 bg-green-400/10";
      case "Mission": return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10";
      default: return "text-gray-400 border-gray-400/50 bg-gray-400/10";
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-center border-2 rounded-md p-1.5",
      getCategoryColor(),
      className
    )}>
      {React.cloneElement(getIcon() as React.ReactElement, { size: "100%" })}
    </div>
  );
};

export default StratagemIcon;