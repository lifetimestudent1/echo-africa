import { Injectable, signal } from '@angular/core';

export interface VoiceAnalysis {
  energy: 'timid' | 'calm' | 'confident' | 'powerful' | 'aggressive';
  pitch: number;
  volume: number;
  clarity: number;
  fillerWords: number;
  pace: number;
}

@Injectable({ providedIn: 'root' })
export class AudioService {
  isRecording = signal(false);
  audioLevel = signal(0);
  waveformData = signal<number[]>(new Array(64).fill(0));

  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private animationId: number | null = null;

  async startRecording(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 128;

      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      source.connect(this.analyser);

      this.isRecording.set(true);
      this.updateWaveform();
    } catch {
      // Fallback: simulate audio data for demo
      this.isRecording.set(true);
      this.simulateAudio();
    }
  }

  stopRecording(): VoiceAnalysis {
    this.isRecording.set(false);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.audioLevel.set(0);
    this.waveformData.set(new Array(64).fill(0));

    // Return simulated analysis
    return {
      energy: 'confident',
      pitch: Math.round(60 + Math.random() * 40),
      volume: Math.round(50 + Math.random() * 50),
      clarity: Math.round(55 + Math.random() * 45),
      fillerWords: Math.round(Math.random() * 8),
      pace: Math.round(70 + Math.random() * 30),
    };
  }

  private updateWaveform(): void {
    if (!this.analyser || !this.isRecording()) return;

    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);

    const normalized = Array.from(data).map((v) => v / 255);
    this.waveformData.set(normalized);

    const avg = normalized.reduce((a, b) => a + b, 0) / normalized.length;
    this.audioLevel.set(avg);

    this.animationId = requestAnimationFrame(() => this.updateWaveform());
  }

  private simulateAudio(): void {
    const update = () => {
      if (!this.isRecording()) return;

      const data = new Array(64).fill(0).map(() => Math.random() * 0.3 + Math.random() * 0.4);
      this.waveformData.set(data);
      this.audioLevel.set(data.reduce((a, b) => a + b, 0) / data.length);

      this.animationId = requestAnimationFrame(update);
    };
    update();
  }
}
