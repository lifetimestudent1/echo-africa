import { Injectable } from '@nestjs/common';
import { CommunicationRadar, VocalEnergy } from '../common/types';

export interface Assessment {
  id: string;
  userId: string;
  type: 'vibe-check' | 'quest-exam' | 'skill-test';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  completedAt?: Date;
  results?: AssessmentResult;
}

export interface AssessmentResult {
  overallScore: number;
  communicationIQ: number;
  vocalEnergy: VocalEnergy;
  radar: CommunicationRadar;
  strengths: string[];
  areasToImprove: string[];
  recommendation: string;
}

export interface Certificate {
  id: string;
  userId: string;
  questId: string;
  title: string;
  communicationIQ: number;
  issuedAt: Date;
  badgeUrl: string;
}

@Injectable()
export class AssessmentsService {
  private assessments: Map<string, Assessment> = new Map();
  private certificates: Map<string, Certificate> = new Map();

  createVibeCheck(userId: string): Assessment {
    const id = `assessment-${Date.now()}`;
    const assessment: Assessment = {
      id,
      userId,
      type: 'vibe-check',
      status: 'pending',
      createdAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  completeVibeCheck(id: string): Assessment | undefined {
    const assessment = this.assessments.get(id);
    if (assessment) {
      assessment.status = 'completed';
      assessment.completedAt = new Date();
      assessment.results = {
        overallScore: Math.round(40 + Math.random() * 60),
        communicationIQ: Math.round(35 + Math.random() * 65),
        vocalEnergy: 'calm',
        radar: {
          reach: Math.round(30 + Math.random() * 70),
          resonance: Math.round(25 + Math.random() * 75),
          clarity: Math.round(40 + Math.random() * 60),
          confidence: Math.round(20 + Math.random() * 80),
          empathy: Math.round(45 + Math.random() * 55),
          authority: Math.round(15 + Math.random() * 85),
        },
        strengths: [
          'Natural warmth in your voice',
          'Good listening awareness',
          'Thoughtful word choices',
        ],
        areasToImprove: [
          'Voice projection could be stronger',
          'Reduce filler words (um, uh)',
          'More confident opening statements',
        ],
        recommendation:
          'Start with The Village Square to build your social confidence, then move to The Boardroom.',
      };
      this.assessments.set(id, assessment);
    }
    return assessment;
  }

  findByUser(userId: string): Assessment[] {
    return Array.from(this.assessments.values()).filter(
      (a) => a.userId === userId,
    );
  }

  issueCertificate(userId: string, questId: string, title: string): Certificate {
    const id = `cert-${Date.now()}`;
    const cert: Certificate = {
      id,
      userId,
      questId,
      title,
      communicationIQ: Math.round(60 + Math.random() * 40),
      issuedAt: new Date(),
      badgeUrl: `/badges/${questId}.svg`,
    };
    this.certificates.set(id, cert);
    return cert;
  }

  getUserCertificates(userId: string): Certificate[] {
    return Array.from(this.certificates.values()).filter(
      (c) => c.userId === userId,
    );
  }
}
