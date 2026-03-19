import orbitalGatling from "@/assets/icons/orbital/gatling.png";
import orbitalWalking from "@/assets/icons/orbital/walking.png";
import orbital120mm from "@/assets/icons/orbital/120mm.png";
import orbital380mm from "@/assets/icons/orbital/380mm.png";
import orbitalGas from "@/assets/icons/orbital/gas.png";
import orbitalEms from "@/assets/icons/orbital/ems.png";
import orbitalSmoke from "@/assets/icons/orbital/smoke.png";
import orbitalAirburst from "@/assets/icons/orbital/airburst.png";
import orbitalPrecision from "@/assets/icons/orbital/precision.png";
import orbitalRailcannon from "@/assets/icons/orbital/railcannon.png";
import orbitalLaser from "@/assets/icons/orbital/laser.png";

// Eagle Icons
import eagleRearm from "@/assets/icons/eagle/rearm.png";
import eagleStrafing from "@/assets/icons/eagle/strafing.png";
import eagleAirstrike from "@/assets/icons/eagle/airstrike.png";
import eagleCluster from "@/assets/icons/eagle/cluster.png";
import eagleNapalm from "@/assets/icons/eagle/napalm.png";
import eagleSmoke from "@/assets/icons/eagle/smoke.png";
import eagleRocketPods from "@/assets/icons/eagle/rocket_pods.png";
import eagle500kg from "@/assets/icons/eagle/500kg.png";

// Support Icons
import supportGrenadeLauncher from "@/assets/icons/support/grenade_launcher.png";
import supportEat from "@/assets/icons/support/eat.png";
import supportRecoilless from "@/assets/icons/support/recoilless.png";
import supportSpear from "@/assets/icons/support/spear.png";
import supportRailgun from "@/assets/icons/support/railgun.png";
import supportAmr from "@/assets/icons/support/amr.png";
import supportAutocannon from "@/assets/icons/support/autocannon.png";
import supportLaserCannon from "@/assets/icons/support/laser_cannon.png";
import supportQuasar from "@/assets/icons/support/quasar.png";
import supportArcThrower from "@/assets/icons/support/arc_thrower.png";
import supportFlamethrower from "@/assets/icons/support/flamethrower.png";
import supportPatriot from "@/assets/icons/support/patriot.png";
import supportMachineGun from "@/assets/icons/support/machine_gun.png";
import supportStalwart from "@/assets/icons/support/stalwart.png";
import supportHmg from "@/assets/icons/support/hmg.png";

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
  { name: "Orbital Gatling Barrage", sequence: ["R", "D", "L", "U", "U"], category: "Orbital", iconUrl: orbitalGatling },
  { name: "Orbital Walking Barrage", sequence: ["R", "D", "R", "D", "R", "D"], category: "Orbital", iconUrl: orbitalWalking },
  { name: "Orbital 120mm HE Barrage", sequence: ["R", "R", "D", "L", "R", "D"], category: "Orbital", iconUrl: orbital120mm },
  { name: "Orbital 380mm HE Barrage", sequence: ["R", "D", "U", "U", "L", "D", "D"], category: "Orbital", iconUrl: orbital380mm },
  { name: "Orbital Gas Strike", sequence: ["R", "R", "D", "R"], category: "Orbital", iconUrl: orbitalGas },
  { name: "Orbital EMS Strike", sequence: ["R", "R", "L", "D"], category: "Orbital", iconUrl: orbitalEms },
  { name: "Orbital Smoke Strike", sequence: ["R", "R", "D", "U"], category: "Orbital", iconUrl: orbitalSmoke },
  { name: "Orbital Airburst Strike", sequence: ["R", "R", "R"], category: "Orbital", iconUrl: orbitalAirburst },
  { name: "Orbital Precision Strike", sequence: ["R", "R", "U"], category: "Orbital", iconUrl: orbitalPrecision },
  { name: "Orbital Railcannon Strike", sequence: ["R", "U", "D", "D", "R"], category: "Orbital", iconUrl: orbitalRailcannon },
  { name: "Orbital Laser", sequence: ["R", "D", "U", "R", "D"], category: "Orbital", iconUrl: orbitalLaser },

  // --- EAGLE (Red/Orange) ---
  { name: "Eagle Rearm", sequence: ["U", "U", "L", "U", "R"], category: "Eagle", iconUrl: eagleRearm },
  { name: "Eagle Strafing Run", sequence: ["U", "R", "R"], category: "Eagle", iconUrl: eagleStrafing },
  { name: "Eagle Airstrike", sequence: ["U", "R", "D", "R"], category: "Eagle", iconUrl: eagleAirstrike },
  { name: "Eagle Cluster Bomb", sequence: ["U", "R", "D", "D", "R"], category: "Eagle", iconUrl: eagleCluster },
  { name: "Eagle Napalm Airstrike", sequence: ["U", "R", "D", "U"], category: "Eagle", iconUrl: eagleNapalm },
  { name: "Eagle Smoke Strike", sequence: ["U", "R", "U", "D"], category: "Eagle", iconUrl: eagleSmoke },
  { name: "Eagle 110mm Rocket Pods", sequence: ["U", "R", "U", "L"], category: "Eagle", iconUrl: eagleRocketPods },
  { name: "Eagle 500kg Bomb", sequence: ["U", "R", "D", "D", "D"], category: "Eagle", iconUrl: eagle500kg },

  // --- SUPPORT (Blue) ---
  { name: "Grenade Launcher", sequence: ["D", "L", "U", "L", "D"], category: "Support", iconUrl: supportGrenadeLauncher },
  { name: "Expendable Anti-Tank", sequence: ["D", "D", "L", "U", "R"], category: "Support", iconUrl: supportEat },
  { name: "Recoilless Rifle", sequence: ["D", "L", "R", "R", "L"], category: "Support", iconUrl: supportRecoilless },
  { name: "Spear", sequence: ["D", "D", "U", "D", "D"], category: "Support", iconUrl: supportSpear },
  { name: "Railgun", sequence: ["D", "R", "D", "U", "L", "R"], category: "Support", iconUrl: supportRailgun },
  { name: "Anti-Materiel Rifle", sequence: ["D", "L", "R", "U", "D"], category: "Support", iconUrl: supportAmr },
  { name: "Autocannon", sequence: ["D", "L", "D", "U", "U", "R"], category: "Support", iconUrl: supportAutocannon },
  { name: "Laser Cannon", sequence: ["D", "L", "D", "U", "L"], category: "Support", iconUrl: supportLaserCannon },
  { name: "Quasar Cannon", sequence: ["D", "D", "U", "L", "R"], category: "Support", iconUrl: supportQuasar },
  { name: "Arc Thrower", sequence: ["D", "R", "D", "U", "L", "L"], category: "Support", iconUrl: supportArcThrower },
  { name: "Flamethrower", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconUrl: supportFlamethrower },
  { name: "Patriot Exosuit", sequence: ["L", "D", "R", "U", "L", "D", "D"], category: "Support", iconUrl: supportPatriot },
  { name: "Machine Gun", sequence: ["D", "L", "D", "U", "R"], category: "Support", iconUrl: supportMachineGun },
  { name: "Stalwart", sequence: ["D", "L", "D", "U", "U", "L"], category: "Support", iconUrl: supportStalwart },
  { name: "Heavy Machine Gun", sequence: ["D", "L", "U", "D", "D"], category: "Support", iconUrl: supportHmg },

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