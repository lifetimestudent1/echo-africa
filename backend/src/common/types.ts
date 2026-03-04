export type PillarType = 'village-square' | 'boardroom' | 'peace-room';
export type GuardianType = 'lion' | 'eagle' | 'elephant';
export type VocalEnergy = 'timid' | 'calm' | 'confident' | 'powerful' | 'aggressive';
export type SessionStatus = 'in-progress' | 'completed' | 'abandoned';
export type MissionStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type QuestStatus = 'not-started' | 'day-1' | 'day-2' | 'day-3' | 'exam' | 'completed';

export interface VoiceAnalysis {
  energy: VocalEnergy;
  pitch: number;
  volume: number;
  clarity: number;
  fillerWords: number;
  pace: number;
}

export interface CommunicationRadar {
  reach: number;
  resonance: number;
  clarity: number;
  confidence: number;
  empathy: number;
  authority: number;
}

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  communicationIQ: number;
  badges: string[];
}
