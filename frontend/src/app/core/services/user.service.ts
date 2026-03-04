import { Injectable, signal, computed } from '@angular/core';

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  communicationIQ: number;
  badges: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  guardianId: string;
  preferredLanguage: string;
  progress: UserProgress;
  dataLightMode: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSignal = signal<User>({
    id: 'demo-user-1',
    name: 'Kwame Asante',
    email: 'kwame@echoafrica.com',
    guardianId: 'lion',
    preferredLanguage: 'en',
    progress: {
      level: 3,
      xp: 450,
      streak: 5,
      completedMissions: 7,
      totalMissions: 24,
      communicationIQ: 62,
      badges: ['first-words', 'calm-speaker', 'village-explorer'],
    },
    dataLightMode: false,
  });

  user = this.userSignal.asReadonly();

  dataLightMode = computed(() => this.userSignal().dataLightMode);

  progressPercent = computed(() => {
    const p = this.userSignal().progress;
    return Math.round((p.completedMissions / p.totalMissions) * 100);
  });

  setGuardian(guardianId: string): void {
    this.userSignal.update((u) => ({ ...u, guardianId }));
  }

  addXp(amount: number): void {
    this.userSignal.update((u) => ({
      ...u,
      progress: {
        ...u.progress,
        xp: u.progress.xp + amount,
        level: Math.floor((u.progress.xp + amount) / 200) + 1,
      },
    }));
  }

  completeMission(): void {
    this.userSignal.update((u) => ({
      ...u,
      progress: {
        ...u.progress,
        completedMissions: u.progress.completedMissions + 1,
        streak: u.progress.streak + 1,
      },
    }));
  }

  toggleDataLightMode(): void {
    this.userSignal.update((u) => ({
      ...u,
      dataLightMode: !u.dataLightMode,
    }));
  }

  addBadge(badge: string): void {
    this.userSignal.update((u) => ({
      ...u,
      progress: {
        ...u.progress,
        badges: [...u.progress.badges, badge],
      },
    }));
  }
}
