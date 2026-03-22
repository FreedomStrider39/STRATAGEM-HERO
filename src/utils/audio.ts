"use client";

import coin1 from "../assets/audio/coin1.wav";
import coin2 from "../assets/audio/coin2.wav";
import correct1 from "../assets/audio/correct1.wav";
import correct2 from "../assets/audio/correct2.wav";
import correct3 from "../assets/audio/correct3.wav";
import correct4 from "../assets/audio/correct4.wav";
import error1 from "../assets/audio/error1.wav";
import error2 from "../assets/audio/error2.wav";
import error3 from "../assets/audio/error3.wav";
import error4 from "../assets/audio/error4.wav";
import hit1 from "../assets/audio/hit1.wav";
import hit2 from "../assets/audio/hit2.wav";
import hit3 from "../assets/audio/hit3.wav";
import hit4 from "../assets/audio/hit4.wav";
import success1 from "../assets/audio/success1.wav";
import success2 from "../assets/audio/success2.wav";
import success3 from "../assets/audio/success3.wav";
import failureFull from "../assets/audio/failurefull.wav";
import startSfx from "../assets/audio/start.wav";
import readySfx from "../assets/audio/ready.wav";
import playingWav from "../assets/audio/playing.wav";
import stratagemHeroSfx from "../assets/audio/stratagem_hero.wav";

class AudioManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private bgm: HTMLAudioElement | null = null;
  private correctIndex = 0;
  private errorIndex = 0;
  private hitIndex = 0;
  private successIndex = 0;
  private initialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;
    
    this.loadSound("coin1", coin1);
    this.loadSound("coin2", coin2);
    this.loadSound("correct1", correct1);
    this.loadSound("correct2", correct2);
    this.loadSound("correct3", correct3);
    this.loadSound("correct4", correct4);
    this.loadSound("error1", error1);
    this.loadSound("error2", error2);
    this.loadSound("error3", error3);
    this.loadSound("error4", error4);
    this.loadSound("hit1", hit1);
    this.loadSound("hit2", hit2);
    this.loadSound("hit3", hit3);
    this.loadSound("hit4", hit4);
    this.loadSound("success1", success1);
    this.loadSound("success2", success2);
    this.loadSound("success3", success3);
    this.loadSound("failurefull", failureFull);
    this.loadSound("start", startSfx);
    this.loadSound("ready", readySfx);
    this.loadSound("stratagem_hero", stratagemHeroSfx);
    
    this.bgm = new Audio(playingWav);
    this.bgm.loop = true;
    this.bgm.volume = 0.4;
    
    this.initialized = true;
  }

  private loadSound(name: string, url: string) {
    if (!url) return;
    const audio = new Audio(url);
    audio.preload = "auto";
    this.sounds[name] = audio;
  }

  private playSound(name: string) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((err) => {
        console.debug(`Audio play failed for ${name}:`, err);
      });
    }
  }

  private stopSound(name: string) {
    const sound = this.sounds[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  startBgm() {
    if (this.bgm) {
      this.bgm.currentTime = 0;
      this.bgm.play().catch((err) => {
        console.warn("BGM play failed:", err);
      });
    }
  }

  stopBgm() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
    }
  }

  playStart() {
    this.stopSound("ready");
    const coin = Math.random() > 0.5 ? "coin1" : "coin2";
    this.playSound(coin);
    
    // Restore the startup sound and voice line
    this.playSound("start");
    this.playSound("stratagem_hero");
  }

  playReady() {
    this.playSound("ready");
  }

  playCorrect() {
    const names = ["correct1", "correct2", "correct3", "correct4"];
    this.playSound(names[this.correctIndex]);
    this.correctIndex = (this.correctIndex + 1) % names.length;
  }

  playError() {
    const names = ["error1", "error2", "error3", "error4"];
    this.playSound(names[this.errorIndex]);
    this.errorIndex = (this.errorIndex + 1) % names.length;
  }

  playHit() {
    const names = ["hit1", "hit2", "hit3", "hit4"];
    this.playSound(names[this.hitIndex]);
    this.hitIndex = (this.hitIndex + 1) % names.length;
  }

  playSuccess() {
    const names = ["success1", "success2", "success3"];
    this.playSound(names[this.successIndex]);
    this.successIndex = (this.successIndex + 1) % names.length;
  }

  playFailure() {
    this.playSound("failurefull");
  }
}

export const audioManager = new AudioManager();