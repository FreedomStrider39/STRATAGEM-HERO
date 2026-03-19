export type Direction = "U" | "D" | "L" | "R";

export interface Stratagem {
  name: string;
  sequence: Direction[];
  category: "Orbital" | "Eagle" | "Support" | "Defensive" | "Mission";
  iconUrl: string;
}

const ICON_BASE = "https://raw.githubusercontent.com/DmitrySandalov/helldivers-2-stratagems/main/icons";

export const STRATAGEMS: Stratagem[] = [
  // --- ORBITAL (Red) ---
  { name: "Orbital Precision Strike", sequence: ["R", "R", "U"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-precision-strike.png` },
  { name: "Orbital Gatling Barrage", sequence: ["R", "D", "L", "U", "U"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-gatling-barrage.png` },
  { name: "Orbital Airburst Strike", sequence: ["R", "R", "R"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-airburst-strike.png` },
  { name: "Orbital 120mm HE Barrage", sequence: ["R", "R", "D", "L", "R", "D"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-120mm-he-barrage.png` },
  { name: "Orbital 380mm HE Barrage", sequence: ["R", "D", "U", "U", "L", "D", "D"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-380mm-he-barrage.png` },
  { name: "Orbital Walking Barrage", sequence: ["R", "D", "R", "D", "R", "D"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-walking-barrage.png` },
  { name: "Orbital Laser", sequence: ["R", "D", "U", "R", "D"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-laser.png` },
  { name: "Orbital Railcannon Strike", sequence: ["R", "U", "D", "D", "R"], category: "Orbital", iconUrl: `${ICON_BASE}/orbital-railcannon-strike.png` },

  // --- EAGLE (Red/Orange) ---
  { name: "Eagle Strafing Run", sequence: ["U", "R", "R"], category: "Eagle", iconUrl: `${ICON_BASE}/eagle-strafing-run.png` },
  { name: "Eagle Airstrike", sequence: ["U", "R", "D", "R"], category: "Eagle", iconUrl: `${ICON_BASE}/eagle-airstrike.png` },
  { name: "Eagle Cluster Bomb", sequence: ["U", "R", "D", "D", "R"], category: "Eagle", iconUrl: `${ICON_BASE}/eagle-cluster-bomb.png` },
  { name: "Eagle Napalm Airstrike", sequence: ["U", "R", "D", "U"], category: "Eagle", iconUrl: `${ICON_BASE}/eagle-napalm-airstrike.png` },
  { name: "Eagle Smoke Strike", sequence: ["U", "R", "U", "D"], category: "Eagle", iconUrl: `${ICON_BASE}/eagle-smoke-strike.png` },
  { name: "Eagle 110mm Rocket Pods", sequence: ["U", "R", "U", "L"], category: "Eagle", iconUrl: `${ICON_BASE}/eagle-110mm-rocket-pods.png` },
  { name: "Eagle 500kg Bomb", sequence: ["U", "R", "D", "D", "D"], category: "Eagle", iconUrl: `${ICON_BASE}/eagle-500kg-bomb.png` },

  // --- SUPPORT (Blue) ---
  { name: "Machine Gun", sequence: ["D", "L", "D", "U", "R"], category: "Support", iconUrl: `${ICON_BASE}/machine-gun.png` },
  { name: "Anti-Materiel Rifle", sequence: ["D", "L", "R", "U", "D"], category: "Support", iconUrl: `${ICON_BASE}/anti-materiel-rifle.png` },
  { name: "Stalwart", sequence: ["D", "L", "D", "U", "U", "L"], category: "Support", iconUrl: `${ICON_BASE}/stalwart.png` },
  { name: "Expendable Anti-Tank", sequence: ["D", "D", "L", "U", "R"], category: "Support", iconUrl: `${ICON_BASE}/expendable-anti-tank.png` },
  { name: "Recoilless Rifle", sequence: ["D", "L", "R", "R", "L"], category: "Support", iconUrl: `${ICON_BASE}/recoilless-rifle.png` },
  { name: "Flamethrower", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconUrl: `${ICON_BASE}/flamethrower.png` },
  { name: "Autocannon", sequence: ["D", "L", "D", "U", "U", "R"], category: "Support", iconUrl: `${ICON_BASE}/autocannon.png` },
  { name: "Railgun", sequence: ["D", "R", "D", "U", "L", "R"], category: "Support", iconUrl: `${ICON_BASE}/railgun.png` },
  { name: "Spear", sequence: ["D", "D", "U", "D", "D"], category: "Support", iconUrl: `${ICON_BASE}/spear.png` },

  // --- DEFENSIVE (Green) ---
  { name: "Gatling Sentry", sequence: ["D", "U", "R", "L"], category: "Defensive", iconUrl: `${ICON_BASE}/gatling-sentry.png` },
  { name: "Mortar Sentry", sequence: ["D", "D", "U", "U", "D"], category: "Defensive", iconUrl: `${ICON_BASE}/mortar-sentry.png` },
  { name: "Autocannon Sentry", sequence: ["D", "U", "R", "U", "L", "U"], category: "Defensive", iconUrl: `${ICON_BASE}/autocannon-sentry.png` },
  { name: "Rocket Sentry", sequence: ["D", "U", "R", "R", "L"], category: "Defensive", iconUrl: `${ICON_BASE}/rocket-sentry.png` },
  { name: "EMS Mortar Sentry", sequence: ["D", "D", "D", "U", "D"], category: "Defensive", iconUrl: `${ICON_BASE}/ems-mortar-sentry.png` },

  // --- MISSION (Yellow) ---
  { name: "Reinforce", sequence: ["U", "D", "R", "L", "U"], category: "Mission", iconUrl: `${ICON_BASE}/reinforce.png` },
  { name: "SOS Beacon", sequence: ["U", "D", "R", "U"], category: "Mission", iconUrl: `${ICON_BASE}/sos-beacon.png` },
  { name: "Resupply", sequence: ["D", "D", "U", "R"], category: "Mission", iconUrl: `${ICON_BASE}/resupply.png` },
  { name: "Hellbomb", sequence: ["D", "U", "L", "D", "U", "R", "D", "U"], category: "Mission", iconUrl: `${ICON_BASE}/hellbomb.png` },
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