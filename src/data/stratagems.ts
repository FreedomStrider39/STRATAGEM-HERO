export type Direction = "U" | "D" | "L" | "R";

export interface Stratagem {
  name: string;
  sequence: Direction[];
  category: "Orbital" | "Eagle" | "Support" | "Defensive" | "Mission";
  iconUrl: string;
}

const BASE_URL = "https://raw.githubusercontent.com/nvigneux/Helldivers-2-Stratagems-icons-svg/main/icons";

export const STRATAGEMS: Stratagem[] = [
  // --- ORBITAL (Red) ---
  { name: "Orbital Gatling Barrage", sequence: ["R", "D", "L", "U", "U"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Gatling%20Barrage.svg` },
  { name: "Orbital Walking Barrage", sequence: ["R", "D", "R", "D", "R", "D"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Walking%20Barrage.svg` },
  { name: "Orbital 120mm HE Barrage", sequence: ["R", "R", "D", "L", "R", "D"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20120mm%20HE%20Barrage.svg` },
  { name: "Orbital 380mm HE Barrage", sequence: ["R", "D", "U", "U", "L", "D", "D"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20380mm%20HE%20Barrage.svg` },
  { name: "Orbital Gas Strike", sequence: ["R", "R", "D", "R"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Gas%20Strike.svg` },
  { name: "Orbital EMS Strike", sequence: ["R", "R", "L", "D"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20EMS%20Strike.svg` },
  { name: "Orbital Smoke Strike", sequence: ["R", "R", "D", "U"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Smoke%20Strike.svg` },
  { name: "Orbital Airburst Strike", sequence: ["R", "R", "R"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Airburst%20Strike.svg` },
  { name: "Orbital Precision Strike", sequence: ["R", "R", "U"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Precision%20Strike.svg` },
  { name: "Orbital Railcannon Strike", sequence: ["R", "U", "D", "D", "R"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Railcannon%20Strike.svg` },
  { name: "Orbital Laser", sequence: ["R", "D", "U", "R", "D"], category: "Orbital", iconUrl: `${BASE_URL}/Orbital/Orbital%20Laser.svg` },

  // --- EAGLE (Red/Orange) ---
  { name: "Eagle Rearm", sequence: ["U", "U", "L", "U", "R"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20Rearm.svg` },
  { name: "Eagle Strafing Run", sequence: ["U", "R", "R"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20Strafing%20Run.svg` },
  { name: "Eagle Airstrike", sequence: ["U", "R", "D", "R"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20Airstrike.svg` },
  { name: "Eagle Cluster Bomb", sequence: ["U", "R", "D", "D", "R"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20Cluster%20Bomb.svg` },
  { name: "Eagle Napalm Airstrike", sequence: ["U", "R", "D", "U"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20Napalm%20Airstrike.svg` },
  { name: "Eagle Smoke Strike", sequence: ["U", "R", "U", "D"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20Smoke%20Strike.svg` },
  { name: "Eagle 110mm Rocket Pods", sequence: ["U", "R", "U", "L"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20110mm%20Rocket%20Pods.svg` },
  { name: "Eagle 500kg Bomb", sequence: ["U", "R", "D", "D", "D"], category: "Eagle", iconUrl: `${BASE_URL}/Eagle/Eagle%20500kg%20Bomb.svg` },

  // --- SUPPORT (Blue) ---
  { name: "Grenade Launcher", sequence: ["D", "L", "U", "L", "D"], category: "Support", iconUrl: `${BASE_URL}/Support/GL-21%20Grenade%20Launcher.svg` },
  { name: "Expendable Anti-Tank", sequence: ["D", "D", "L", "U", "R"], category: "Support", iconUrl: `${BASE_URL}/Support/EAT-17%20Expendable%20Anti-Tank.svg` },
  { name: "Recoilless Rifle", sequence: ["D", "L", "R", "R", "L"], category: "Support", iconUrl: `${BASE_URL}/Support/GR-8%20Recoilless%20Rifle.svg` },
  { name: "Spear", sequence: ["D", "D", "U", "D", "D"], category: "Support", iconUrl: `${BASE_URL}/Support/FAF-14%20Spear%20Launcher.svg` },
  { name: "Railgun", sequence: ["D", "R", "D", "U", "L", "R"], category: "Support", iconUrl: `${BASE_URL}/Support/RS-422%20Railgun.svg` },
  { name: "Anti-Materiel Rifle", sequence: ["D", "L", "R", "U", "D"], category: "Support", iconUrl: `${BASE_URL}/Support/APW-1%20Anti-Materiel%20Rifle.svg` },
  { name: "Autocannon", sequence: ["D", "L", "D", "U", "U", "R"], category: "Support", iconUrl: `${BASE_URL}/Support/AC-8%20Autocannon.svg` },
  { name: "Laser Cannon", sequence: ["D", "L", "D", "U", "L"], category: "Support", iconUrl: `${BASE_URL}/Support/LAS-98%20Laser%20Cannon.svg` },
  { name: "Quasar Cannon", sequence: ["D", "D", "U", "L", "R"], category: "Support", iconUrl: `${BASE_URL}/Support/LAS-99%20Quasar%20Cannon.svg` },
  { name: "Arc Thrower", sequence: ["D", "R", "D", "U", "L", "L"], category: "Support", iconUrl: `${BASE_URL}/Support/ARC-3%20Arc%20Thrower.svg` },
  { name: "Flamethrower", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconUrl: `${BASE_URL}/Support/FLAM-40%20Flamethrower.svg` },
  { name: "Patriot Exosuit", sequence: ["L", "D", "R", "U", "L", "D", "D"], category: "Support", iconUrl: `${BASE_URL}/Support/EXO-45%20Patriot%20Exosuit.svg` },
  { name: "Machine Gun", sequence: ["D", "L", "D", "U", "R"], category: "Support", iconUrl: `${BASE_URL}/Support/MG-43%20Machine%20Gun.svg` },
  { name: "Stalwart", sequence: ["D", "L", "D", "U", "U", "L"], category: "Support", iconUrl: `${BASE_URL}/Support/M-105%20Stalwart.svg` },
  { name: "Heavy Machine Gun", sequence: ["D", "L", "U", "D", "D"], category: "Support", iconUrl: `${BASE_URL}/Support/MG-206%20Heavy%20Machine%20Gun.svg` },

  // --- DEFENSIVE (Green) ---
  { name: "Mortar Sentry", sequence: ["D", "U", "R", "R", "D"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_M-12%20Mortar%20Sentry.svg` },
  { name: "EMS Mortar Sentry", sequence: ["D", "U", "R", "D", "R"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_M-23%20EMS%20Mortar%20Sentry.svg` },
  { name: "Tesla Tower", sequence: ["D", "U", "R", "U", "L", "R"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_ARC-3%20Tesla%20Tower.svg` },
  { name: "Anti-Personnel Minefield", sequence: ["D", "L", "U", "R"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_MD-6%20Anti-Personnel%20Minefield.svg` },
  { name: "Incendiary Mines", sequence: ["D", "L", "L", "D"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_MD-I4%20Incendiary%20Mines.svg` },
  { name: "HMG Emplacement", sequence: ["D", "U", "L", "R", "R", "L"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/E_MG-101%20HMG%20Emplacement.svg` },
  { name: "Machine Gun Sentry", sequence: ["D", "U", "R", "R", "U"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_MG-43%20Machine%20Gun%20Sentry.svg` },
  { name: "Gatling Sentry", sequence: ["D", "U", "R", "L"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_G-16%20Gatling%20Sentry.svg` },
  { name: "Autocannon Sentry", sequence: ["D", "U", "R", "U", "L", "U"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_AC-8%20Autocannon%20Sentry.svg` },
  { name: "Rocket Sentry", sequence: ["D", "U", "R", "R", "L"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/A_MLS-4X%20Rocket%20Sentry.svg` },
  { name: "Shield Generator Relay", sequence: ["D", "D", "L", "R", "L", "R"], category: "Defensive", iconUrl: `${BASE_URL}/Defensive/FX-12%20Shield%20Generator%20Relay.svg` },

  // --- MISSION (Yellow) ---
  { name: "Reinforce", sequence: ["U", "D", "R", "L", "U"], category: "Mission", iconUrl: `${BASE_URL}/Mission/Reinforce.svg` },
  { name: "SOS Beacon", sequence: ["U", "D", "R", "U"], category: "Mission", iconUrl: `${BASE_URL}/Mission/SOS%20Beacon.svg` },
  { name: "Resupply", sequence: ["D", "D", "U", "R"], category: "Mission", iconUrl: `${BASE_URL}/Mission/Resupply.svg` },
  { name: "Hellbomb", sequence: ["D", "U", "L", "D", "U", "R", "D", "U"], category: "Mission", iconUrl: `${BASE_URL}/Mission/Hellbomb.svg` },
  { name: "Super Destroyer", sequence: ["U", "U", "D", "D", "L", "R", "L", "R"], category: "Mission", iconUrl: `${BASE_URL}/Mission/Super%20Destroyer.svg` },
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