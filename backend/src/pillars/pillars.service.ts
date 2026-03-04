import { Injectable } from '@nestjs/common';
import { PillarType } from '../common/types';

export interface Pillar {
  id: PillarType;
  name: string;
  subtitle: string;
  description: string;
  vibe: string;
  icon: string;
  color: string;
  gradientStart: string;
  gradientEnd: string;
  missions: PillarMission[];
}

export interface PillarMission {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  xpReward: number;
  scenario: string;
  tips: string[];
}

@Injectable()
export class PillarsService {
  private pillars: Pillar[] = [
    {
      id: 'village-square',
      name: 'The Village Square',
      subtitle: 'Social Communication',
      description: 'Overcome shyness in groups, make friends, and master the art of storytelling. Find your voice in the community.',
      vibe: 'The Lounge',
      icon: 'fire',
      color: '#E8722A',
      gradientStart: '#E8722A',
      gradientEnd: '#F4A460',
      missions: [
        {
          id: 'vs-1',
          title: 'The Ice Breaker',
          description: 'Start a conversation with a stranger at a social gathering.',
          difficulty: 'beginner',
          duration: 5,
          xpReward: 50,
          scenario: 'You are at a community event. A person your age is standing alone by the refreshments table. Start a friendly conversation.',
          tips: ['Start with a genuine compliment', 'Ask open-ended questions', 'Share something about yourself too'],
        },
        {
          id: 'vs-2',
          title: 'The Storyteller',
          description: 'Tell an engaging story to a small group of friends.',
          difficulty: 'beginner',
          duration: 7,
          xpReward: 75,
          scenario: 'Your friends are gathered around and ask you to share a memorable experience. Tell them a story that keeps them engaged.',
          tips: ['Set the scene vividly', 'Use pauses for dramatic effect', 'Make eye contact with different people'],
        },
        {
          id: 'vs-3',
          title: 'The Group Leader',
          description: 'Lead a group discussion and ensure everyone is heard.',
          difficulty: 'intermediate',
          duration: 10,
          xpReward: 100,
          scenario: 'You are chosen to lead a discussion about planning a community event. Guide the conversation and make sure everyone contributes.',
          tips: ['Acknowledge each person by name', 'Summarize points before moving on', 'Ask quiet members for their input'],
        },
        {
          id: 'vs-4',
          title: 'The Toast Master',
          description: 'Give a heartfelt toast at a friend\'s celebration.',
          difficulty: 'intermediate',
          duration: 5,
          xpReward: 100,
          scenario: 'Your best friend is celebrating a milestone. Stand up and deliver a warm, memorable toast.',
          tips: ['Speak from the heart', 'Include a specific memory', 'End with a wish for the future'],
        },
        {
          id: 'vs-5',
          title: 'The Crowd Speaker',
          description: 'Address a large gathering with confidence and energy.',
          difficulty: 'advanced',
          duration: 10,
          xpReward: 150,
          scenario: 'You have been invited to speak at a youth rally. Deliver an inspiring message about unity and community.',
          tips: ['Project your voice to the back row', 'Use repetition for emphasis', 'Move with purpose on stage'],
        },
        {
          id: 'vs-6',
          title: 'The Peacemaker',
          description: 'Mediate a disagreement between two friends.',
          difficulty: 'advanced',
          duration: 8,
          xpReward: 125,
          scenario: 'Two of your close friends are in a heated argument. Step in and help them find common ground.',
          tips: ['Listen to both sides without judgment', 'Repeat what each person said to show understanding', 'Suggest a compromise'],
        },
        {
          id: 'vs-7',
          title: 'The Encourager',
          description: 'Lift someone\'s spirits with genuine words of encouragement.',
          difficulty: 'beginner',
          duration: 5,
          xpReward: 50,
          scenario: 'A classmate just failed an important exam and feels devastated. Offer genuine words of encouragement.',
          tips: ['Validate their feelings first', 'Share a time you overcame failure', 'Focus on their strengths'],
        },
        {
          id: 'vs-8',
          title: 'The Cultural Bridge',
          description: 'Explain your culture to someone from a different background.',
          difficulty: 'intermediate',
          duration: 8,
          xpReward: 100,
          scenario: 'A foreign exchange student asks about your culture and traditions. Share your heritage with pride and warmth.',
          tips: ['Be proud but not boastful', 'Use analogies they can relate to', 'Invite questions'],
        },
      ],
    },
    {
      id: 'boardroom',
      name: 'The Boardroom',
      subtitle: 'Professional Communication',
      description: 'Master job interviews, pitch business ideas, and speak with authority. Build your professional voice.',
      vibe: 'The Power',
      icon: 'briefcase',
      color: '#2C5F7C',
      gradientStart: '#2C5F7C',
      gradientEnd: '#4A90D9',
      missions: [
        {
          id: 'br-1',
          title: 'The Elevator Pitch',
          description: 'Introduce yourself and your skills in 60 seconds.',
          difficulty: 'beginner',
          duration: 3,
          xpReward: 50,
          scenario: 'You step into an elevator with a potential employer. You have 60 seconds to make an impression. Go!',
          tips: ['Lead with your strongest skill', 'Be specific, not vague', 'End with what you can offer them'],
        },
        {
          id: 'br-2',
          title: 'The Interview',
          description: 'Answer tough interview questions with confidence.',
          difficulty: 'intermediate',
          duration: 10,
          xpReward: 100,
          scenario: 'You are in a job interview for your dream position. The interviewer asks challenging behavioral questions.',
          tips: ['Use the STAR method', 'Be honest about weaknesses', 'Ask thoughtful questions back'],
        },
        {
          id: 'br-3',
          title: 'The Business Pitch',
          description: 'Pitch a business idea to potential investors.',
          difficulty: 'advanced',
          duration: 10,
          xpReward: 150,
          scenario: 'You are presenting your startup idea to a panel of investors. Convince them your idea is worth funding.',
          tips: ['Start with the problem you solve', 'Show the market opportunity', 'Be clear about what you need'],
        },
        {
          id: 'br-4',
          title: 'The Salary Talk',
          description: 'Negotiate your salary with confidence and tact.',
          difficulty: 'advanced',
          duration: 8,
          xpReward: 125,
          scenario: 'You received a job offer but the salary is lower than expected. Negotiate respectfully for better terms.',
          tips: ['Know your market value', 'Focus on value you bring', 'Be willing to discuss non-salary benefits'],
        },
        {
          id: 'br-5',
          title: 'The Meeting Voice',
          description: 'Contribute meaningfully in a team meeting.',
          difficulty: 'beginner',
          duration: 7,
          xpReward: 75,
          scenario: 'You are in a team meeting and have a great idea. Speak up and share it clearly with the group.',
          tips: ['Wait for a natural pause', 'Start with "Building on that idea..."', 'Be concise and specific'],
        },
        {
          id: 'br-6',
          title: 'The Presentation',
          description: 'Deliver a professional presentation to your team.',
          difficulty: 'intermediate',
          duration: 10,
          xpReward: 100,
          scenario: 'Present your quarterly project results to your team and manager. Make it engaging and informative.',
          tips: ['Start with the key takeaway', 'Use stories and examples', 'Handle questions gracefully'],
        },
        {
          id: 'br-7',
          title: 'The Networker',
          description: 'Build connections at a professional networking event.',
          difficulty: 'intermediate',
          duration: 8,
          xpReward: 100,
          scenario: 'You are at an industry conference. Approach professionals and build meaningful connections.',
          tips: ['Show genuine interest in others', 'Have your story ready', 'Follow up within 24 hours'],
        },
        {
          id: 'br-8',
          title: 'The Leader\'s Address',
          description: 'Inspire your team as a new leader.',
          difficulty: 'advanced',
          duration: 8,
          xpReward: 150,
          scenario: 'You were just promoted to team lead. Address your team for the first time and set the vision.',
          tips: ['Acknowledge the team first', 'Share your vision clearly', 'Invite collaboration'],
        },
      ],
    },
    {
      id: 'peace-room',
      name: 'The Peace Room',
      subtitle: 'Conflict Resolution',
      description: 'Handle peer pressure, disagree respectfully with elders, and de-escalate arguments. Master the wisdom of words.',
      vibe: 'The Wisdom',
      icon: 'water',
      color: '#5B8C5A',
      gradientStart: '#5B8C5A',
      gradientEnd: '#7CB342',
      missions: [
        {
          id: 'pr-1',
          title: 'The Gentle No',
          description: 'Say no to peer pressure without losing friends.',
          difficulty: 'beginner',
          duration: 5,
          xpReward: 50,
          scenario: 'Your friends are pressuring you to skip class and go to a party. Decline firmly but kindly.',
          tips: ['Be direct but warm', 'Offer an alternative', 'Don\'t apologize for your decision'],
        },
        {
          id: 'pr-2',
          title: 'The Respectful Challenge',
          description: 'Disagree with an elder without being disrespectful.',
          difficulty: 'intermediate',
          duration: 8,
          xpReward: 100,
          scenario: 'An older family member has a view you strongly disagree with. Express your perspective while maintaining respect.',
          tips: ['Start by acknowledging their experience', 'Use "I feel" statements', 'Show you value the relationship'],
        },
        {
          id: 'pr-3',
          title: 'The De-escalator',
          description: 'Calm down a heated argument between others.',
          difficulty: 'intermediate',
          duration: 8,
          xpReward: 100,
          scenario: 'Two colleagues are arguing loudly in the office. Step in and help de-escalate the situation.',
          tips: ['Lower your voice to set the tone', 'Acknowledge both emotions', 'Suggest a cooling-off period'],
        },
        {
          id: 'pr-4',
          title: 'The Boundary Setter',
          description: 'Set clear personal boundaries with someone pushy.',
          difficulty: 'beginner',
          duration: 5,
          xpReward: 75,
          scenario: 'A friend keeps borrowing money and not returning it. Address the issue without damaging the friendship.',
          tips: ['Be specific about the behavior', 'Explain how it affects you', 'Propose a clear solution'],
        },
        {
          id: 'pr-5',
          title: 'The Apologizer',
          description: 'Give a sincere apology when you are wrong.',
          difficulty: 'beginner',
          duration: 5,
          xpReward: 50,
          scenario: 'You said something hurtful to a friend in anger. Apologize sincerely and make things right.',
          tips: ['Take full responsibility', 'Be specific about what you did wrong', 'Ask how you can make it right'],
        },
        {
          id: 'pr-6',
          title: 'The Advocate',
          description: 'Stand up for someone who cannot stand up for themselves.',
          difficulty: 'advanced',
          duration: 8,
          xpReward: 125,
          scenario: 'A classmate is being bullied and you witness it. Speak up and defend them with courage and wisdom.',
          tips: ['Stay calm and composed', 'Address the behavior, not the person', 'Offer support to the victim afterwards'],
        },
        {
          id: 'pr-7',
          title: 'The Family Diplomat',
          description: 'Navigate a family disagreement about your future.',
          difficulty: 'advanced',
          duration: 10,
          xpReward: 150,
          scenario: 'Your parents want you to study medicine but you want to pursue art. Have a respectful conversation about your dreams.',
          tips: ['Show you have researched your path', 'Acknowledge their concerns', 'Propose a compromise if possible'],
        },
        {
          id: 'pr-8',
          title: 'The Truth Speaker',
          description: 'Deliver difficult news with empathy and clarity.',
          difficulty: 'advanced',
          duration: 8,
          xpReward: 125,
          scenario: 'You need to tell your team that a project has failed. Deliver the news honestly while maintaining morale.',
          tips: ['Be direct but compassionate', 'Focus on lessons learned', 'Present a path forward'],
        },
      ],
    },
  ];

  findAll(): Pillar[] {
    return this.pillars;
  }

  findById(id: PillarType): Pillar | undefined {
    return this.pillars.find((p) => p.id === id);
  }

  getMissions(pillarId: PillarType): PillarMission[] {
    const pillar = this.findById(pillarId);
    return pillar?.missions || [];
  }

  getMission(pillarId: PillarType, missionId: string): PillarMission | undefined {
    const missions = this.getMissions(pillarId);
    return missions.find((m) => m.id === missionId);
  }
}
