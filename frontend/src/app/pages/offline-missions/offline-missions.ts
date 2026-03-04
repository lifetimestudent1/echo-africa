import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface OfflineMission {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  xpReward: number;
  instructions: string[];
  icon: string;
}

@Component({
  selector: 'app-offline-missions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container missions-page">
      <button class="back-btn neu-button" routerLink="/">← Back</button>
      <div class="page-header fade-in-up">
        <h1>Offline Missions</h1>
        <p>Real-world challenges to practice your skills outside the app</p>
      </div>

      <div class="missions-list">
        <div *ngFor="let m of missions; let i = index"
          class="mission-card neu-card fade-in-up"
          [style.animation-delay]="(0.1 + i * 0.08) + 's'"
          [class.completed]="completedMissions().includes(m.id)"
        >
          <div class="mission-header" (click)="toggleMission(m.id)">
            <span class="mission-icon">{{ m.icon }}</span>
            <div class="mission-info">
              <h4>{{ m.title }}</h4>
              <div class="mission-meta">
                <span class="category-badge" [class]="m.category">{{ m.category }}</span>
                <span class="xp-badge">+{{ m.xpReward }} XP</span>
              </div>
            </div>
            <span class="check" *ngIf="completedMissions().includes(m.id)">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" fill="var(--color-green-sage)"/>
                <path d="M6 10l3 3 5-5" stroke="white" stroke-width="1.5" fill="none"/>
              </svg>
            </span>
          </div>

          <div class="mission-body" *ngIf="expandedMission() === m.id">
            <p class="mission-desc">{{ m.description }}</p>
            <h5>How to complete:</h5>
            <ol class="instructions">
              <li *ngFor="let step of m.instructions">{{ step }}</li>
            </ol>
            <button
              class="neu-button neu-button-primary report-btn"
              *ngIf="!completedMissions().includes(m.id)"
              (click)="completeMission(m.id)"
            >
              Report Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .missions-page { padding-top: var(--space-md); }
    .back-btn { margin-bottom: var(--space-md); font-size: 0.9rem; }

    .missions-list { display: flex; flex-direction: column; gap: var(--space-md); }

    .mission-card { padding: var(--space-md) var(--space-lg); cursor: pointer; }
    .mission-card.completed { opacity: 0.65; }

    .mission-header { display: flex; align-items: center; gap: var(--space-md); }
    .mission-icon { font-size: 1.4rem; }
    .mission-info { flex: 1; }
    .mission-info h4 { font-size: 0.95rem; font-family: 'Outfit', sans-serif; font-weight: 600; margin-bottom: 4px; }

    .mission-meta { display: flex; gap: var(--space-sm); align-items: center; }
    .category-badge {
      font-size: 0.65rem; padding: 2px 8px; border-radius: 10px; font-weight: 500; text-transform: capitalize;
    }
    .category-badge.social { background: #FFF3E0; color: #E65100; }
    .category-badge.professional { background: #E3F2FD; color: #1565C0; }
    .category-badge.conflict { background: #E8F5E9; color: #2E7D32; }
    .xp-badge { font-size: 0.65rem; color: var(--color-gold-deep); font-weight: 600; }

    .mission-body { margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--color-bg-secondary); }
    .mission-desc { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: var(--space-md); }
    .mission-body h5 { font-size: 0.8rem; font-family: 'Outfit', sans-serif; color: var(--color-text-primary); margin-bottom: var(--space-sm); }
    .instructions { padding-left: var(--space-lg); margin-bottom: var(--space-md); }
    .instructions li { font-size: 0.85rem; color: var(--color-text-secondary); padding: 3px 0; }

    .report-btn { width: 100%; justify-content: center; padding: var(--space-sm); }
  `]
})
export class OfflineMissionsComponent {
  expandedMission = signal<string | null>(null);
  completedMissions = signal<string[]>([]);

  missions: OfflineMission[] = [
    { id: 'om-1', title: 'The Compliment Challenge', description: 'Give someone a genuine compliment today and observe their reaction.', category: 'social', difficulty: 'easy', xpReward: 25, icon: '💬', instructions: ['Choose someone you interact with regularly', 'Give them a specific, genuine compliment', 'Notice how they react', 'Report back to earn your points'] },
    { id: 'om-2', title: 'The Question Asker', description: 'Ask a thoughtful question in class or a meeting today.', category: 'professional', difficulty: 'easy', xpReward: 30, icon: '❓', instructions: ['Prepare one question about the topic', 'Raise your hand and ask clearly', 'Listen actively to the response', 'Report what you learned'] },
    { id: 'om-3', title: 'The Respectful Disagreement', description: 'Express a different opinion in a conversation today.', category: 'conflict', difficulty: 'medium', xpReward: 40, icon: '🤝', instructions: ['Wait for a topic you have an opinion about', 'Start with "I see your point, but..."', 'Share your perspective calmly', 'Report how the conversation went'] },
    { id: 'om-4', title: 'The Phone Call', description: 'Make a phone call instead of sending a text message.', category: 'social', difficulty: 'medium', xpReward: 35, icon: '📱', instructions: ['Choose someone you would normally text', 'Call them and have a real conversation', 'Keep the call going for at least 5 minutes', 'Report what you talked about'] },
    { id: 'om-5', title: 'The Public Thank You', description: 'Thank someone publicly for something they did.', category: 'social', difficulty: 'medium', xpReward: 35, icon: '🙏', instructions: ['Think of someone who helped you recently', 'Thank them in front of at least one person', 'Be specific about what they did', 'Report their reaction'] },
    { id: 'om-6', title: 'The Stranger Greeting', description: 'Greet 5 strangers warmly today.', category: 'social', difficulty: 'easy', xpReward: 20, icon: '👋', instructions: ['Smile and make brief eye contact', 'Say "Good morning" or "How are you?"', 'Count each greeting', 'Report how many and how it felt'] },
  ];

  toggleMission(id: string): void {
    this.expandedMission.set(this.expandedMission() === id ? null : id);
  }

  completeMission(id: string): void {
    if (!this.completedMissions().includes(id)) {
      this.completedMissions.set([...this.completedMissions(), id]);
    }
    this.expandedMission.set(null);
  }
}
