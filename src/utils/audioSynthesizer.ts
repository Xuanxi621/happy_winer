/**
 * Pure Web Audio API ambient soundscape generator for cinematic Winter Solstice.
 * Generates organic winter breeze, warm hearth crackle, and soft resonant bell chimes.
 * Requires zero external audio files.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private windGain: GainNode | null = null;
  private crackleGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 2);
      this.masterGain.connect(this.ctx.destination);

      // 1. Soft Winter Wind Generator (Filtered Noise)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Brown noise approximation
        lastOut = output[i];
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(240, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      whiteNoise.connect(windFilter);
      windFilter.connect(this.windGain);
      this.windGain.connect(this.masterGain);
      whiteNoise.start();

      // 2. Modulate wind frequency slowly for organic breathing breeze
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // very slow swell
      lfoGain.gain.setValueAtTime(90, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(windFilter.frequency);
      lfo.start();

      this.isPlaying = true;

      // Play soft entrance chime
      this.playChime(392); // G4
      setTimeout(() => this.playChime(523.25), 450); // C5
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.ctx && this.masterGain) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.ctx?.suspend();
        }, 1000);
      } catch {
        // ignore
      }
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isPlaying = false;
  }

  public playChime(freq: number = 440) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      chimeGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.6);
    } catch {
      // Audio might be blocked before first user click
    }
  }

  public playBoilBubble() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const baseFreq = 280 + Math.random() * 140;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  }
}

export const soundscape = new AudioSynthesizer();
