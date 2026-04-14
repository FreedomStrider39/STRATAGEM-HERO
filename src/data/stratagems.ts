// Orbital Icons
import orbital120mmSvg from "../assets/icons/orbital/120mm.svg";
import orbital380mmSvg from "../assets/icons/orbital/380mm.svg";
import orbitalAirburstSvg from "../assets/icons/orbital/airburst.svg";
import orbitalEmsSvg from "../assets/icons/orbital/ems.svg";
import orbitalGasSvg from "../assets/icons/orbital/gas.svg";
import orbitalGatlingSvg from "../assets/icons/orbital/gatling.svg";
import orbitalIlluminationFlareSvg from "../assets/icons/orbital/illumination_flare.svg";
import orbitalLaserSvg from "../assets/icons/orbital/laser.svg";
import orbitalNapalmBarrageSvg from "../assets/icons/orbital/napalm_barrage.svg";
import orbitalPrecisionSvg from "../assets/icons/orbital/precision.svg";
import orbitalRailcannonSvg from "../assets/icons/orbital/railcannon.svg";
import orbitalSmokeSvg from "../assets/icons/orbital/smoke.svg";
import orbitalWalkingSvg from "../assets/icons/orbital/walking.svg";

// Eagle Icons
import eagle500kgSvg from "../assets/icons/eagle/500kg.svg";
import eagleAirstrikeSvg from "../assets/icons/eagle/airstrike.svg";
import eagleClusterSvg from "../assets/icons/eagle/cluster.svg";
import eagleNapalmSvg from "../assets/icons/eagle/napalm.svg";
import eagleRearmSvg from "../assets/icons/eagle/rearm.svg";
import eagleRocketPodsSvg from "../assets/icons/eagle/rocket_pods.svg";
import eagleSmokeSvg from "../assets/icons/eagle/smoke.svg";
import eagleStrafingSvg from "../assets/icons/eagle/strafing.svg";

// Support Icons
import airburstRocketLauncherSvg from "../assets/icons/support/airburst_rocket_launcher.svg";
import amrSvg from "../assets/icons/support/amr.svg";
import arcThrowerSvg from "../assets/icons/support/arc_thrower.svg";
import autocannonSvg from "../assets/icons/support/autocannon.svg";
import commandoSvg from "../assets/icons/support/commando.svg";
import eatSvg from "../assets/icons/support/eat.svg";
import emancipatorSvg from "../assets/icons/support/emancipator.svg";
import flamethrowerSvg from "../assets/icons/support/flamethrower.svg";
import grenadeLauncherSvg from "../assets/icons/support/grenade_launcher.svg";
import guardDogBreathSvg from "../assets/icons/support/guard_dog_breath.svg";
import guardDogRoverSvg from "../assets/icons/support/guard_dog_rover.svg";
import guardDogSvg from "../assets/icons/support/guard_dog.svg";
import hmgSvg from "../assets/icons/support/hmg.svg";
import jumpPackSvg from "../assets/icons/support/jump_pack.svg";
import laserCannonSvg from "../assets/icons/support/laser_cannon.svg";
import machineGunSvg from "../assets/icons/support/machine_gun.svg";
import patriotSvg from "../assets/icons/support/patriot.svg";
import quasarSvg from "../assets/icons/support/quasar.svg";
import railgunSvg from "../assets/icons/support/railgun.svg";
import recoillessSvg from "../assets/icons/support/recoilless.svg";
import shieldGeneratorPackSvg from "../assets/icons/support/shield_generator_pack.svg";
import spearSvg from "../assets/icons/support/spear.svg";
import stalwartSvg from "../assets/icons/support/stalwart.svg";
import sterilizerSvg from "../assets/icons/support/sterilizer.svg";
import supplyPackSvg from "../assets/icons/support/supply_pack.svg";
import directionalShieldSvg from "../assets/icons/support/directional_shield.svg";

// Defensive Icons
import antiPersonnelMinesSvg from "../assets/icons/defensive/anti_personnel_mines.svg";
import antiTankEmplacementSvg from "../assets/icons/defensive/anti_tank_emplacement.svg";
import antiTankMinesSvg from "../assets/icons/defensive/anti_tank_mines.svg";
import autocannonSentrySvg from "../assets/icons/defensive/autocannon_sentry.svg";
import emsMortarSentrySvg from "../assets/icons/defensive/ems_mortar_sentry.svg";
import flameSentrySvg from "../assets/icons/defensive/flame_sentry.svg";
import gasMineSvg from "../assets/icons/defensive/gas_mine.svg";
import gatlingSentrySvg from "../assets/icons/defensive/gatling_sentry.svg";
import hmgEmplacementSvg from "../assets/icons/defensive/hmg_emplacement.svg";
import incendiaryMinesSvg from "../assets/icons/defensive/incendiary_mines.svg";
import machineGunSentrySvg from "../assets/icons/defensive/machine_gun_sentry.svg";
import mortarSentrySvg from "../assets/icons/defensive/mortar_sentry.svg";
import rocketSentrySvg from "../assets/icons/defensive/rocket_sentry.svg";
import shieldGeneratorRelaySvg from "../assets/icons/defensive/shield_generator.svg";
import teslaTowerSvg from "../assets/icons/defensive/tesla_tower.svg";

// Mission Icons
import hellbombSvg from "../assets/icons/mission/hellbomb.svg";
import reinforceSvg from "../assets/icons/mission/reinforce.svg";
import resupplySvg from "../assets/icons/mission/resupply.svg";
import seafArtillerySvg from "../assets/icons/mission/seaf_artillery.svg";
import sosBeaconSvg from "../assets/icons/mission/sos_beacon.svg";
import superEarthFlagSvg from "../assets/icons/mission/super_earth_flag.svg";
import uploadDataSvg from "../assets/icons/mission/upload_data.svg";

export type Direction = "U" | "D" | "L" | "R";

export interface Stratagem {
  name: string;
  sequence: Direction[];
  category: "Orbital" | "Eagle" | "Support" | "Defensive" | "Mission";
  iconUrl: string;
}

export const STRATAGEMS: Stratagem[] = [
  // --- ORBITAL ---
  { name: "Orbital Precision Strike", sequence: ["R", "R", "U"], category: "Orbital", iconUrl: orbitalPrecisionSvg },
  { name: "Orbital Gatling Barrage", sequence: ["R", "D", "L", "U", "U"], category: "Orbital", iconUrl: orbitalGatlingSvg },
  { name: "Orbital Airburst Strike", sequence: ["R", "R", "R"], category: "Orbital", iconUrl: orbitalAirburstSvg },
  { name: "Orbital 120mm HE Barrage", sequence: ["R", "R", "D", "L", "R", "D"], category: "Orbital", iconUrl: orbital120mmSvg },
  { name: "Orbital 380mm HE Barrage", sequence: ["R", "D", "U", "U", "L", "D", "D"], category: "Orbital", iconUrl: orbital380mmSvg },
  { name: "Orbital Walking Barrage", sequence: ["R", "D", "R", "D", "R", "D"], category: "Orbital", iconUrl: orbitalWalkingSvg },
  { name: "Orbital Laser", sequence: ["R", "D", "U", "R", "D"], category: "Orbital", iconUrl: orbitalLaserSvg },
  { name: "Orbital Railcannon Strike", sequence: ["R", "U", "D", "D", "R"], category: "Orbital", iconUrl: orbitalRailcannonSvg },
  { name: "Orbital Gas Strike", sequence: ["R", "R", "D", "R"], category: "Orbital", iconUrl: orbitalGasSvg },
  { name: "Orbital EMS Strike", sequence: ["R", "R", "L", "D"], category: "Orbital", iconUrl: orbitalEmsSvg },
  { name: "Orbital Smoke Strike", sequence: ["R", "R", "D", "U"], category: "Orbital", iconUrl: orbitalSmokeSvg },
  { name: "Orbital Napalm Barrage", sequence: ["R", "R", "D", "L", "R", "U"], category: "Orbital", iconUrl: orbitalNapalmBarrageSvg },

  // --- EAGLE ---
  { name: "Eagle Strafing Run", sequence: ["U", "R", "R"], category: "Eagle", iconUrl: eagleStrafingSvg },
  { name: "Eagle Airstrike", sequence: ["U", "R", "D", "R"], category: "Eagle", iconUrl: eagleAirstrikeSvg },
  { name: "Eagle Cluster Bomb", sequence: ["U", "R", "D", "D", "R"], category: "Eagle", iconUrl: eagleClusterSvg },
  { name: "Eagle Napalm Airstrike", sequence: ["U", "R", "D", "U"], category: "Eagle", iconUrl: eagleNapalmSvg },
  { name: "Eagle Smoke Strike", sequence: ["U", "R", "U", "D"], category: "Eagle", iconUrl: eagleSmokeSvg },
  { name: "Eagle 110mm Rocket Pods", sequence: ["U", "R", "U", "L"], category: "Eagle", iconUrl: eagleRocketPodsSvg },
  { name: "Eagle 500kg Bomb", sequence: ["U", "R", "D", "D", "D"], category: "Eagle", iconUrl: eagle500kgSvg },

  // --- SUPPORT ---
  { name: "MG-43 Machine Gun", sequence: ["D", "L", "D", "U", "R"], category: "Support", iconUrl: machineGunSvg },
  { name: "APW-1 Anti-Materiel Rifle", sequence: ["D", "L", "R", "U", "D"], category: "Support", iconUrl: amrSvg },
  { name: "M-105 Stalwart", sequence: ["D", "L", "D", "U", "U", "L"], category: "Support", iconUrl: stalwartSvg },
  { name: "EAT-17 Expendable Anti-Tank", sequence: ["D", "D", "L", "U", "R"], category: "Support", iconUrl: eatSvg },
  { name: "LAS-98 Laser Cannon", sequence: ["D", "L", "D", "U", "L"], category: "Support", iconUrl: laserCannonSvg },
  { name: "RS-422 Railgun", sequence: ["D", "R", "D", "U", "L", "R"], category: "Support", iconUrl: railgunSvg },
  { name: "FLAM-40 Flamethrower", sequence: ["D", "L", "U", "D", "U"], category: "Support", iconUrl: flamethrowerSvg },
  { name: "ARC-3 Arc Thrower", sequence: ["D", "R", "D", "U", "L", "L"], category: "Support", iconUrl: arcThrowerSvg },
  { name: "GL-21 Grenade Launcher", sequence: ["D", "L", "U", "L", "D"], category: "Support", iconUrl: grenadeLauncherSvg },
  { name: "AC-8 Autocannon", sequence: ["D", "L", "D", "U", "U", "R"], category: "Support", iconUrl: autocannonSvg },
  { name: "MG-206 Heavy Machine Gun", sequence: ["D", "L", "U", "D", "D"], category: "Support", iconUrl: hmgSvg },
  { name: "RL-77 Airburst Rocket Launcher", sequence: ["D", "U", "U", "L", "R"], category: "Support", iconUrl: airburstRocketLauncherSvg },
  { name: "FAF-14 Spear", sequence: ["D", "D", "U", "D", "D"], category: "Support", iconUrl: spearSvg },
  { name: "B-1 Supply Pack", sequence: ["D", "L", "D", "U", "U", "D"], category: "Support", iconUrl: supplyPackSvg },
  { name: "LIFT-850 Jump Pack", sequence: ["D", "U", "U", "D", "U"], category: "Support", iconUrl: jumpPackSvg },
  { name: "SH-20 Ballistic Shield Backpack", sequence: ["D", "L", "D", "D", "U", "L"], category: "Support", iconUrl: directionalShieldSvg },
  { name: "AX/LAS-5 “Guard Dog” Rover", sequence: ["D", "U", "L", "U", "R", "R"], category: "Support", iconUrl: guardDogRoverSvg },
  { name: "AX/AR-23 “Guard Dog”", sequence: ["D", "U", "L", "U", "R", "D"], category: "Support", iconUrl: guardDogSvg },

  // --- DEFENSIVE ---
  { name: "E/MG-101 HMG Emplacement", sequence: ["D", "U", "L", "R", "R", "L"], category: "Defensive", iconUrl: hmgEmplacementSvg },
  { name: "FX-12 Shield Generator Relay", sequence: ["D", "D", "L", "R", "L", "R"], category: "Defensive", iconUrl: shieldGeneratorRelaySvg },
  { name: "A/MLS-4X Rocket Sentry", sequence: ["D", "U", "R", "R", "L"], category: "Defensive", iconUrl: rocketSentrySvg },
  { name: "A/MG-43 Machine Gun Sentry", sequence: ["D", "U", "R", "L"], category: "Defensive", iconUrl: machineGunSentrySvg },
  { name: "A/G-16 Gatling Sentry", sequence: ["D", "U", "R", "D", "L"], category: "Defensive", iconUrl: gatlingSentrySvg },
  { name: "A/AC-8 Autocannon Sentry", sequence: ["D", "U", "R", "U", "L"], category: "Defensive", iconUrl: autocannonSentrySvg },
  { name: "A/MLS-4X Mortar Sentry", sequence: ["D", "U", "R", "R", "D"], category: "Defensive", iconUrl: mortarSentrySvg },
  { name: "A/EMS Mortar Sentry", sequence: ["D", "U", "R", "D", "R"], category: "Defensive", iconUrl: emsMortarSentrySvg },
  { name: "MD-I4 Incendiary Mines", sequence: ["D", "L", "L", "D"], category: "Defensive", iconUrl: incendiaryMinesSvg },
  { name: "MD-17 Anti-Tank Mines", sequence: ["D", "L", "U", "U"], category: "Defensive", iconUrl: antiTankMinesSvg },
  { name: "MD-8 Gas Mines", sequence: ["D", "L", "L", "R"], category: "Defensive", iconUrl: gasMineSvg },

  // --- MISSION ---
  { name: "Resupply", sequence: ["D", "D", "U", "R"], category: "Mission", iconUrl: resupplySvg },
  { name: "Reinforce", sequence: ["U", "D", "R", "L", "U"], category: "Mission", iconUrl: reinforceSvg },
  { name: "SOS Beacon", sequence: ["U", "D", "R", "U"], category: "Mission", iconUrl: sosBeaconSvg },
  { name: "Super Earth Flag", sequence: ["D", "D", "U", "U"], category: "Mission", iconUrl: superEarthFlagSvg },
  { name: "Hellbomb", sequence: ["D", "U", "L", "D", "U", "R", "D", "U"], category: "Mission", iconUrl: hellbombSvg },
  { name: "SEAF Artillery", sequence: ["R", "U", "U", "D"], category: "Mission", iconUrl: seafArtillerySvg },
  { name: "Upload Data", sequence: ["D", "D", "U", "U", "U"], category: "Mission", iconUrl: uploadDataSvg },
];

export const RANKS = [
  { minScore: 0, name: "Cadet" },
  { minScore: 5000, name: "Space Cadet" },
  { minScore: 15000, name: "Sergeant" },
  { minScore: 30000, name: "Master Sergeant" },
  { minScore: 50000, name: "Chief" },
  { minScore: 75000, name: "Space Chief Prime" },
  { minScore: 100000, name: "Death Captain" },
  { minScore: 150000, name: "Marshal" },
  { minScore: 200000, name: "Star Marshal" },
  { minScore: 300000, name: "Admiral" },
  { minScore: 450000, name: "Fleet Admiral" },
  { minScore: 600000, name: "Skull Admiral" },
  { minScore: 800000, name: "Commander" },
  { minScore: 1000000, name: "Galactic Commander" },
  { minScore: 1500000, name: "Hell Commander" },
  { minScore: 2000000, name: "General" },
  { minScore: 3000000, name: "Chief General" },
  { minScore: 4500000, name: "Space Admiral" },
  { minScore: 6000000, name: "Super Citizen" },
  { minScore: 10000000, name: "Super Private" },
];

export const getRank = (totalScore: number) => {
  return [...RANKS].reverse().find(r => totalScore >= r.minScore)?.name || "Cadet";
};