export class AudioManager {
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  loadSound(id: string, src: string): void {
    if (this.audioElements.has(id)) {
      return;
    }

    const audio = new Audio(src);
    audio.preload = 'auto';
    this.audioElements.set(id, audio);
  }

  playSound(id: string): void {
    if (!this.enabled) return;

    const audio = this.audioElements.get(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore play errors (e.g., autoplay blocked)
      });
    }
  }

  stopSound(id: string): void {
    const audio = this.audioElements.get(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.audioElements.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setVolume(id: string, volume: number): void {
    const audio = this.audioElements.get(id);
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}

export const audioManager = new AudioManager();
