import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

interface Certificate {
  id: string;
  title: string;
  description: string;
  communicationIQ: number;
  issuedAt: string;
  color: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container certs-page">
      <button class="back-btn neu-button" routerLink="/">← Back</button>
      <div class="page-header fade-in-up">
        <h1>Your Certificates</h1>
        <p>Share your Communication IQ with the world</p>
      </div>

      <!-- Badges -->
      <div class="badges-section fade-in-up" style="animation-delay: 0.1s">
        <h3>Badges Earned</h3>
        <div class="badges-grid">
          <div *ngFor="let badge of badges" class="badge-item" [class.earned]="userService.user().progress.badges.includes(badge.id)">
            <div class="badge-icon" [style.background]="userService.user().progress.badges.includes(badge.id) ? badge.color + '22' : '#eee'">
              <span>{{ badge.icon }}</span>
            </div>
            <span class="badge-name">{{ badge.name }}</span>
          </div>
        </div>
      </div>

      <!-- Certificate Cards -->
      <div class="certs-list">
        <div *ngFor="let cert of certificates; let i = index"
          class="cert-card fade-in-up"
          [style.animation-delay]="(0.2 + i * 0.1) + 's'"
          [style.border-left-color]="cert.color"
        >
          <div class="cert-inner">
            <div class="cert-header">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="18" [attr.fill]="cert.color" opacity="0.15"/>
                <circle cx="20" cy="20" r="12" [attr.fill]="cert.color" opacity="0.3"/>
                <path d="M14 20l4 4 8-8" [attr.stroke]="cert.color" stroke-width="2" fill="none"/>
              </svg>
              <div>
                <h4>{{ cert.title }}</h4>
                <p class="cert-date">{{ cert.issuedAt }}</p>
              </div>
            </div>
            <p class="cert-desc">{{ cert.description }}</p>
            <div class="cert-footer">
              <span class="iq-badge">Communication IQ: {{ cert.communicationIQ }}</span>
              <button class="share-btn neu-button">Share</button>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state neu-inset" *ngIf="certificates.length === 0">
        <p>Complete quests to earn certificates and build your Communication IQ!</p>
        <button class="neu-button" routerLink="/">Start a Quest</button>
      </div>
    </div>
  `,
  styles: [`
    .certs-page { padding-top: var(--space-md); }
    .back-btn { margin-bottom: var(--space-md); font-size: 0.9rem; }

    .badges-section { margin-bottom: var(--space-xl); }
    .badges-section h3 { font-size: 1rem; margin-bottom: var(--space-md); }
    .badges-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); }
    .badge-item { text-align: center; opacity: 0.4; transition: opacity 0.3s; }
    .badge-item.earned { opacity: 1; }
    .badge-icon {
      width: 56px; height: 56px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; margin: 0 auto 4px; font-size: 1.5rem;
    }
    .badge-name { font-size: 0.65rem; color: var(--color-text-muted); }

    .certs-list { display: flex; flex-direction: column; gap: var(--space-md); }

    .cert-card {
      background: var(--color-bg-card); border-radius: var(--radius-md); border-left: 4px solid;
      box-shadow: 6px 6px 12px var(--shadow-neu-dark), -6px -6px 12px var(--shadow-neu-light);
    }
    .cert-inner { padding: var(--space-lg); }
    .cert-header { display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-sm); }
    .cert-header h4 { font-size: 1rem; font-family: 'Outfit', sans-serif; font-weight: 600; }
    .cert-date { font-size: 0.7rem; color: var(--color-text-muted); }
    .cert-desc { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: var(--space-md); }
    .cert-footer { display: flex; justify-content: space-between; align-items: center; }
    .iq-badge { font-size: 0.75rem; font-weight: 600; color: var(--color-gold-deep); }
    .share-btn { font-size: 0.8rem; padding: 4px 16px; }

    .empty-state { text-align: center; padding: var(--space-xl); }
    .empty-state p { font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: var(--space-md); }
  `]
})
export class CertificatesComponent {
  userService = inject(UserService);

  badges = [
    { id: 'first-words', name: 'First Words', icon: '🎤', color: '#D4A843' },
    { id: 'calm-speaker', name: 'Calm Speaker', icon: '🧘', color: '#5B8C5A' },
    { id: 'village-explorer', name: 'Village Explorer', icon: '🏘️', color: '#E8722A' },
    { id: 'boardroom-ready', name: 'Boardroom Ready', icon: '💼', color: '#2C5F7C' },
    { id: 'peacekeeper', name: 'Peacekeeper', icon: '☮️', color: '#7CB342' },
    { id: 'power-voice', name: 'Power Voice', icon: '🔊', color: '#C62828' },
    { id: 'streak-master', name: 'Streak Master', icon: '🔥', color: '#F57F17' },
    { id: 'story-weaver', name: 'Story Weaver', icon: '📖', color: '#8B6914' },
  ];

  certificates: Certificate[] = [
    {
      id: 'cert-1',
      title: 'Village Square Initiate',
      description: 'Completed the introductory social communication missions with confidence and warmth.',
      communicationIQ: 55,
      issuedAt: 'Feb 28, 2026',
      color: '#E8722A',
    },
    {
      id: 'cert-2',
      title: 'First Steps in Confidence',
      description: 'Successfully completed the initial Vibe Check assessment and began the confidence journey.',
      communicationIQ: 42,
      issuedAt: 'Feb 25, 2026',
      color: '#D4A843',
    },
  ];
}
