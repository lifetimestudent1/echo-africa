import { Injectable } from '@nestjs/common';
import { GuardianType } from '../common/types';

export interface Guardian {
  id: GuardianType;
  name: string;
  personality: string;
  accent: string;
  idlePhrase: string;
  encouragement: string;
  whisper: string;
  celebrationPhrase: string;
  avatarDescription: string;
  color: string;
}

@Injectable()
export class GuardiansService {
  private guardians: Guardian[] = [
    {
      id: 'lion',
      name: 'Simba the Wise',
      personality: 'Bold, warm, and encouraging. Speaks with authority but never intimidates.',
      accent: 'West African (Ghanaian)',
      idlePhrase: 'Sharp! Are you ready to roar today?',
      encouragement: 'Well done, Oga! Your voice carries weight.',
      whisper: 'Speak from your chest, I am right here with you.',
      celebrationPhrase: 'The pride is strong in you today! Chale, you did amazing!',
      avatarDescription: 'A majestic golden lion with warm amber eyes and an ornate Kente cloth mane.',
      color: '#D4A843',
    },
    {
      id: 'eagle',
      name: 'Aquila the Swift',
      personality: 'Quick-witted, precise, and sharp. Focuses on clarity and impact.',
      accent: 'East African (Kenyan/Swahili)',
      idlePhrase: 'Mambo vipi! Ready to soar above the clouds?',
      encouragement: 'Sawa sawa! Your words are landing perfectly.',
      whisper: 'Breathe deep, find your rhythm. You have got this.',
      celebrationPhrase: 'You are flying high today! Hakuna matata!',
      avatarDescription: 'A powerful crowned eagle with iridescent feathers and Maasai-inspired beaded talons.',
      color: '#8B6914',
    },
    {
      id: 'elephant',
      name: 'Tembo the Steady',
      personality: 'Patient, wise, and calming. Perfect for those who need gentle guidance.',
      accent: 'Southern African',
      idlePhrase: 'Take your time, young one. Wisdom is never rushed.',
      encouragement: 'Each step forward is a step of courage. Well done.',
      whisper: 'Your words have weight. Let them land softly but firmly.',
      celebrationPhrase: 'The earth trembles with your newfound voice! Magnificent!',
      avatarDescription: 'A gentle grey elephant adorned with carved tusks and Adinkra symbols painted on its ears.',
      color: '#7B8B6F',
    },
  ];

  findAll(): Guardian[] {
    return this.guardians;
  }

  findById(id: GuardianType): Guardian | undefined {
    return this.guardians.find((g) => g.id === id);
  }

  getWhisper(id: GuardianType): string {
    const guardian = this.findById(id);
    return guardian?.whisper || 'You are doing great. Keep going.';
  }

  getEncouragement(id: GuardianType): string {
    const guardian = this.findById(id);
    return guardian?.encouragement || 'Well done!';
  }
}
