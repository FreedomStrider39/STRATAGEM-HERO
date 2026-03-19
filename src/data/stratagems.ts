export type Direction = "U" | "D" | "L" | "R";

export interface Stratagem {
  name: string;
  sequence: Direction[];
  category: "Orbital" | "Eagle" | "Support" | "Defensive" | "Mission";
  iconUrl: string;
}

const getIcon = (path: string) => new URL(`../assets/icons/${path}`, import.meta.url).href;

export const STRATAGEMS: Stratagem[] = [
  // --- ORBITAL (Red) ---
  { name: "Orbital Gatling Barrage", sequence: ["R", "D", "L", "U", "U"], category: "Orbital", iconUrl: getIcon("orbital/gatling.png") },
  { name: "Orbital Walking Barrage", sequence: ["R", "D", "R", "D", "R", "D"], category: "Orbital", iconUrl: getIcon("orbital/walking.png") },
  { name: "Orbital 120mm HE Barrage", sequence: ["R", "R", "D", "L", "R", "D"], category: "Orbital", iconUrl: getIcon("orbital/120mm.png") },
  { name: "Orbital 380mm HE Barrage", sequence: ["R", "D", "U", "U", "L", "D", "D"], category: "Orbital", iconUrl: getIcon("orbital/380mm.png") },
  { name: "Orbital Gas Strike", sequence: ["R", "R", "D", "R"], category: "Orbital", iconUrl: getIcon("orbital/gas.png") },
  { name: "Orbital EMS Strike", sequence: ["R", "R", "L", "D"], category: "Orbital", iconUrl: getIcon("orbital/ems.png") },
  { name: "Orbital Smoke Strike", sequence: ["R", "R", "D", "U"], category: "Orbital", iconUrl: getIcon("orbital/smoke.png") },
  { name: "Orbital Airburst Strike", sequence: ["R", "R", "R"], category: "Orbital", iconUrl: getIcon("orbital/airburst.png") },
  { name: "Orbital Precision Strike", sequence: ["R", "R", "U"], category: "Orbital", iconUrl: getIcon("orbital/precision.png") },
  { name: "Orbital Railcannon Strike", sequence: ["R", "U", "D", "D", "R"], category: "Orbital", iconUrl: getIcon("orbital/railcannon.png") },
  { name: "Orbital Laser", sequence: ["R", "D", "U", "R", "D"], category: "Orbital", iconUrl: getIcon("orbital/laser.png") },

  // --- EAGLE (Red/Orange) ---
  { name: "Eagle Rearm", sequence: ["U", "U", "L", "U", "R"], category: "Eagle", iconUrl: getIcon("eagle/rearm.png") },
  { name: "Eagle Strafing Run", sequence: ["U", "R", "R"], category: "Eagle", iconUrl: getIcon("eagle/strafing.png") },
  { name: "Eagle Airstrike", sequence: ["U", "R", "D", "R"], category: "Eagle", iconUrl: getIcon("eagle/airstrike.png") },
  { name: "Eagle Cluster Bomb", sequence: ["U", "R", "D", "D", "R"], category: "Eagle", iconUrl: getIcon("eagle/cluster.png") },
  { name: "Eagle Napalm Airstrike", sequence: ["U", "R", "D", "U"], category: "Eagle", iconUrl: getIcon("eagle/napalm.png") },
  { name: "Eagle Smoke Strike", sequence: ["U", "R", "U", "D"], category: "Eagle", iconUrl: getIcon("eagle/smoke.png") },
  { name: "Eagle 110mm Rocket Pods", sequence: ["U", "R", "U", "L"], category: "Eagle", iconUrl: getIcon("eagle/rocket_pods.png") },
  { name: "Eagle 500kg Bomb", sequence: ["U", "R", "D", "D", "D"], category: "Eagle", iconUrl: getIcon("eagle/500kg.png") },

  // --- SUPPORT (Blue) ---
  { name: "Grenade Launcher", sequence: ["D", "L", "U", "L", "D"], category: "Support", iconUrl: getIcon("support/grenade_launcher.png") },
  { name: "Expendable Anti-Tank", sequence: ["D", "D", "L", "U", "R"], category: "Support", iconUrl: getIcon("support/eat.png") },
  { name: "Recoilless Rifle", sequence: ["D", "L", "R", "R", "L"], category: "Support", iconUrl: getIcon("support/recoilless.png") },
  { name: "Spear", sequence: ["D", "D", "U", "D", "D"], category: "Support", iconUrl: getIcon("support/spear.png") },
  { name: "Railgun", sequence: ["D", "R", "D", "U", "L", "R"], category: "Support", iconUrl: getIcon("support/railgun.png") },
  { name: "Anti-Materiel Rifle", sequence: ["D", "L", "R", "U", "D"], category: "Support", iconUrl: getIcon("support/amr.png") },
  { name: "Autocannon", sequence: ["D", "L", "D", "U", "U", "R"], category: "Support", iconUrl: getIcon("support/autocannon.svg") },
  { name: "Laser Cannon", sequence: ["D", "L", "D", "U", "L"], category: "Support", iconUrl: getIcon("support/laser_cannon.png") },
  { name: "Quasar Cannon", sequence: ["D", "D", "U", "L", "R"], category: "Support", iconUrl: getIcon("support/quasar.png") },
  { name: "Arc Thrower", sequence: ["D", "R", "D", "U", "L", "L"], category: "Support", iconUrl: getIcon("support/arc_thrower.png") },
  { name: "Flamethrower", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconUrl: getIcon("support/flamethrower.png") },
  { name: "Patriot Exosuit", sequence: ["L", "D", "R", "U", "L", "D", "D"], category: "Support", iconUrl: getIcon("support/patriot.png") },
  { name: "Machine Gun", sequence: ["D", "L", "D", "U", "R"], category: "Support", iconUrl: getIcon("support/machine_gun.png") },
  { name: "Stalwart", sequence: ["D", "L", "D", "U", "U", "L"], category: "Support", iconUrl: getIcon("support/stalwart.png") },
  { name: "Heavy Machine Gun", sequence: ["D", "L", "U", "D", "D"], category: "Support", iconUrl: getIcon("support/hmg.png") },
  { name: "Commando", sequence: ["D", "L", "U", "D", "R"], category: "Support", iconUrl: getIcon("support/commando.svg") },
  { name: "Warp Pack", sequence: ["D", "U", "U", "L", "R"], category: "Support", iconUrl: getIcon("support/warp_pack.svg") },
  { name: "Defoliation Tool", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconUrl: getIcon("support/defoliation_tool.svg") },
  { name: "Breaching Hammer", sequence: ["D", "L", "U", "D", "D"], category: "Support", iconUrl: getIcon("support/breaching_hammer.svg") },

  // --- DEFENSIVE (Green) ---
  { name: "Mortar Sentry", sequence: ["D", "U", "R", "R", "D"], category: "Defensive", iconUrl: getIcon("defensive/mortar_sentry.png") },
  { name: "EMS Mortar Sentry", sequence: ["D", "U", "R", "D", "R"], category: "Defensive", iconUrl: getIcon("defensive/ems_mortar_sentry.png") },
  { name: "Tesla Tower", sequence: ["D", "U", "R", "U", "L", "R"], category: "Defensive", iconUrl: getIcon("defensive/tesla_tower.png") },
  { name: "Anti-Personnel Minefield", sequence: ["D", "L", "U", "R"], category: "Defensive", iconUrl: getIcon("defensive/anti_personnel_mines.png") },
  { name: "Incendiary Mines", sequence: ["D", "L", "L", "D"], category: "Defensive", iconUrl: getIcon("defensive/incendiary_mines.png") },
  { name: "HMG Emplacement", sequence: ["D", "U", "L", "R", "R", "L"], category: "Defensive", iconUrl: getIcon("defensive/hmg_emplacement.png") },
  { name: "Machine Gun Sentry", sequence: ["D", "U", "R", "R", "U"], category: "Defensive", iconUrl: getIcon("defensive/machine_gun_sentry.png") },
  { name: "Gatling Sentry", sequence: ["D", "U", "R", "L"], category: "Defensive", iconUrl: getIcon("defensive/gatling_sentry.png") },
  { name: "Autocannon Sentry", sequence: ["D", "U", "R", "U", "L", "U"], category: "Defensive", iconUrl: getIcon("defensive/autocannon_sentry.png") },
  { name: "Rocket Sentry", sequence: ["D", "U", "R", "R", "L"], category: "Defensive", iconUrl: getIcon("defensive/rocket_sentry.png") },
  { name: "Shield Generator Relay", sequence: ["D", "D", "L", "R", "L", "R"], category: "Defensive", iconUrl: getIcon("defensive/shield_generator.png") },

  // --- MISSION (Yellow) ---
  { name: "Reinforce", sequence: ["U", "D", "R", "L", "U"], category: "Mission", iconUrl: getIcon("mission/reinforce.png") },
  { name: "SOS Beacon", sequence: ["U", "D", "R", "U"], category: "Mission", iconUrl: getIcon("mission/sos_beacon.png") },
  { name: "Resupply", sequence: ["D", "D", "U", "R"], category: "Mission", iconUrl: getIcon("mission/resupply.png") },
  { name: "Super Destroyer", sequence: ["U", "U", "D", "D", "L", "R", "L", "R"], category: "Mission", iconUrl: getIcon("mission/super_destroyer.png") },
  { name: "One True Flag", sequence: ["D", "D", "U", "R"], category: "Mission", iconUrl: getIcon("mission/one_true_flag.svg") },
  { name: "Solo Silo", sequence: ["U", "U", "D", "D", "L", "R", "L", "R"], category: "Mission", iconUrl: getIcon("mission/solo_silo.svg") },
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