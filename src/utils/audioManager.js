export class AudioManager {
    constructor() {
        Object.defineProperty(this, "audioElements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "enabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    loadSound(id, src) {
        if (this.audioElements.has(id)) {
            return;
        }
        const audio = new Audio(src);
        audio.preload = 'auto';
        this.audioElements.set(id, audio);
    }
    playSound(id) {
        if (!this.enabled)
            return;
        const audio = this.audioElements.get(id);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Ignore play errors (e.g., autoplay blocked)
            });
        }
    }
    stopSound(id) {
        const audio = this.audioElements.get(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    setEnabled(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.audioElements.forEach((audio) => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    }
    isEnabled() {
        return this.enabled;
    }
    setVolume(id, volume) {
        const audio = this.audioElements.get(id);
        if (audio) {
            audio.volume = Math.max(0, Math.min(1, volume));
        }
    }
}
export const audioManager = new AudioManager();
