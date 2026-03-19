import { 
  Target, Plane, Wrench, Shield, Flag, 
  Zap, Flame, Crosshair, Bomb, Rocket, 
  Cpu, Radio, Loader, Swords, MoveUp
} from "lucide-react";

export type Direction = "U" | "D" | "L" | "R";

export interface Stratagem {
  name: string;
  sequence: Direction[];
  category: "Orbital" | "Eagle" | "Support" | "Defensive" | "Mission";
  iconType: string;
}

export const STRATAGEMS: Stratagem[] = [
  // Orbital
  { name: "Orbital Gatling Barrage", sequence: ["R", "D", "L", "U", "U"], category: "Orbital", iconType: "gatling" },
  { name: "Orbital Walking Barrage", sequence: ["R", "D", "R", "D", "R", "D"], category: "Orbital", iconType: "walking" },
  { name: "Orbital 120mm HE Barrage", sequence: ["R", "R", "D", "L", "R", "D"], category: "Orbital", iconType: "barrage" },
  { name: "Orbital 380mm HE Barrage", sequence: ["R", "D", "U", "U", "L", "D", "D"], category: "Orbital", iconType: "heavy-barrage" },
  { name: "Orbital Gas Strike", sequence: ["R", "R", "D", "R"], category: "Orbital", iconType: "gas" },
  { name: "Orbital EMS Strike", sequence: ["R", "R", "L", "D"], category: "Orbital", iconType: "ems" },
  { name: "Orbital Smoke Strike", sequence: ["R", "R", "D", "U"], category: "Orbital", iconType: "smoke" },
  { name: "Orbital Airburst Strike", sequence: ["R", "R", "R"], category: "Orbital", iconType: "airburst" },
  { name: "Orbital Precision Strike", sequence: ["R", "R", "U"], category: "Orbital", iconType: "precision" },
  { name: "Orbital Railcannon Strike", sequence: ["R", "U", "D", "D", "R"], category: "Orbital", iconType: "railcannon" },
  { name: "Orbital Laser", sequence: ["R", "D", "U", "R", "D"], category: "Orbital", iconType: "laser" },

  // Eagle
  { name: "Eagle Strafing Run", sequence: ["U", "R", "R"], category: "Eagle", iconType: "strafing" },
  { name: "Eagle Napalm Airstrike", sequence: ["U", "R", "D", "U"], category: "Eagle", iconType: "napalm" },
  { name: "Eagle 110mm Rocket Pods", sequence: ["U", "R", "U", "L"], category: "Eagle", iconType: "rocket-pods" },
  { name: "Eagle Airstrike", sequence: ["U", "R", "D", "R"], category: "Eagle", iconType: "airstrike" },
  { name: "Eagle Smoke Strike", sequence: ["U", "R", "U", "D"], category: "Eagle", iconType: "smoke" },
  { name: "Eagle Cluster Bomb", sequence: ["U", "R", "D", "D", "R"], category: "Eagle", iconType: "cluster" },
  { name: "Eagle 500kg Bomb", sequence: ["U", "R", "D", "D", "D"], category: "Eagle", iconType: "500kg" },

  // Support Weapons
  { name: "Stalwart", sequence: ["D", "L", "D", "U", "U", "L"], category: "Support", iconType: "machine-gun" },
  { name: "Machine Gun", sequence: ["D", "L", "D", "U", "R"], category: "Support", iconType: "machine-gun" },
  { name: "Heavy Machine Gun", sequence: ["D", "L", "U", "D", "D"], category: "Support", iconType: "machine-gun" },
  { name: "Grenade Launcher", sequence: ["D", "L", "U", "L", "D"], category: "Support", iconType: "grenade" },
  { name: "Expendable Anti-Tank", sequence: ["D", "D", "L", "U", "R"], category: "Support", iconType: "eat" },
  { name: "Recoilless Rifle", sequence: ["D", "L", "R", "R", "L"], category: "Support", iconType: "recoilless" },
  { name: "Spear", sequence: ["D", "D", "U", "D", "D"], category: "Support", iconType: "spear" },
  { name: "Railgun", sequence: ["D", "R", "D", "U", "L", "R"], category: "Support", iconType: "railgun" },
  { name: "Anti-Materiel Rifle", sequence: ["D", "L", "R", "U", "D"], category: "Support", iconType: "amr" },
  { name: "Autocannon", sequence: ["D", "L", "D", "U", "U", "R"], category: "Support", iconType: "autocannon" },
  { name: "Laser Cannon", sequence: ["D", "L", "D", "U", "L"], category: "Support", iconType: "laser-cannon" },
  { name: "Quasar Cannon", sequence: ["D", "D", "U", "L", "R"], category: "Support", iconType: "quasar" },
  { name: "Arc Thrower", sequence: ["D", "R", "D", "U", "L", "L"], category: "Support", iconType: "arc" },
  { name: "Flamethrower", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconType: "flame" },

  // Defensive
  { name: "Mortar Sentry", sequence: ["D", "D", "U", "U", "D"], category: "Defensive", iconType: "sentry" },
  { name: "EMS Mortar Sentry", sequence: ["D", "D", "D", "U", "D"], category: "Defensive", iconType: "sentry-ems" },
  { name: "Machine Gun Sentry", sequence: ["D", "U", "R", "R", "U"], category: "Defensive", iconType: "sentry" },
  { name: "Gatling Sentry", sequence: ["D", "U", "R", "L"], category: "Defensive", iconType: "sentry" },
  { name: "Autocannon Sentry", sequence: ["D", "U", "R", "U", "L", "U"], category: "Defensive", iconType: "sentry" },
  { name: "Rocket Sentry", sequence: ["D", "U", "R", "R", "L"], category: "Defensive", iconType: "sentry" },
  { name: "Tesla Tower", sequence: ["D", "U", "R", "U", "L", "R"], category: "Defensive", iconType: "tesla" },
  { name: "Shield Generator", sequence: ["D", "D", "L", "R", "L", "R"], category: "Defensive", iconType: "shield" },
  { name: "HMG Emplacement", sequence: ["D", "U", "L", "R", "R", "L"], category: "Defensive", iconType: "hmg-e" },

  // Mission/General
  { name: "SOS Beacon", sequence: ["U", "D", "R", "U"], category: "Mission", iconType: "sos" },
  { name: "Resupply", sequence: ["D", "D", "U", "R"], category: "Mission", iconType: "resupply" },
  { name: "Patriot Exosuit", sequence: ["L", "D", "R", "U", "L", "D", "D"], category: "Support", iconType: "mech" },
];

export const RANKS = [
  { minLevel: 0, name: "Cadet" },
  { minLevel: 5, name: "Space Cadet" },
  { minLevel: 10, name: "Sergeant" },
  { minLevel: 15, name: "Master Sergeant" },
  { minLevel: 20, name: "Chief" },
  { minLevel: 25, name: "Space Chief Prime" },
  { minLevel: 30, name: "Death Captain" },
  { minLevel: 35, name: "Marshal" },
  { minLevel: 40, name: "Star Marshal" },
  { minLevel: 45, name: "Admiral" },
  { minLevel: 50, name: "Senior Admiral" },
  { minLevel: 55, name: "Skull Admiral" },
  { minLevel: 60, name: "Commander" },
  { minLevel: 65, name: "Galactic Commander" },
  { minLevel: 70, name: "Hell Commander" },
  { minLevel: 75, name: "General" },
  { minLevel: 80, "name": "5-Star General" },
  { minLevel: 85, "name": "10-Star General" },
  { minLevel: 90, "name": "Private" },
  { minLevel: 95, "name": "Super Private" },
  { minLevel: 100, "name": "Super Citizen" },
  { minLevel: 150, "name": "Super Admiral" },
];

export const getRank = (level: number) => {
  return [...RANKS].reverse().find(r => level >= r.minLevel)?.name || "Cadet";
};