export type Direction = "U" | "D" | "L" | "R";

export interface Stratagem {
  name: string;
  sequence: Direction[];
  category: "Orbital" | "Eagle" | "Support" | "Defensive" | "Mission";
  iconIndex: number; // Index in the 10x10 sprite sheet
}

export const STRATAGEMS: Stratagem[] = [
  // Orbital (Red)
  { name: "Orbital Gatling Barrage", sequence: ["R", "D", "L", "U", "U"], category: "Orbital", iconIndex: 0 },
  { name: "Orbital Walking Barrage", sequence: ["R", "D", "R", "D", "R", "D"], category: "Orbital", iconIndex: 1 },
  { name: "Orbital 120mm HE Barrage", sequence: ["R", "R", "D", "L", "R", "D"], category: "Orbital", iconIndex: 2 },
  { name: "Orbital 380mm HE Barrage", sequence: ["R", "D", "U", "U", "L", "D", "D"], category: "Orbital", iconIndex: 3 },
  { name: "Orbital Gas Strike", sequence: ["R", "R", "D", "R"], category: "Orbital", iconIndex: 4 },
  { name: "Orbital EMS Strike", sequence: ["R", "R", "L", "D"], category: "Orbital", iconIndex: 5 },
  { name: "Orbital Smoke Strike", sequence: ["R", "R", "D", "U"], category: "Orbital", iconIndex: 6 },
  { name: "Orbital Precision Strike", sequence: ["R", "R", "U"], category: "Orbital", iconIndex: 7 },
  { name: "Orbital Railcannon Strike", sequence: ["R", "U", "D", "D", "R"], category: "Orbital", iconIndex: 8 },
  { name: "Orbital Laser", sequence: ["R", "D", "U", "R", "D"], category: "Orbital", iconIndex: 9 },

  // Eagle (Red/Orange)
  { name: "Eagle Strafing Run", sequence: ["U", "R", "R"], category: "Eagle", iconIndex: 10 },
  { name: "Eagle Napalm Airstrike", sequence: ["U", "R", "D", "U"], category: "Eagle", iconIndex: 11 },
  { name: "Eagle 110mm Rocket Pods", sequence: ["U", "R", "U", "L"], category: "Eagle", iconIndex: 12 },
  { name: "Eagle Airstrike", sequence: ["U", "R", "D", "R"], category: "Eagle", iconIndex: 13 },
  { name: "Eagle Cluster Bomb", sequence: ["U", "R", "D", "D", "R"], category: "Eagle", iconIndex: 14 },
  { name: "Eagle 500kg Bomb", sequence: ["U", "R", "D", "D", "D"], category: "Eagle", iconIndex: 15 },

  // Support (Blue)
  { name: "Stalwart", sequence: ["D", "L", "D", "U", "U", "L"], category: "Support", iconIndex: 20 },
  { name: "Machine Gun", sequence: ["D", "L", "D", "U", "R"], category: "Support", iconIndex: 21 },
  { name: "Anti-Materiel Rifle", sequence: ["D", "L", "R", "U", "D"], category: "Support", iconIndex: 22 },
  { name: "Grenade Launcher", sequence: ["D", "L", "U", "L", "D"], category: "Support", iconIndex: 23 },
  { name: "Expendable Anti-Tank", sequence: ["D", "D", "L", "U", "R"], category: "Support", iconIndex: 24 },
  { name: "Recoilless Rifle", sequence: ["D", "L", "R", "R", "L"], category: "Support", iconIndex: 25 },
  { name: "Flamethrower", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconIndex: 26 },
  { name: "Autocannon", sequence: ["D", "L", "D", "U", "U", "R"], category: "Support", iconIndex: 27 },
  { name: "Railgun", sequence: ["D", "R", "D", "U", "L", "R"], category: "Support", iconIndex: 28 },
  { name: "Spear", sequence: ["D", "D", "U", "D", "D"], category: "Support", iconIndex: 29 },

  // Defensive (Green)
  { name: "Mortar Sentry", sequence: ["D", "D", "U", "U", "D"], category: "Defensive", iconIndex: 30 },
  { name: "Gatling Sentry", sequence: ["D", "U", "R", "L"], category: "Defensive", iconIndex: 31 },
  { name: "Autocannon Sentry", sequence: ["D", "U", "R", "U", "L", "U"], category: "Defensive", iconIndex: 32 },
  { name: "Rocket Sentry", sequence: ["D", "U", "R", "R", "L"], category: "Defensive", iconIndex: 33 },
  { name: "Shield Generator", sequence: ["D", "D", "L", "R", "L", "R"], category: "Defensive", iconIndex: 34 },

  // Mission (Yellow)
  { name: "SOS Beacon", sequence: ["U", "D", "R", "U"], category: "Mission", iconIndex: 40 },
  { name: "Resupply", sequence: ["D", "D", "U", "R"], category: "Mission", iconIndex: 41 },
  { name: "Reinforce", sequence: ["U", "D", "R", "L", "U"], category: "Mission", iconIndex: 42 },
];

export const RANKS = [
  { minLevel: 0, name: "Cadet" },
  { minLevel: 5, name: "Space Cadet" },
  { minLevel: 10, name: "Sergeant" },
  { minLevel: 20, name: "Chief" },
  { minLevel: 30, name: "Death Captain" },
  { minLevel: 50, name: "Skull Admiral" },
  { minLevel: 100, name: "Super Citizen" },
];

export const getRank = (level: number) => {
  return [...RANKS].reverse().find(r => level >= r.minLevel)?.name || "Cadet";
};