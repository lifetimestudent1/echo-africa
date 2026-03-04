import { Injectable } from '@nestjs/common';
import { UserProgress } from '../common/types';

export interface User {
  id: string;
  name: string;
  email: string;
  guardianId: string;
  preferredLanguage: string;
  progress: UserProgress;
  createdAt: Date;
  dataLightMode: boolean;
}

@Injectable()
export class UsersService {
  private users: Map<string, User> = new Map();

  constructor() {
    // Seed a demo user
    const demoUser: User = {
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
      createdAt: new Date(),
      dataLightMode: false,
    };
    this.users.set(demoUser.id, demoUser);
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  create(data: Partial<User>): User {
    const id = `user-${Date.now()}`;
    const user: User = {
      id,
      name: data.name || '',
      email: data.email || '',
      guardianId: data.guardianId || 'lion',
      preferredLanguage: data.preferredLanguage || 'en',
      progress: {
        level: 1,
        xp: 0,
        streak: 0,
        completedMissions: 0,
        totalMissions: 24,
        communicationIQ: 30,
        badges: [],
      },
      createdAt: new Date(),
      dataLightMode: false,
    };
    this.users.set(id, user);
    return user;
  }

  updateProgress(id: string, progress: Partial<UserProgress>): User | undefined {
    const user = this.users.get(id);
    if (user) {
      user.progress = { ...user.progress, ...progress };
      this.users.set(id, user);
    }
    return user;
  }

  toggleDataLightMode(id: string): User | undefined {
    const user = this.users.get(id);
    if (user) {
      user.dataLightMode = !user.dataLightMode;
      this.users.set(id, user);
    }
    return user;
  }
}
