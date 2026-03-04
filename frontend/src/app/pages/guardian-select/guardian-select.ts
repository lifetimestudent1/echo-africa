import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

interface Guardian {
  id: string;
  name: string;
  personality: string;
  accent: string;
  whisper: string;
  color: string;
  avatar: string;
  description: string;
}

@Component({
  selector: 'app-guardian-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container guardian-page">
      <div class="page-header fade-in-up">
        <h1>Choose Your Guardian</h1>
        <p>Your Guardian will walk with you on every mission, whispering encouragement when you need it most.</p>
      </div>

      <div class="guardians-list">
        <div
          *ngFor="let g of guardians; let i = index"
          class="guardian-card neu-card fade-in-up"
          [style.animation-delay]="(i * 0.15) + 's'"
          [class.selected]="selectedGuardian === g.id"
          (click)="selectGuardian(g.id)"
        >
          <div class="guardian-avatar" [style.background]="g.color + '22'">
            <div class="avatar-icon" [innerHTML]="g.avatar"></div>
          </div>
          <div class="guardian-info">
            <h3 [style.color]="g.color">{{ g.name }}</h3>
            <p class="guardian-accent">{{ g.accent }}</p>
            <p class="guardian-personality">{{ g.personality }}</p>
            <div class="guardian-whisper neu-inset" *ngIf="selectedGuardian === g.id">
              <span class="whisper-label">Their whisper:</span>
              <p class="whisper-text">"{{ g.whisper }}"</p>
            </div>
          </div>
          <div class="select-indicator" *ngIf="selectedGuardian === g.id">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" [attr.fill]="g.color"/>
              <path d="M8 12l3 3 5-5" stroke="white" stroke-width="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      <button
        class="neu-button neu-button-primary continue-btn"
        [class.disabled]="!selectedGuardian"
        (click)="confirmSelection()"
      >
        Continue with {{ getSelectedName() }}
      </button>
    </div>
  `,
  styles: [`
    .guardian-page { padding-top: var(--space-xl); }

    .guardians-list { display: flex; flex-direction: column; gap: var(--space-lg); margin-bottom: var(--space-xl); }

    .guardian-card {
      display: flex; gap: var(--space-md); align-items: flex-start; cursor: pointer;
      position: relative; transition: all 0.3s ease;
    }
    .guardian-card.selected {
      box-shadow: 10px 10px 20px var(--shadow-neu-dark), -10px -10px 20px var(--shadow-neu-light);
    }

    .guardian-avatar {
      width: 72px; height: 72px; border-radius: var(--radius-md); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .avatar-icon { font-size: 2.5rem; }

    .guardian-info { flex: 1; }
    .guardian-info h3 { font-size: 1.1rem; margin-bottom: 2px; font-family: 'Playfair Display', serif; }
    .guardian-accent { font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 6px; }
    .guardian-personality { font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.4; }

    .guardian-whisper { margin-top: var(--space-sm); }
    .whisper-label { font-size: 0.7rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    .whisper-text { font-size: 0.85rem; font-style: italic; color: var(--color-earth-deep); margin-top: 4px; }

    .select-indicator { position: absolute; top: var(--space-md); right: var(--space-md); }

    .continue-btn {
      width: 100%; justify-content: center; padding: var(--space-md);
      font-size: 1.1rem; border-radius: var(--radius-lg);
    }
    .continue-btn.disabled { opacity: 0.5; pointer-events: none; }
  `]
})
export class GuardianSelectComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  selectedGuardian: string | null = null;

  guardians: Guardian[] = [
    {
      id: 'lion',
      name: 'Simba the Wise',
      personality: 'Bold, warm, and encouraging. Speaks with authority but never intimidates.',
      accent: 'West African (Ghanaian)',
      whisper: 'Speak from your chest, I am right here with you.',
      color: '#D4A843',
      avatar: '🦁',
      description: 'A majestic golden lion with warm amber eyes',
    },
    {
      id: 'eagle',
      name: 'Aquila the Swift',
      personality: 'Quick-witted, precise, and sharp. Focuses on clarity and impact.',
      accent: 'East African (Kenyan/Swahili)',
      whisper: 'Breathe deep, find your rhythm. You have got this.',
      color: '#8B6914',
      avatar: '🦅',
      description: 'A powerful crowned eagle with iridescent feathers',
    },
    {
      id: 'elephant',
      name: 'Tembo the Steady',
      personality: 'Patient, wise, and calming. Perfect for gentle guidance.',
      accent: 'Southern African',
      whisper: 'Your words have weight. Let them land softly but firmly.',
      color: '#7B8B6F',
      avatar: '🐘',
      description: 'A gentle grey elephant adorned with Adinkra symbols',
    },
  ];

  constructor() {
    this.selectedGuardian = this.userService.user().guardianId;
  }

  selectGuardian(id: string): void {
    this.selectedGuardian = id;
  }

  getSelectedName(): string {
    const g = this.guardians.find((g) => g.id === this.selectedGuardian);
    return g?.name || 'your Guardian';
  }

  confirmSelection(): void {
    if (this.selectedGuardian) {
      this.userService.setGuardian(this.selectedGuardian);
      this.router.navigate(['/']);
    }
  }
}
