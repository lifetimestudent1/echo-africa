import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div [class.data-light-mode]="userService.dataLightMode()">
      <router-outlet></router-outlet>

      <!-- Bottom Navigation (One-handed, bottom-placed) -->
      <nav class="bottom-nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item">
          <span class="nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          Home
        </a>
        <a routerLink="/daily-gym" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/>
              <line x1="10" y1="1" x2="10" y2="4"/>
              <line x1="14" y1="1" x2="14" y2="4"/>
            </svg>
          </span>
          Gym
        </a>
        <a routerLink="/assessment" routerLinkActive="active" class="nav-item nav-center">
          <span class="nav-icon center-orb">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="12" fill="currentColor" opacity="0.15"/>
              <circle cx="14" cy="14" r="8" fill="currentColor" opacity="0.3"/>
              <circle cx="14" cy="14" r="4" fill="currentColor"/>
            </svg>
          </span>
          Speak
        </a>
        <a routerLink="/certificates" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7"/>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
            </svg>
          </span>
          Badges
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </span>
          Settings
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: var(--color-bg-card);
      box-shadow: 0 -4px 16px var(--shadow-neu-dark);
      display: flex; justify-content: space-around; align-items: center;
      padding: 8px 12px; padding-bottom: max(8px, env(safe-area-inset-bottom));
      z-index: 100; border-radius: 28px 28px 0 0;
    }
    .nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      padding: 4px 8px; border-radius: 12px; cursor: pointer;
      transition: all 0.2s ease; text-decoration: none;
      color: var(--color-text-muted); font-size: 0.65rem; font-weight: 500;
    }
    .nav-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }
    .nav-item.active {
      color: var(--color-gold-deep);
      background: var(--color-bg-secondary);
      box-shadow: inset 2px 2px 4px var(--shadow-neu-inset-dark), inset -2px -2px 4px var(--shadow-neu-inset-light);
    }
    .nav-center .center-orb { color: var(--color-gold-warm); }
    .nav-center.active .center-orb { color: var(--color-gold-deep); }
  `]
})
export class App {
  userService = inject(UserService);
}
