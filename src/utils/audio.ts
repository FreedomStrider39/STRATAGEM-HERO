"use client";

import coin1 from "@/assets/audio/coin1.wav";
import coin2 from "@/assets/audio/coin2.wav";
import correct1 from "@/assets/audio/correct1.wav";
import correct2 from "@/assets/audio/correct2.wav";
import correct3 from "@/assets/audio/correct3.wav";
import correct4 from "@/assets/audio/correct4.wav";
import error1 from "@/assets/audio/error1.wav";
import error2 from "@/assets/audio/error2.wav";
import error3 from "@/assets/audio/error3.wav";
import error4 from "@/assets/audio/error4.wav";
import hit1 from "@/assets/audio/hit1.wav";
import hit2 from "@/assets/audio/hit2.wav";
import hit3 from "@/assets/audio/hit3.wav";
import hit4 from "@/assets/audio/hit4.wav";
import success1 from "@/assets/audio/success1.wav";
import success2 from "@/assets/audio/success2.wav";
import success3 from "@/assets/audio/success3.wav";
import failure from "@/assets/audio/failure.wav";
import failureFull from "@/assets/audio/failurefull.wav";
import startSfx from "@/assets/audio/start.wav";

class AudioManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private correctIndex = 0;
  private errorIndex = 0;
  private hitIndex = 0;
  private successIndex = 0;
  private bgm: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
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
      this.loadSound("failure", failure);
      this.loadSound("failurefull", failureFull);
      this.loadSound("start", startSfx);
    }
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
      sound.play().catch(() => {});
    }
  }

  playStart() {
    const coin = Math.random() > 0.5 ? "coin1" : "coin2";
    this.playSound(coin);
    setTimeout(() => this.playSound("start"), 200);
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

  startBgm(forceRestart = false) {
    if (this.bgm) {
      if (forceRestart) {
        this.bgm.currentTime = 0;
      }
      if (this.bgm.paused) {
        this.bgm.play().catch(() => {});
      }
    }
  }

  stopBgm() {
    if (this.bgm && !this.bgm.paused) {
      this.bgm.pause();
    }
  }
}

export const audioManager = new AudioManager();