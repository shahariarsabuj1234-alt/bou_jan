/**
 * Web Audio API procedural sound synthesizer for romantic sound effects
 * and ambient music box melody.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private musicPlaying = false;
  private musicInterval: number | null = null;
  private currentNoteIndex = 0;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a soft sweet chime
  playChime(freq = 523.25, duration = 0.5) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted or interrupted
    }
  }

  // Play discovery sound when a secret is found
  playSecretFound() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 0.4);
        }, idx * 120);
      });
    } catch {}
  }

  // Play romantic unboxing chime flourish
  playUnboxFlourish() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const melody = [392, 523.25, 659.25, 783.99, 1046.5];
      melody.forEach((note, i) => {
        setTimeout(() => {
          this.playChime(note, 0.6);
        }, i * 150);
      });
    } catch {}
  }

  // Cute kiss pop sound effect
  playKissSound() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      // Pop oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);

      // Followed by sweet sparkle chime
      setTimeout(() => {
        this.playChime(1046.5, 0.8);
      }, 150);
    } catch {}
  }

  // Gentle music box background melody toggle
  toggleBgm(enable?: boolean): boolean {
    const targetState = enable !== undefined ? enable : !this.musicPlaying;
    if (targetState === this.musicPlaying) return this.musicPlaying;

    if (targetState) {
      this.musicPlaying = true;
      this.startMusicBox();
    } else {
      this.musicPlaying = false;
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    }
    return this.musicPlaying;
  }

  isBgmActive(): boolean {
    return this.musicPlaying;
  }

  private startMusicBox() {
    // Gentle lullaby melody frequencies (Canon in D / Romantic Music Box style)
    const melody = [
      523.25, 659.25, 783.99, 659.25,
      440.00, 523.25, 659.25, 523.25,
      392.00, 493.88, 587.33, 493.88,
      349.23, 440.00, 523.25, 440.00,
      392.00, 523.25, 659.25, 783.99,
      880.00, 783.99, 659.25, 587.33,
    ];

    if (this.musicInterval) clearInterval(this.musicInterval);

    this.musicInterval = window.setInterval(() => {
      if (!this.musicPlaying) return;
      const note = melody[this.currentNoteIndex % melody.length];
      this.currentNoteIndex++;

      try {
        const ctx = this.getContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch {}
    }, 450);
  }
}

export const soundManager = new SoundEffectsManager();
