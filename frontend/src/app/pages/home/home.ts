import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container home-page">
      <!-- Greeting -->
      <div class="greeting fade-in-up">
        <span class="greeting-label">Welcome back,</span>
        <h1 class="greeting-name">{{ userService.user().name.split(' ')[0] }}</h1>
        <div class="streak-badge badge-chip" *ngIf="userService.user().progress.streak > 0">
          <span class="streak-icon">🔥</span>
          {{ userService.user().progress.streak }} day streak
        </div>
      </div>

      <!-- Voice Orb -->
      <div class="orb-container fade-in-up" style="animation-delay: 0.1s">
        <div class="voice-orb" [class]="'energy-' + orbEnergy" (click)="router.navigate(['/assessment'])">
          <div class="orb-inner">
            <div class="orb-glow"></div>
            <div class="orb-core">
              <svg viewBox="0 0 100 100" class="orb-svg">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
                <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
            <span class="orb-label">Tap to begin</span>
          </div>
        </div>
        <div class="orb-stats">
          <div class="stat">
            <span class="stat-value">{{ userService.user().progress.communicationIQ }}</span>
            <span class="stat-label">Comm IQ</span>
          </div>
          <div class="stat">
            <span class="stat-value">Lvl {{ userService.user().progress.level }}</span>
            <span class="stat-label">Level</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ userService.user().progress.xp }}</span>
            <span class="stat-label">XP</span>
          </div>
        </div>
      </div>

      <!-- Progress Tree -->
      <div class="progress-section fade-in-up" style="animation-delay: 0.2s">
        <h3>Your Journey</h3>
        <div class="progress-bar" style="margin-top: 8px">
          <div class="progress-fill" [style.width.%]="userService.progressPercent()"></div>
        </div>
        <span class="progress-text">{{ userService.user().progress.completedMissions }}/{{ userService.user().progress.totalMissions }} missions</span>
      </div>

      <!-- Three Portals -->
      <h3 class="section-title fade-in-up" style="animation-delay: 0.3s">Choose Your Path</h3>
      <div class="portals-grid">
        <div class="portal-card village fade-in-up" style="animation-delay: 0.35s" routerLink="/pillar/village-square">
          <div class="portal-icon">
            <svg viewBox="0 0 48 48" width="48" height="48">
              <circle cx="24" cy="24" r="20" fill="#E8722A" opacity="0.2"/>
              <path d="M24 8 L28 18 L38 18 L30 24 L33 35 L24 28 L15 35 L18 24 L10 18 L20 18 Z" fill="#E8722A" opacity="0.7"/>
              <circle cx="24" cy="24" r="8" fill="#E8722A"/>
            </svg>
          </div>
          <h4>Village Square</h4>
          <span class="portal-subtitle">Social</span>
        </div>

        <div class="portal-card boardroom fade-in-up" style="animation-delay: 0.4s" routerLink="/pillar/boardroom">
          <div class="portal-icon">
            <svg viewBox="0 0 48 48" width="48" height="48">
              <rect x="8" y="14" width="32" height="24" rx="4" fill="#2C5F7C" opacity="0.2"/>
              <rect x="14" y="10" width="20" height="4" rx="2" fill="#2C5F7C" opacity="0.5"/>
              <rect x="12" y="18" width="24" height="16" rx="3" fill="#2C5F7C" opacity="0.3"/>
              <circle cx="24" cy="26" r="6" fill="#2C5F7C"/>
            </svg>
          </div>
          <h4>Boardroom</h4>
          <span class="portal-subtitle">Professional</span>
        </div>

        <div class="portal-card peace fade-in-up" style="animation-delay: 0.45s" routerLink="/pillar/peace-room">
          <div class="portal-icon">
            <svg viewBox="0 0 48 48" width="48" height="48">
              <ellipse cx="24" cy="30" rx="18" ry="10" fill="#5B8C5A" opacity="0.15"/>
              <path d="M12 28 Q18 16 24 20 Q30 16 36 28" fill="none" stroke="#5B8C5A" stroke-width="2" opacity="0.5"/>
              <circle cx="24" cy="22" r="8" fill="#5B8C5A" opacity="0.3"/>
              <circle cx="24" cy="22" r="4" fill="#5B8C5A"/>
            </svg>
          </div>
          <h4>Peace Room</h4>
          <span class="portal-subtitle">Conflict</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions fade-in-up" style="animation-delay: 0.5s">
        <button class="neu-button quick-action" routerLink="/daily-gym">
          <span class="qa-icon">💪</span>
          <span>Daily Gym</span>
        </button>
        <button class="neu-button quick-action" routerLink="/offline-missions">
          <span class="qa-icon">🌍</span>
          <span>Offline Missions</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .home-page { padding-top: var(--space-xl); }

    .greeting { text-align: center; margin-bottom: var(--space-xl); }
    .greeting-label { color: var(--color-text-muted); font-size: 0.9rem; }
    .greeting-name { font-size: 2rem; margin: 4px 0 8px; color: var(--color-earth-deep); }
    .streak-badge { margin: 0 auto; }
    .streak-icon { font-size: 1rem; }

    .orb-container { display: flex; flex-direction: column; align-items: center; margin-bottom: var(--space-2xl); }

    .voice-orb {
      width: 180px; height: 180px; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 40% 40%, var(--color-gold-glow), var(--color-gold-warm), var(--color-gold-deep));
      box-shadow: 0 0 30px rgba(212, 168, 67, 0.4), 0 0 60px rgba(212, 168, 67, 0.2);
      display: flex; align-items: center; justify-content: center;
      animation: breathe 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
      transition: all 0.3s ease;
    }
    .voice-orb:hover { transform: scale(1.05); }
    .voice-orb.energy-calm { background: radial-gradient(circle at 40% 40%, #A8D86E, var(--color-green-sage), var(--color-green-forest)); }
    .voice-orb.energy-powerful { background: radial-gradient(circle at 40% 40%, var(--color-gold-glow), #E8722A, #C62828); }

    .orb-inner { text-align: center; color: white; }
    .orb-glow { position: absolute; inset: -10px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%); }
    .orb-core { width: 80px; height: 80px; margin: 0 auto 8px; }
    .orb-svg { width: 100%; height: 100%; color: white; }
    .orb-label { font-size: 0.8rem; font-weight: 500; opacity: 0.9; }

    .orb-stats {
      display: flex; gap: var(--space-xl); margin-top: var(--space-lg);
      background: var(--color-bg-card); border-radius: var(--radius-lg); padding: var(--space-md) var(--space-xl);
      box-shadow: 4px 4px 8px var(--shadow-neu-dark), -4px -4px 8px var(--shadow-neu-light);
    }
    .stat { text-align: center; }
    .stat-value { display: block; font-weight: 600; font-size: 1.1rem; color: var(--color-earth-deep); }
    .stat-label { font-size: 0.7rem; color: var(--color-text-muted); }

    .progress-section { margin-bottom: var(--space-xl); }
    .progress-section h3 { font-size: 1rem; margin-bottom: 4px; }
    .progress-text { font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px; display: block; }

    .section-title { font-size: 1.1rem; margin-bottom: var(--space-md); }

    .portals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-bottom: var(--space-xl); }

    .portal-card {
      background: var(--color-bg-card); border-radius: var(--radius-md); padding: var(--space-lg) var(--space-sm);
      text-align: center; cursor: pointer;
      box-shadow: 6px 6px 12px var(--shadow-neu-dark), -6px -6px 12px var(--shadow-neu-light);
      transition: all 0.3s ease;
    }
    .portal-card:hover { transform: translateY(-4px); }
    .portal-card h4 { font-size: 0.85rem; margin-top: var(--space-sm); font-family: 'Outfit', sans-serif; font-weight: 600; }
    .portal-subtitle { font-size: 0.7rem; color: var(--color-text-muted); }
    .portal-icon { margin-bottom: 4px; }

    .portal-card.village { border-bottom: 3px solid var(--color-village); }
    .portal-card.boardroom { border-bottom: 3px solid var(--color-boardroom); }
    .portal-card.peace { border-bottom: 3px solid var(--color-peace); }

    .quick-actions { display: flex; gap: var(--space-md); }
    .quick-action { flex: 1; justify-content: center; padding: var(--space-md); font-size: 0.9rem; }
    .qa-icon { font-size: 1.2rem; }
  `]
})
export class HomeComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  orbEnergy = 'default';

  ngOnInit(): void {
    const iq = this.userService.user().progress.communicationIQ;
    if (iq < 40) this.orbEnergy = 'calm';
    else if (iq > 70) this.orbEnergy = 'powerful';
  }
}
