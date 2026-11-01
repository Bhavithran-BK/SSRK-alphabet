// Web Audio API sound synthesizer and Speech Synthesis for child-friendly feedback

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          this.voices = window.speechSynthesis.getVoices();
        } catch {
          // ignore
        }
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private getPreferredVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    if (!this.voices || this.voices.length === 0) {
      try {
        this.voices = window.speechSynthesis.getVoices();
      } catch {
        return null;
      }
    }

    if (!this.voices || this.voices.length === 0) return null;

    // Prefer high-quality English voice (natural, clear, friendly tone for kids)
    const preferred =
      this.voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Jenny') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Aria'))) ||
      this.voices.find(v => v.lang.startsWith('en-US')) ||
      this.voices.find(v => v.lang.startsWith('en')) ||
      this.voices[0];

    return preferred || null;
  }

  // Soft pop sound when picking up or tapping a piece
  public playPickup() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio not permitted or failed
    }
  }

  // Cheerful chime when a stroke snaps correctly into place
  public playSnap() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.3);
      });
    } catch {
      // Audio not permitted
    }
  }

  // Celebratory fanfare when the whole letter is finished
  public playCelebration() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // C5, E5, G5, C6 triumphant chord arpeggio
      const notes = [
        { f: 523.25, t: 0.0, d: 0.2 },
        { f: 659.25, t: 0.12, d: 0.2 },
        { f: 783.99, t: 0.24, d: 0.25 },
        { f: 1046.5, t: 0.38, d: 0.55 },
      ];

      notes.forEach(({ f, t, d }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.3, now + t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + d + 0.05);
      });
    } catch {
      // Audio not permitted
    }
  }

  // Gentle feedback for invalid drop
  public playGentleError() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Audio not permitted
    }
  }

  // Speak pattern name aloud when placed in the outline ("Crossing line", "Standing line", "Sleeping line", "Curve", "Dot")
  public speakPattern(patternName: string) {
    if (this.isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }
      synth.cancel();

      // Normalize pattern text for clear child speech
      const text = patternName.trim();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;   // Natural, clear, articulate cadence for children
      utterance.pitch = 1.15;  // Cheerful, friendly pitch
      utterance.lang = 'en-US';

      const voice = this.getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      }

      this.currentUtterance = utterance;
      utterance.onend = () => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
        }
      };
      utterance.onerror = () => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
        }
      };

      synth.speak(utterance);
    } catch {
      // Speech failed or not permitted
    }
  }

  // Letter audio pronunciation using SpeechSynthesis API
  public speakLetter(letter: string) {
    if (this.isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.rate = 0.85;
      utterance.pitch = 1.15; // friendly tone for kids
      utterance.lang = 'en-US';

      const voice = this.getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      }

      this.currentUtterance = utterance;
      utterance.onend = () => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
        }
      };

      synth.speak(utterance);
    } catch {
      // Speech failed
    }
  }
}

export const sounds = new SoundEffects();
