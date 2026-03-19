"use client";

const SOUND_URLS = {
  press: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
  success: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
  error: "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3",
  gameOver: "https://assets.mixkit.co/active_storage/sfx/2535/2535-preview.mp3",
  start: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3",
};

class AudioManager {
  private sounds: Record<string, HTMLAudioElement> = {};

  constructor() {
    if (typeof window !== "undefined") {
      Object.entries(SOUND_URLS).forEach(([key, url]) => {
        this.sounds[key] = new Audio(url);
        this.sounds[key].preload = "auto";
      });
    }
  }

  play(soundName: keyof typeof SOUND_URLS) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore errors from browsers blocking auto-play
      });
    }
  }
}

export const audioManager = new AudioManager();