import { Injectable } from '@nestjs/common';

export interface OfflineMission {
  id: string;
  title: string;
  description: string;
  category: 'social' | 'professional' | 'conflict';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  duration: string;
  instructions: string[];
}

export interface DailyGym {
  id: string;
  title: string;
  type: 'vocal-warmup' | 'social-puzzle' | 'breathing';
  description: string;
  duration: number;
  instructions: string[];
}

@Injectable()
export class MissionsService {
  private offlineMissions: OfflineMission[] = [
    {
      id: 'om-1',
      title: 'The Compliment Challenge',
      description: 'Give someone a genuine compliment today and observe their reaction.',
      category: 'social',
      difficulty: 'easy',
      xpReward: 25,
      duration: '1 day',
      instructions: [
        'Choose someone you interact with regularly',
        'Give them a specific, genuine compliment',
        'Notice how they react and how it makes you feel',
        'Report back to earn your points',
      ],
    },
    {
      id: 'om-2',
      title: 'The Question Asker',
      description: 'Ask a thoughtful question in class or a meeting today.',
      category: 'professional',
      difficulty: 'easy',
      xpReward: 30,
      duration: '1 day',
      instructions: [
        'Prepare one question about the topic being discussed',
        'Raise your hand and ask clearly',
        'Listen actively to the response',
        'Report what you learned',
      ],
    },
    {
      id: 'om-3',
      title: 'The Respectful Disagreement',
      description: 'Express a different opinion in a conversation today.',
      category: 'conflict',
      difficulty: 'medium',
      xpReward: 40,
      duration: '1 day',
      instructions: [
        'Wait for a topic you have a genuine opinion about',
        'Start with "I see your point, but I think..."',
        'Share your perspective calmly',
        'Report how the conversation went',
      ],
    },
    {
      id: 'om-4',
      title: 'The Phone Call',
      description: 'Make a phone call instead of sending a text message.',
      category: 'social',
      difficulty: 'medium',
      xpReward: 35,
      duration: '1 day',
      instructions: [
        'Choose someone you would normally text',
        'Call them and have a real conversation',
        'Keep the call going for at least 5 minutes',
        'Report what you talked about',
      ],
    },
    {
      id: 'om-5',
      title: 'The Public Thank You',
      description: 'Thank someone publicly for something they did.',
      category: 'social',
      difficulty: 'medium',
      xpReward: 35,
      duration: '1 day',
      instructions: [
        'Think of someone who helped you recently',
        'Thank them in front of at least one other person',
        'Be specific about what they did',
        'Report their reaction',
      ],
    },
    {
      id: 'om-6',
      title: 'The Stranger Greeting',
      description: 'Greet 5 strangers warmly today.',
      category: 'social',
      difficulty: 'easy',
      xpReward: 20,
      duration: '1 day',
      instructions: [
        'Smile and make brief eye contact',
        'Say "Good morning" or "How are you?"',
        'Count each greeting',
        'Report how many greetings you gave and how it felt',
      ],
    },
  ];

  private dailyGymExercises: DailyGym[] = [
    {
      id: 'dg-1',
      title: 'Power Breathing',
      type: 'breathing',
      description: 'Deep breathing exercises to center your voice and calm nerves.',
      duration: 2,
      instructions: [
        'Sit up straight with your shoulders back',
        'Breathe in deeply for 4 counts through your nose',
        'Hold for 4 counts',
        'Breathe out slowly for 6 counts through your mouth',
        'Repeat 5 times',
      ],
    },
    {
      id: 'dg-2',
      title: 'The Tongue Twister',
      type: 'vocal-warmup',
      description: 'Warm up your voice and improve articulation.',
      duration: 3,
      instructions: [
        'Say "She sells seashells" slowly, then faster',
        'Say "Red lorry, yellow lorry" 5 times',
        'Say "Unique New York" 5 times quickly',
        'Hum for 30 seconds to warm your vocal cords',
      ],
    },
    {
      id: 'dg-3',
      title: 'The Mirror Talk',
      type: 'social-puzzle',
      description: 'Practice speaking to yourself in the mirror with confidence.',
      duration: 3,
      instructions: [
        'Stand in front of a mirror',
        'Introduce yourself as if meeting someone important',
        'Watch your body language and facial expressions',
        'Adjust until you look and sound confident',
      ],
    },
    {
      id: 'dg-4',
      title: 'Vocal Power Scale',
      type: 'vocal-warmup',
      description: 'Practice projecting your voice at different volumes.',
      duration: 2,
      instructions: [
        'Start by whispering a sentence',
        'Gradually increase your volume over 5 repetitions',
        'End by speaking at full projection (not shouting)',
        'Feel your voice resonating from your chest',
      ],
    },
  ];

  getOfflineMissions(): OfflineMission[] {
    return this.offlineMissions;
  }

  getOfflineMission(id: string): OfflineMission | undefined {
    return this.offlineMissions.find((m) => m.id === id);
  }

  getDailyGym(): DailyGym[] {
    return this.dailyGymExercises;
  }

  getDailyGymExercise(id: string): DailyGym | undefined {
    return this.dailyGymExercises.find((e) => e.id === id);
  }

  getTodaysDailyGym(): DailyGym[] {
    // Return a selection of exercises for today
    const today = new Date().getDay();
    const shuffled = [...this.dailyGymExercises].sort(
      () => 0.5 - Math.sin(today),
    );
    return shuffled.slice(0, 3);
  }
}
