import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-growth-chart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container growth-page">
      <div class="page-header fade-in-up">
        <h1>Your Growth</h1>
        <p>{{ missionTitle }}</p>
      </div>

      <!-- Communication Radar -->
      <div class="radar-container neu-card fade-in-up" style="animation-delay: 0.1s">
        <h3>Communication Radar</h3>
        <div class="radar-chart">
          <svg viewBox="0 0 300 300" width="260" height="260">
            <!-- Background hexagon rings -->
            <polygon *ngFor="let ring of [1, 0.75, 0.5, 0.25]"
              [attr.points]="getHexPoints(150, 150, 120 * ring)"
              fill="none"
              stroke="var(--color-earth-light)"
              [attr.stroke-opacity]="0.3"
              stroke-width="1"
            />
            <!-- Data polygon -->
            <polygon
              [attr.points]="radarPoints()"
              fill="var(--color-gold-warm)"
              fill-opacity="0.2"
              stroke="var(--color-gold-deep)"
              stroke-width="2"
            />
            <!-- Data points -->
            <circle *ngFor="let point of radarDataPoints()"
              [attr.cx]="point.x"
              [attr.cy]="point.y"
              r="5"
              fill="var(--color-gold-deep)"
            />
            <!-- Labels -->
            <text *ngFor="let label of radarLabels" [attr.x]="label.x" [attr.y]="label.y"
              text-anchor="middle" font-size="11" fill="var(--color-text-secondary)" font-family="Outfit">
              {{ label.text }}
            </text>
          </svg>
        </div>
      </div>

      <!-- Voice Analysis -->
      <div class="analysis-grid">
        <div class="analysis-card neu-card fade-in-up" style="animation-delay: 0.2s">
          <span class="analysis-icon">🎯</span>
          <span class="analysis-value">{{ reach }}%</span>
          <span class="analysis-label">Reach</span>
          <p class="analysis-desc">How far your voice traveled</p>
        </div>
        <div class="analysis-card neu-card fade-in-up" style="animation-delay: 0.25s">
          <span class="analysis-icon">💫</span>
          <span class="analysis-value">{{ resonance }}%</span>
          <span class="analysis-label">Resonance</span>
          <p class="analysis-desc">How much impact your words had</p>
        </div>
      </div>

      <!-- Mastery Slider -->
      <div class="mastery-section neu-card fade-in-up" style="animation-delay: 0.3s">
        <h3>Mastery Replay</h3>
        <p class="mastery-desc">Slide to hear the difference between your voice and its full potential.</p>
        <div class="mastery-slider-container">
          <div class="slider-labels">
            <span>Your Voice</span>
            <span>AI Enhanced</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            [value]="masterySlider()"
            (input)="onSliderChange($event)"
            class="mastery-slider"
          />
          <div class="slider-visual">
            <div class="original-wave">
              <div *ngFor="let h of originalWave" class="wave-bar-sm" [style.height.px]="h"></div>
            </div>
            <div class="enhanced-wave" [style.opacity]="masterySlider() / 100">
              <div *ngFor="let h of enhancedWave" class="wave-bar-sm enhanced" [style.height.px]="h"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div class="feedback-section fade-in-up" style="animation-delay: 0.4s">
        <h3>Guardian's Feedback</h3>
        <div class="feedback-item neu-inset" *ngFor="let fb of feedback">
          <p>{{ fb }}</p>
        </div>
      </div>

      <!-- XP Earned -->
      <div class="xp-section fade-in-up" style="animation-delay: 0.45s">
        <div class="xp-badge">
          <span class="xp-amount">+{{ xpEarned }} XP</span>
          <span class="xp-label">earned this session</span>
        </div>
      </div>

      <div class="actions fade-in-up" style="animation-delay: 0.5s">
        <button class="neu-button" routerLink="/">Back to Home</button>
        <button class="neu-button neu-button-primary" routerLink="/certificates">View Certificates</button>
      </div>
    </div>
  `,
  styles: [`
    .growth-page { padding-top: var(--space-xl); }

    .radar-container { text-align: center; margin-bottom: var(--space-xl); }
    .radar-container h3 { font-size: 1.1rem; margin-bottom: var(--space-md); }
    .radar-chart { display: flex; justify-content: center; }

    .analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-xl); }
    .analysis-card { text-align: center; padding: var(--space-lg) var(--space-md); }
    .analysis-icon { font-size: 1.5rem; display: block; margin-bottom: 4px; }
    .analysis-value { font-size: 1.8rem; font-weight: 700; color: var(--color-gold-deep); display: block; }
    .analysis-label { font-size: 0.85rem; font-weight: 600; color: var(--color-text-primary); }
    .analysis-desc { font-size: 0.7rem; color: var(--color-text-muted); margin-top: 4px; }

    .mastery-section { margin-bottom: var(--space-xl); }
    .mastery-section h3 { font-size: 1.1rem; margin-bottom: 4px; }
    .mastery-desc { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: var(--space-md); }

    .mastery-slider-container { }
    .slider-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 4px; }

    .mastery-slider {
      width: 100%; height: 8px; -webkit-appearance: none; appearance: none;
      background: var(--color-bg-secondary); border-radius: 4px; outline: none;
      box-shadow: inset 2px 2px 4px var(--shadow-neu-inset-dark), inset -2px -2px 4px var(--shadow-neu-inset-light);
    }
    .mastery-slider::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none; width: 24px; height: 24px; border-radius: 50%;
      background: var(--color-gold-warm); cursor: pointer;
      box-shadow: 2px 2px 4px var(--shadow-neu-dark);
    }

    .slider-visual { display: flex; gap: var(--space-md); margin-top: var(--space-md); height: 60px; align-items: flex-end; }
    .original-wave, .enhanced-wave { display: flex; align-items: flex-end; gap: 2px; flex: 1; justify-content: center; }
    .wave-bar-sm { width: 3px; border-radius: 1.5px; background: var(--color-text-muted); transition: all 0.3s ease; }
    .wave-bar-sm.enhanced { background: var(--color-gold-warm); }

    .feedback-section { margin-bottom: var(--space-xl); }
    .feedback-section h3 { font-size: 1.1rem; margin-bottom: var(--space-md); }
    .feedback-item { margin-bottom: var(--space-sm); }
    .feedback-item p { font-size: 0.85rem; color: var(--color-text-secondary); }

    .xp-section { text-align: center; margin-bottom: var(--space-xl); }
    .xp-badge {
      display: inline-flex; flex-direction: column; align-items: center;
      background: var(--color-gold-glow); padding: var(--space-md) var(--space-xl); border-radius: var(--radius-lg);
    }
    .xp-amount { font-size: 1.5rem; font-weight: 700; color: var(--color-gold-deep); }
    .xp-label { font-size: 0.75rem; color: var(--color-earth-warm); }

    .actions { display: flex; gap: var(--space-md); }
    .actions .neu-button { flex: 1; justify-content: center; padding: var(--space-md); font-size: 0.9rem; }
  `]
})
export class GrowthChartComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  missionTitle = '';
  reach = 0;
  resonance = 0;
  xpEarned = 0;
  masterySlider = signal(0);

  originalWave: number[] = [];
  enhancedWave: number[] = [];

  feedback = [
    'Your voice projection improved significantly during the second half.',
    'Try to maintain eye contact even when thinking of your next point.',
    'Great use of pauses for emphasis!',
  ];

  radarValues = { reach: 0, resonance: 0, clarity: 0, confidence: 0, empathy: 0, authority: 0 };

  radarLabels = [
    { text: 'Reach', x: 150, y: 18 },
    { text: 'Resonance', x: 265, y: 85 },
    { text: 'Clarity', x: 265, y: 225 },
    { text: 'Confidence', x: 150, y: 290 },
    { text: 'Empathy', x: 35, y: 225 },
    { text: 'Authority', x: 35, y: 85 },
  ];

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.missionTitle = params['mission'] || 'Session Complete';
    this.reach = Math.round(40 + Math.random() * 60);
    this.resonance = Math.round(35 + Math.random() * 65);
    this.xpEarned = Math.round(50 + Math.random() * 100);

    this.radarValues = {
      reach: this.reach,
      resonance: this.resonance,
      clarity: Math.round(45 + Math.random() * 55),
      confidence: Math.round(30 + Math.random() * 70),
      empathy: Math.round(50 + Math.random() * 50),
      authority: Math.round(25 + Math.random() * 75),
    };

    // Generate waveform data
    this.originalWave = Array.from({ length: 20 }, () => Math.round(10 + Math.random() * 30));
    this.enhancedWave = this.originalWave.map((v) => Math.min(60, v + 10 + Math.round(Math.random() * 15)));
  }

  getHexPoints(cx: number, cy: number, r: number): string {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return points.join(' ');
  }

  radarPoints(): string {
    const values = [
      this.radarValues.reach,
      this.radarValues.resonance,
      this.radarValues.clarity,
      this.radarValues.confidence,
      this.radarValues.empathy,
      this.radarValues.authority,
    ];
    const cx = 150, cy = 150, maxR = 120;
    return values.map((v, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const r = (v / 100) * maxR;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
  }

  radarDataPoints(): { x: number; y: number }[] {
    const values = [
      this.radarValues.reach,
      this.radarValues.resonance,
      this.radarValues.clarity,
      this.radarValues.confidence,
      this.radarValues.empathy,
      this.radarValues.authority,
    ];
    const cx = 150, cy = 150, maxR = 120;
    return values.map((v, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const r = (v / 100) * maxR;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
  }

  onSliderChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.masterySlider.set(Number(input.value));
  }
}
