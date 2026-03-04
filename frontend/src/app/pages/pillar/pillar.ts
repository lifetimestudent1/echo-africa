import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: number;
  xpReward: number;
}

interface PillarData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  vibe: string;
  color: string;
  gradientStart: string;
  gradientEnd: string;
  missions: Mission[];
}

@Component({
  selector: 'app-pillar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container pillar-page" *ngIf="pillar">
      <!-- Header -->
      <div class="pillar-header fade-in-up" [style.--pillar-color]="pillar.color">
        <button class="back-btn neu-button" routerLink="/">← Back</button>
        <div class="pillar-banner" [style.background]="'linear-gradient(135deg, ' + pillar.gradientStart + ', ' + pillar.gradientEnd + ')'">
          <h1>{{ pillar.name }}</h1>
          <span class="vibe-tag">{{ pillar.vibe }}</span>
          <p>{{ pillar.description }}</p>
        </div>
      </div>

      <!-- Missions -->
      <div class="missions-section">
        <h3 class="fade-in-up" style="animation-delay: 0.15s">Missions</h3>
        <div class="missions-list">
          <div
            *ngFor="let m of pillar.missions; let i = index"
            class="mission-card neu-card fade-in-up"
            [style.animation-delay]="(0.2 + i * 0.08) + 's'"
            (click)="startMission(m)"
          >
            <div class="mission-header">
              <h4>{{ m.title }}</h4>
              <span class="difficulty-badge" [class]="m.difficulty">{{ m.difficulty }}</span>
            </div>
            <p class="mission-desc">{{ m.description }}</p>
            <div class="mission-meta">
              <span class="meta-item">⏱ {{ m.duration }} min</span>
              <span class="meta-item">✨ {{ m.xpReward }} XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pillar-page { padding-top: var(--space-md); }
    .back-btn { margin-bottom: var(--space-md); font-size: 0.9rem; }

    .pillar-banner {
      border-radius: var(--radius-lg); padding: var(--space-xl); color: white; text-align: center;
      margin-bottom: var(--space-xl);
    }
    .pillar-banner h1 { color: white; font-size: 1.6rem; margin-bottom: 4px; }
    .vibe-tag {
      display: inline-block; background: rgba(255,255,255,0.2); padding: 2px 12px;
      border-radius: 20px; font-size: 0.75rem; margin-bottom: var(--space-sm);
    }
    .pillar-banner p { font-size: 0.9rem; opacity: 0.9; line-height: 1.5; }

    .missions-section h3 { font-size: 1.1rem; margin-bottom: var(--space-md); }

    .missions-list { display: flex; flex-direction: column; gap: var(--space-md); }

    .mission-card { cursor: pointer; padding: var(--space-md) var(--space-lg); }
    .mission-card:active {
      box-shadow: inset 3px 3px 6px var(--shadow-neu-inset-dark), inset -3px -3px 6px var(--shadow-neu-inset-light);
    }

    .mission-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .mission-header h4 { font-size: 1rem; font-family: 'Outfit', sans-serif; font-weight: 600; }

    .difficulty-badge {
      font-size: 0.65rem; padding: 2px 8px; border-radius: 10px; font-weight: 500; text-transform: uppercase;
    }
    .difficulty-badge.beginner { background: #E8F5E9; color: #2E7D32; }
    .difficulty-badge.intermediate { background: #FFF8E1; color: #F57F17; }
    .difficulty-badge.advanced { background: #FFEBEE; color: #C62828; }

    .mission-desc { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: var(--space-sm); }

    .mission-meta { display: flex; gap: var(--space-md); }
    .meta-item { font-size: 0.75rem; color: var(--color-text-muted); }
  `]
})
export class PillarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pillar: PillarData | null = null;

  private pillarsData: PillarData[] = [
    {
      id: 'village-square',
      name: 'The Village Square',
      subtitle: 'Social Communication',
      description: 'Overcome shyness in groups, make friends, and master the art of storytelling.',
      vibe: 'The Lounge',
      color: '#E8722A',
      gradientStart: '#E8722A',
      gradientEnd: '#F4A460',
      missions: [
        { id: 'vs-1', title: 'The Ice Breaker', description: 'Start a conversation with a stranger at a gathering.', difficulty: 'beginner', duration: 5, xpReward: 50 },
        { id: 'vs-2', title: 'The Storyteller', description: 'Tell an engaging story to a small group of friends.', difficulty: 'beginner', duration: 7, xpReward: 75 },
        { id: 'vs-3', title: 'The Group Leader', description: 'Lead a group discussion and ensure everyone is heard.', difficulty: 'intermediate', duration: 10, xpReward: 100 },
        { id: 'vs-4', title: 'The Toast Master', description: 'Give a heartfelt toast at a celebration.', difficulty: 'intermediate', duration: 5, xpReward: 100 },
        { id: 'vs-5', title: 'The Crowd Speaker', description: 'Address a large gathering with confidence.', difficulty: 'advanced', duration: 10, xpReward: 150 },
        { id: 'vs-6', title: 'The Peacemaker', description: 'Mediate a disagreement between two friends.', difficulty: 'advanced', duration: 8, xpReward: 125 },
        { id: 'vs-7', title: 'The Encourager', description: 'Lift someone\'s spirits with genuine words.', difficulty: 'beginner', duration: 5, xpReward: 50 },
        { id: 'vs-8', title: 'The Cultural Bridge', description: 'Explain your culture to someone different.', difficulty: 'intermediate', duration: 8, xpReward: 100 },
      ],
    },
    {
      id: 'boardroom',
      name: 'The Boardroom',
      subtitle: 'Professional Communication',
      description: 'Master job interviews, pitch business ideas, and speak with authority.',
      vibe: 'The Power',
      color: '#2C5F7C',
      gradientStart: '#2C5F7C',
      gradientEnd: '#4A90D9',
      missions: [
        { id: 'br-1', title: 'The Elevator Pitch', description: 'Introduce yourself and your skills in 60 seconds.', difficulty: 'beginner', duration: 3, xpReward: 50 },
        { id: 'br-2', title: 'The Interview', description: 'Answer tough interview questions with confidence.', difficulty: 'intermediate', duration: 10, xpReward: 100 },
        { id: 'br-3', title: 'The Business Pitch', description: 'Pitch a business idea to potential investors.', difficulty: 'advanced', duration: 10, xpReward: 150 },
        { id: 'br-4', title: 'The Salary Talk', description: 'Negotiate your salary with confidence and tact.', difficulty: 'advanced', duration: 8, xpReward: 125 },
        { id: 'br-5', title: 'The Meeting Voice', description: 'Contribute meaningfully in a team meeting.', difficulty: 'beginner', duration: 7, xpReward: 75 },
        { id: 'br-6', title: 'The Presentation', description: 'Deliver a professional presentation.', difficulty: 'intermediate', duration: 10, xpReward: 100 },
        { id: 'br-7', title: 'The Networker', description: 'Build connections at a networking event.', difficulty: 'intermediate', duration: 8, xpReward: 100 },
        { id: 'br-8', title: 'The Leader\'s Address', description: 'Inspire your team as a new leader.', difficulty: 'advanced', duration: 8, xpReward: 150 },
      ],
    },
    {
      id: 'peace-room',
      name: 'The Peace Room',
      subtitle: 'Conflict Resolution',
      description: 'Handle peer pressure, disagree respectfully with elders, and de-escalate arguments.',
      vibe: 'The Wisdom',
      color: '#5B8C5A',
      gradientStart: '#5B8C5A',
      gradientEnd: '#7CB342',
      missions: [
        { id: 'pr-1', title: 'The Gentle No', description: 'Say no to peer pressure without losing friends.', difficulty: 'beginner', duration: 5, xpReward: 50 },
        { id: 'pr-2', title: 'The Respectful Challenge', description: 'Disagree with an elder without being disrespectful.', difficulty: 'intermediate', duration: 8, xpReward: 100 },
        { id: 'pr-3', title: 'The De-escalator', description: 'Calm down a heated argument between others.', difficulty: 'intermediate', duration: 8, xpReward: 100 },
        { id: 'pr-4', title: 'The Boundary Setter', description: 'Set clear personal boundaries with someone pushy.', difficulty: 'beginner', duration: 5, xpReward: 75 },
        { id: 'pr-5', title: 'The Apologizer', description: 'Give a sincere apology when you are wrong.', difficulty: 'beginner', duration: 5, xpReward: 50 },
        { id: 'pr-6', title: 'The Advocate', description: 'Stand up for someone who cannot speak for themselves.', difficulty: 'advanced', duration: 8, xpReward: 125 },
        { id: 'pr-7', title: 'The Family Diplomat', description: 'Navigate a family disagreement about your future.', difficulty: 'advanced', duration: 10, xpReward: 150 },
        { id: 'pr-8', title: 'The Truth Speaker', description: 'Deliver difficult news with empathy and clarity.', difficulty: 'advanced', duration: 8, xpReward: 125 },
      ],
    },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pillar = this.pillarsData.find((p) => p.id === id) || null;
  }

  startMission(mission: Mission): void {
    this.router.navigate(['/sparring', this.pillar?.id, mission.id]);
  }
}
