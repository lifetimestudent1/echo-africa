import { Injectable } from '@nestjs/common';
import { VoiceAnalysis, CommunicationRadar, SessionStatus } from '../common/types';

export interface Session {
  id: string;
  userId: string;
  missionId: string;
  pillarId: string;
  status: SessionStatus;
  startedAt: Date;
  completedAt?: Date;
  voiceAnalysis?: VoiceAnalysis;
  communicationRadar?: CommunicationRadar;
  xpEarned: number;
  feedback: string[];
  guardianTips: string[];
}

@Injectable()
export class SessionsService {
  private sessions: Map<string, Session> = new Map();

  create(data: Partial<Session>): Session {
    const id = `session-${Date.now()}`;
    const session: Session = {
      id,
      userId: data.userId || '',
      missionId: data.missionId || '',
      pillarId: data.pillarId || '',
      status: 'in-progress',
      startedAt: new Date(),
      xpEarned: 0,
      feedback: [],
      guardianTips: [],
    };
    this.sessions.set(id, session);
    return session;
  }

  findById(id: string): Session | undefined {
    return this.sessions.get(id);
  }

  findByUser(userId: string): Session[] {
    return Array.from(this.sessions.values()).filter(
      (s) => s.userId === userId,
    );
  }

  complete(id: string): Session | undefined {
    const session = this.sessions.get(id);
    if (session) {
      session.status = 'completed';
      session.completedAt = new Date();
      // Generate simulated voice analysis
      session.voiceAnalysis = {
        energy: 'confident',
        pitch: Math.round(60 + Math.random() * 40),
        volume: Math.round(50 + Math.random() * 50),
        clarity: Math.round(55 + Math.random() * 45),
        fillerWords: Math.round(Math.random() * 8),
        pace: Math.round(70 + Math.random() * 30),
      };
      // Generate simulated communication radar
      session.communicationRadar = {
        reach: Math.round(40 + Math.random() * 60),
        resonance: Math.round(35 + Math.random() * 65),
        clarity: Math.round(45 + Math.random() * 55),
        confidence: Math.round(30 + Math.random() * 70),
        empathy: Math.round(50 + Math.random() * 50),
        authority: Math.round(25 + Math.random() * 75),
      };
      session.xpEarned = Math.round(50 + Math.random() * 100);
      session.feedback = [
        'Your voice projection improved significantly during the second half.',
        'Try to maintain eye contact even when thinking of your next point.',
        'Great use of pauses for emphasis!',
      ];
      this.sessions.set(id, session);
    }
    return session;
  }
}
