import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Exercise {
  id: string;
  title: string;
  type: string;
  description: string;
  duration: number;
  instructions: string[];
  icon: string;
}

@Component({
  selector: 'app-daily-gym',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container gym-page">
      <button class="back-btn neu-button" routerLink="/">← Back</button>
      <div class="page-header fade-in-up">
        <h1>Daily Gym</h1>
        <p>5 minutes to sharpen your voice and mind</p>
      </div>

      <div class="exercises-list">
        <div *ngFor="let ex of exercises; let i = index"
          class="exercise-card neu-card fade-in-up"
          [style.animation-delay]="(0.1 + i * 0.1) + 's'"
          [class.active]="activeExercise() === ex.id"
          [class.completed]="completedExercises().includes(ex.id)"
        >
          <div class="exercise-header" (click)="toggleExercise(ex.id)">
            <span class="exercise-icon">{{ ex.icon }}</span>
            <div class="exercise-info">
              <h4>{{ ex.title }}</h4>
              <span class="exercise-type">{{ ex.type }} · {{ ex.duration }} min</span>
            </div>
            <span class="exercise-status" *ngIf="completedExercises().includes(ex.id)">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="var(--color-green-sage)"/>
                <path d="M8 12l3 3 5-5" stroke="white" stroke-width="2" fill="none"/>
              </svg>
            </span>
          </div>

          <div class="exercise-body" *ngIf="activeExercise() === ex.id">
            <p class="exercise-desc">{{ ex.description }}</p>
            <ol class="instructions">
              <li *ngFor="let step of ex.instructions">{{ step }}</li>
            </ol>
            <button class="neu-button neu-button-primary complete-btn" (click)="completeExercise(ex.id)">
              Mark Complete
            </button>
          </div>
        </div>
      </div>

      <div class="gym-complete neu-card" *ngIf="allComplete()">
        <h3>Daily Gym Complete!</h3>
        <p>+50 XP earned. Keep your streak going!</p>
        <div class="xp-badge">+50 XP</div>
      </div>
    </div>
  `,
  styles: [`
    .gym-page { padding-top: var(--space-md); }
    .back-btn { margin-bottom: var(--space-md); font-size: 0.9rem; }

    .exercises-list { display: flex; flex-direction: column; gap: var(--space-md); margin-bottom: var(--space-xl); }

    .exercise-card { padding: var(--space-md) var(--space-lg); cursor: pointer; }
    .exercise-card.completed { opacity: 0.7; }
    .exercise-card.active { box-shadow: 10px 10px 20px var(--shadow-neu-dark), -10px -10px 20px var(--shadow-neu-light); }

    .exercise-header { display: flex; align-items: center; gap: var(--space-md); }
    .exercise-icon { font-size: 1.5rem; }
    .exercise-info { flex: 1; }
    .exercise-info h4 { font-size: 1rem; font-family: 'Outfit', sans-serif; font-weight: 600; margin-bottom: 2px; }
    .exercise-type { font-size: 0.75rem; color: var(--color-text-muted); text-transform: capitalize; }

    .exercise-body { margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--color-bg-secondary); }
    .exercise-desc { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: var(--space-md); }
    .instructions { padding-left: var(--space-lg); margin-bottom: var(--space-md); }
    .instructions li { font-size: 0.85rem; color: var(--color-text-secondary); padding: 4px 0; }

    .complete-btn { width: 100%; justify-content: center; padding: var(--space-sm); }

    .gym-complete { text-align: center; background: var(--color-gold-glow); }
    .gym-complete h3 { font-size: 1.2rem; color: var(--color-earth-deep); }
    .gym-complete p { font-size: 0.85rem; color: var(--color-earth-warm); margin: 4px 0 var(--space-sm); }
    .xp-badge { display: inline-block; background: var(--color-gold-warm); color: white; padding: 4px 16px; border-radius: 20px; font-weight: 600; }
  `]
})
export class DailyGymComponent {
  activeExercise = signal<string | null>(null);
  completedExercises = signal<string[]>([]);

  exercises: Exercise[] = [
    {
      id: 'dg-1', title: 'Power Breathing', type: 'breathing', icon: '🌬️',
      description: 'Deep breathing exercises to center your voice and calm nerves.',
      duration: 2,
      instructions: ['Sit up straight with shoulders back', 'Breathe in for 4 counts through your nose', 'Hold for 4 counts', 'Breathe out slowly for 6 counts', 'Repeat 5 times'],
    },
    {
      id: 'dg-2', title: 'The Tongue Twister', type: 'vocal warmup', icon: '🗣️',
      description: 'Warm up your voice and improve articulation.',
      duration: 3,
      instructions: ['Say "She sells seashells" slowly, then faster', 'Say "Red lorry, yellow lorry" 5 times', 'Say "Unique New York" 5 times quickly', 'Hum for 30 seconds'],
    },
    {
      id: 'dg-3', title: 'The Mirror Talk', type: 'social puzzle', icon: '🪞',
      description: 'Practice speaking to yourself in the mirror with confidence.',
      duration: 3,
      instructions: ['Stand in front of a mirror', 'Introduce yourself confidently', 'Watch your body language', 'Adjust until you look and sound confident'],
    },
    {
      id: 'dg-4', title: 'Vocal Power Scale', type: 'vocal warmup', icon: '📢',
      description: 'Practice projecting your voice at different volumes.',
      duration: 2,
      instructions: ['Start by whispering a sentence', 'Gradually increase volume over 5 repetitions', 'End at full projection (not shouting)', 'Feel the resonance from your chest'],
    },
  ];

  toggleExercise(id: string): void {
    this.activeExercise.set(this.activeExercise() === id ? null : id);
  }

  completeExercise(id: string): void {
    if (!this.completedExercises().includes(id)) {
      this.completedExercises.set([...this.completedExercises(), id]);
    }
    this.activeExercise.set(null);
  }

  allComplete(): boolean {
    return this.exercises.every((e) => this.completedExercises().includes(e.id));
  }
}
