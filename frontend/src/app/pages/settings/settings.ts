import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container settings-page">
      <div class="page-header fade-in-up">
        <h1>Settings</h1>
      </div>

      <!-- Profile -->
      <div class="section neu-card fade-in-up">
        <h3>Profile</h3>
        <div class="profile-row">
          <div class="avatar-circle">
            <span>{{ userService.user().name.charAt(0) }}</span>
          </div>
          <div class="profile-info">
            <h4>{{ userService.user().name }}</h4>
            <p>{{ userService.user().email }}</p>
          </div>
        </div>
      </div>

      <!-- Guardian -->
      <div class="section neu-card fade-in-up" style="animation-delay: 0.1s">
        <h3>Your Guardian</h3>
        <div class="guardian-row" routerLink="/guardian-select">
          <span class="guardian-icon">{{ getGuardianEmoji() }}</span>
          <div>
            <h4>{{ getGuardianName() }}</h4>
            <p class="change-link">Tap to change</p>
          </div>
        </div>
      </div>

      <!-- Accessibility -->
      <div class="section neu-card fade-in-up" style="animation-delay: 0.2s">
        <h3>Accessibility</h3>

        <div class="setting-row" (click)="userService.toggleDataLightMode()">
          <div class="setting-info">
            <h4>Data-Light Mode</h4>
            <p>Remove animations, reduce data usage</p>
          </div>
          <div class="toggle" [class.active]="userService.dataLightMode()">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <h4>Haptic Feedback</h4>
            <p>Vibrate on good vocal resonance</p>
          </div>
          <div class="toggle active">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <h4>Language</h4>
            <p>English</p>
          </div>
          <span class="arrow">→</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="section neu-card fade-in-up" style="animation-delay: 0.3s">
        <h3>Your Stats</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ userService.user().progress.level }}</span>
            <span class="stat-label">Level</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ userService.user().progress.xp }}</span>
            <span class="stat-label">Total XP</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ userService.user().progress.completedMissions }}</span>
            <span class="stat-label">Missions</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ userService.user().progress.streak }}</span>
            <span class="stat-label">Day Streak</span>
          </div>
        </div>
      </div>

      <!-- About -->
      <div class="section neu-card fade-in-up" style="animation-delay: 0.4s">
        <h3>About Echo Africa</h3>
        <p class="about-text">
          Echo Africa ensures that no young person reaches adulthood without the ability to stand up for themselves.
          We replace timidity with tact and shyness with strength.
        </p>
        <p class="version">Version 1.0.0 MVP</p>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { padding-top: var(--space-xl); }

    .section { margin-bottom: var(--space-lg); }
    .section h3 { font-size: 1rem; margin-bottom: var(--space-md); color: var(--color-text-primary); }

    .profile-row { display: flex; align-items: center; gap: var(--space-md); }
    .avatar-circle {
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, var(--color-gold-warm), var(--color-gold-deep));
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 600; font-size: 1.2rem;
    }
    .profile-info h4 { font-size: 1rem; font-family: 'Outfit', sans-serif; font-weight: 600; }
    .profile-info p { font-size: 0.8rem; color: var(--color-text-muted); }

    .guardian-row { display: flex; align-items: center; gap: var(--space-md); cursor: pointer; }
    .guardian-icon { font-size: 2rem; }
    .guardian-row h4 { font-size: 0.95rem; font-family: 'Outfit', sans-serif; font-weight: 600; }
    .change-link { font-size: 0.75rem; color: var(--color-gold-deep); }

    .setting-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--space-sm) 0; cursor: pointer;
      border-bottom: 1px solid var(--color-bg-secondary);
    }
    .setting-row:last-child { border-bottom: none; }
    .setting-info h4 { font-size: 0.9rem; font-family: 'Outfit', sans-serif; font-weight: 500; }
    .setting-info p { font-size: 0.75rem; color: var(--color-text-muted); }

    .toggle {
      width: 44px; height: 24px; border-radius: 12px;
      background: var(--color-bg-secondary); position: relative; transition: background 0.3s;
      box-shadow: inset 2px 2px 4px var(--shadow-neu-inset-dark), inset -2px -2px 4px var(--shadow-neu-inset-light);
    }
    .toggle.active { background: var(--color-green-sage); }
    .toggle-knob {
      width: 20px; height: 20px; border-radius: 50%; background: white;
      position: absolute; top: 2px; left: 2px; transition: transform 0.3s;
      box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    }
    .toggle.active .toggle-knob { transform: translateX(20px); }

    .arrow { color: var(--color-text-muted); font-size: 1.2rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
    .stat-item { text-align: center; padding: var(--space-sm); }
    .stat-item .stat-value { display: block; font-size: 1.4rem; font-weight: 700; color: var(--color-gold-deep); }
    .stat-item .stat-label { font-size: 0.75rem; color: var(--color-text-muted); }

    .about-text { font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; }
    .version { font-size: 0.7rem; color: var(--color-text-muted); margin-top: var(--space-sm); }
  `]
})
export class SettingsComponent {
  userService = inject(UserService);

  getGuardianEmoji(): string {
    const map: Record<string, string> = { lion: '🦁', eagle: '🦅', elephant: '🐘' };
    return map[this.userService.user().guardianId] || '🦁';
  }

  getGuardianName(): string {
    const map: Record<string, string> = { lion: 'Simba the Wise', eagle: 'Aquila the Swift', elephant: 'Tembo the Steady' };
    return map[this.userService.user().guardianId] || 'Simba the Wise';
  }
}
