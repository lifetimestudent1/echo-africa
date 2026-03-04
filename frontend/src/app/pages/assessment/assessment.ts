import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container assessment-page">
      <!-- Intro -->
      <div *ngIf="phase() === 'intro'" class="intro-section">
        <div class="page-header fade-in-up">
          <h1>Vibe Check</h1>
          <p>Let's see where you are today. Talk to me for 1 minute about your day — anything at all.</p>
        </div>

        <div class="assessment-visual fade-in-up" style="animation-delay: 0.15s">
          <div class="pulse-circle">
            <div class="pulse-inner">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="30" fill="var(--color-gold-warm)" opacity="0.3"/>
                <circle cx="40" cy="40" r="20" fill="var(--color-gold-warm)" opacity="0.5"/>
                <circle cx="40" cy="40" r="10" fill="var(--color-gold-warm)"/>
              </svg>
            </div>
          </div>
        </div>

        <button class="neu-button neu-button-primary start-btn fade-in-up" style="animation-delay: 0.2s" (click)="startAssessment()">
          Start Talking
        </button>
      </div>

      <!-- Recording -->
      <div *ngIf="phase() === 'recording'" class="recording-section">
        <div class="timer-ring">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-bg-secondary)" stroke-width="6"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-gold-warm)" stroke-width="6"
              [attr.stroke-dasharray]="circumference"
              [attr.stroke-dashoffset]="dashOffset()"
              stroke-linecap="round"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="65" text-anchor="middle" font-size="24" font-weight="600" fill="var(--color-earth-deep)" font-family="Outfit">
              {{ timeLeft() }}
            </text>
          </svg>
        </div>

        <p class="recording-prompt">Keep talking... Tell me about your day.</p>

        <div class="mini-waveform">
          <div *ngFor="let bar of audioService.waveformData().slice(0, 32)" class="wave-bar-mini" [style.height.%]="bar * 100"></div>
        </div>

        <button class="neu-button stop-btn" (click)="finishAssessment()">Done Early</button>
      </div>

      <!-- Results -->
      <div *ngIf="phase() === 'results'" class="results-section">
        <div class="page-header fade-in-up">
          <h1>Your Communication Profile</h1>
        </div>

        <div class="score-card neu-card fade-in-up" style="animation-delay: 0.1s">
          <div class="score-ring">
            <svg viewBox="0 0 120 120" width="100" height="100">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-bg-secondary)" stroke-width="8"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-gold-warm)" stroke-width="8"
                [attr.stroke-dasharray]="314"
                [attr.stroke-dashoffset]="314 - (314 * commIQ() / 100)"
                stroke-linecap="round"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="55" text-anchor="middle" font-size="22" font-weight="700" fill="var(--color-gold-deep)" font-family="Outfit">
                {{ commIQ() }}
              </text>
              <text x="60" y="72" text-anchor="middle" font-size="9" fill="var(--color-text-muted)" font-family="Outfit">
                Comm IQ
              </text>
            </svg>
          </div>
          <div class="score-details">
            <div class="energy-badge" [class]="vocalEnergy()">{{ vocalEnergy() | titlecase }} Energy</div>
          </div>
        </div>

        <div class="strengths-section fade-in-up" style="animation-delay: 0.2s">
          <h3>Your Strengths</h3>
          <div class="strength-item" *ngFor="let s of strengths">
            <span class="strength-icon">✦</span>
            <span>{{ s }}</span>
          </div>
        </div>

        <div class="improve-section fade-in-up" style="animation-delay: 0.3s">
          <h3>Areas to Grow</h3>
          <div class="improve-item" *ngFor="let a of areasToImprove">
            <span class="improve-icon">→</span>
            <span>{{ a }}</span>
          </div>
        </div>

        <div class="recommendation neu-inset fade-in-up" style="animation-delay: 0.35s">
          <h4>Recommended Path</h4>
          <p>{{ recommendation }}</p>
        </div>

        <button class="neu-button neu-button-primary continue-btn fade-in-up" style="animation-delay: 0.4s" routerLink="/">
          Start Your Journey
        </button>
      </div>
    </div>
  `,
  styles: [`
    .assessment-page { padding-top: var(--space-2xl); }

    .assessment-visual { display: flex; justify-content: center; margin: var(--space-2xl) 0; }
    .pulse-circle {
      width: 160px; height: 160px; border-radius: 50%;
      background: var(--color-gold-glow);
      display: flex; align-items: center; justify-content: center;
      animation: breathe 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite;
    }
    .pulse-inner { animation: float 2s ease-in-out infinite; }

    .start-btn { width: 100%; justify-content: center; padding: var(--space-md); font-size: 1.1rem; border-radius: var(--radius-lg); }

    /* Recording */
    .recording-section { text-align: center; }
    .timer-ring { margin: var(--space-xl) auto; }
    .recording-prompt { color: var(--color-text-secondary); font-size: 1rem; margin-bottom: var(--space-xl); }

    .mini-waveform {
      display: flex; align-items: flex-end; justify-content: center; gap: 3px;
      height: 60px; margin-bottom: var(--space-xl);
    }
    .wave-bar-mini {
      width: 4px; min-height: 4px; border-radius: 2px;
      background: var(--color-gold-warm); transition: height 0.1s ease;
    }

    .stop-btn { margin: 0 auto; padding: var(--space-sm) var(--space-xl); }

    /* Results */
    .score-card { display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-xl); }
    .score-details { flex: 1; }
    .energy-badge {
      display: inline-block; padding: 4px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;
    }
    .energy-badge.timid { background: #FFEBEE; color: #C62828; }
    .energy-badge.calm { background: #E8F5E9; color: #2E7D32; }
    .energy-badge.confident { background: #FFF8E1; color: #F57F17; }
    .energy-badge.powerful { background: #E3F2FD; color: #1565C0; }

    .strengths-section, .improve-section { margin-bottom: var(--space-lg); }
    .strengths-section h3, .improve-section h3 { font-size: 1rem; margin-bottom: var(--space-sm); }
    .strength-item, .improve-item {
      display: flex; align-items: center; gap: var(--space-sm); padding: 6px 0;
      font-size: 0.9rem; color: var(--color-text-secondary);
    }
    .strength-icon { color: var(--color-gold-warm); }
    .improve-icon { color: var(--color-village); }

    .recommendation { margin-bottom: var(--space-xl); }
    .recommendation h4 { font-size: 0.85rem; font-family: 'Outfit', sans-serif; color: var(--color-gold-deep); margin-bottom: 4px; }
    .recommendation p { font-size: 0.85rem; color: var(--color-text-secondary); }

    .continue-btn { width: 100%; justify-content: center; padding: var(--space-md); font-size: 1.1rem; border-radius: var(--radius-lg); }
  `]
})
export class AssessmentComponent {
  audioService = inject(AudioService);
  private userService = inject(UserService);
  private router = inject(Router);

  phase = signal<'intro' | 'recording' | 'results'>('intro');
  timeLeft = signal(60);
  commIQ = signal(0);
  vocalEnergy = signal<string>('calm');

  circumference = 2 * Math.PI * 52;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  strengths = [
    'Natural warmth in your voice',
    'Good listening awareness',
    'Thoughtful word choices',
  ];

  areasToImprove = [
    'Voice projection could be stronger',
    'Reduce filler words (um, uh)',
    'More confident opening statements',
  ];

  recommendation = 'Start with The Village Square to build your social confidence, then move to The Boardroom.';

  dashOffset(): number {
    return this.circumference - (this.circumference * this.timeLeft()) / 60;
  }

  async startAssessment(): Promise<void> {
    this.phase.set('recording');
    await this.audioService.startRecording();
    this.timerInterval = setInterval(() => {
      const t = this.timeLeft();
      if (t <= 0) {
        this.finishAssessment();
      } else {
        this.timeLeft.set(t - 1);
      }
    }, 1000);
  }

  finishAssessment(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const analysis = this.audioService.stopRecording();
    const iq = Math.round(35 + Math.random() * 65);
    this.commIQ.set(iq);
    this.vocalEnergy.set(analysis.energy);
    this.phase.set('results');
  }
}
