import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';
import { UserService } from '../../core/services/user.service';

interface MissionData {
  id: string;
  title: string;
  scenario: string;
  tips: string[];
  duration: number;
}

@Component({
  selector: 'app-sparring',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container sparring-page">
      <!-- Focus Mode Header -->
      <div class="sparring-header">
        <button class="back-btn neu-button" (click)="exitSparring()">✕ Exit</button>
        <div class="timer-display" *ngIf="isActive()">
          <span class="timer">{{ formatTime(timeRemaining()) }}</span>
        </div>
      </div>

      <!-- Pre-session -->
      <div class="pre-session" *ngIf="phase() === 'prep'">
        <div class="mission-brief neu-card fade-in-up">
          <h2>{{ mission?.title }}</h2>
          <p class="scenario">{{ mission?.scenario }}</p>
          <div class="tips-section">
            <h4>Tips from your Guardian:</h4>
            <ul>
              <li *ngFor="let tip of mission?.tips">{{ tip }}</li>
            </ul>
          </div>
        </div>

        <!-- 3D Avatar / Sparring Partner -->
        <div class="avatar-container fade-in-up" style="animation-delay: 0.2s">
          <div class="sparring-avatar">
            <div class="avatar-body">
              <svg viewBox="0 0 200 200" width="160" height="160">
                <!-- Stylized 3D avatar - Lion -->
                <defs>
                  <radialGradient id="avatarGrad" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" style="stop-color:#F0D68A"/>
                    <stop offset="100%" style="stop-color:#D4A843"/>
                  </radialGradient>
                  <radialGradient id="innerGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#FFE4A0"/>
                    <stop offset="100%" style="stop-color:#B8860B"/>
                  </radialGradient>
                </defs>
                <!-- Mane -->
                <circle cx="100" cy="95" r="70" fill="url(#avatarGrad)" opacity="0.6"/>
                <circle cx="100" cy="95" r="55" fill="url(#innerGrad)" opacity="0.8"/>
                <!-- Face -->
                <circle cx="100" cy="90" r="40" fill="#F5EFE6"/>
                <!-- Eyes -->
                <ellipse cx="85" cy="82" rx="6" ry="7" fill="#3B2415"/>
                <ellipse cx="115" cy="82" rx="6" ry="7" fill="#3B2415"/>
                <circle cx="87" cy="80" r="2" fill="white"/>
                <circle cx="117" cy="80" r="2" fill="white"/>
                <!-- Nose -->
                <ellipse cx="100" cy="95" rx="8" ry="5" fill="#D4A843"/>
                <!-- Mouth - friendly smile -->
                <path d="M88 102 Q100 112 112 102" stroke="#3B2415" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <p class="avatar-name">Your Sparring Partner</p>
          </div>
        </div>

        <button class="neu-button neu-button-primary start-btn fade-in-up" style="animation-delay: 0.3s" (click)="startSession()">
          Begin Speaking
        </button>
      </div>

      <!-- Active Session -->
      <div class="active-session" *ngIf="phase() === 'active'">
        <!-- Avatar (smaller) -->
        <div class="mini-avatar">
          <svg viewBox="0 0 60 60" width="60" height="60">
            <circle cx="30" cy="28" r="22" fill="#F0D68A" opacity="0.6"/>
            <circle cx="30" cy="28" r="16" fill="#F5EFE6"/>
            <ellipse cx="25" cy="25" rx="2.5" ry="3" fill="#3B2415"/>
            <ellipse cx="35" cy="25" rx="2.5" ry="3" fill="#3B2415"/>
            <ellipse cx="30" cy="30" rx="3" ry="2" fill="#D4A843"/>
            <path d="M25 34 Q30 38 35 34" stroke="#3B2415" stroke-width="1.2" fill="none"/>
          </svg>
        </div>

        <!-- Scenario reminder -->
        <div class="scenario-reminder neu-inset">
          <p>{{ mission?.scenario }}</p>
        </div>

        <!-- Waveform Visualization -->
        <div class="waveform-container">
          <div class="waveform">
            <div
              *ngFor="let bar of audioService.waveformData(); let i = index"
              class="wave-bar"
              [style.height.%]="bar * 100"
              [style.animation-delay]="(i * 0.02) + 's'"
              [style.background]="getWaveColor(bar)"
            ></div>
          </div>
          <div class="energy-label">
            <span class="energy-indicator" [class]="getEnergyClass()">{{ getEnergyLabel() }}</span>
          </div>
        </div>

        <!-- Supportive Whisper Toggle -->
        <button
          class="whisper-toggle neu-button"
          [class.active]="showWhisper()"
          (click)="toggleWhisper()"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path d="M7 10 Q10 6 13 10 Q10 14 7 10Z" fill="currentColor" opacity="0.6"/>
          </svg>
          Guardian Whisper
        </button>

        <div class="whisper-message fade-in-up" *ngIf="showWhisper()">
          <p>"{{ whisperMessage }}"</p>
        </div>

        <!-- Controls -->
        <div class="session-controls">
          <button class="neu-button stop-btn" (click)="stopSession()">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect x="4" y="4" width="12" height="12" rx="2" fill="currentColor"/>
            </svg>
            Finish
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sparring-page { padding-top: var(--space-md); background: var(--color-bg-primary); }

    .sparring-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg);
    }
    .back-btn { font-size: 0.85rem; }
    .timer-display {
      background: var(--color-bg-card); padding: 6px 16px; border-radius: var(--radius-sm);
      box-shadow: inset 2px 2px 4px var(--shadow-neu-inset-dark), inset -2px -2px 4px var(--shadow-neu-inset-light);
    }
    .timer { font-weight: 600; font-size: 1.1rem; color: var(--color-earth-deep); font-variant-numeric: tabular-nums; }

    .mission-brief { text-align: center; margin-bottom: var(--space-xl); }
    .mission-brief h2 { font-size: 1.4rem; margin-bottom: var(--space-sm); }
    .scenario { color: var(--color-text-secondary); font-size: 0.95rem; margin-bottom: var(--space-lg); line-height: 1.5; }
    .tips-section { text-align: left; }
    .tips-section h4 { font-size: 0.85rem; color: var(--color-gold-deep); margin-bottom: var(--space-sm); font-family: 'Outfit', sans-serif; }
    .tips-section ul { list-style: none; }
    .tips-section li { font-size: 0.85rem; color: var(--color-text-secondary); padding: 4px 0; padding-left: 16px; position: relative; }
    .tips-section li::before { content: '→'; position: absolute; left: 0; color: var(--color-gold-warm); }

    .avatar-container { display: flex; justify-content: center; margin-bottom: var(--space-xl); }
    .sparring-avatar { text-align: center; }
    .avatar-body { animation: float 3s ease-in-out infinite; }
    .avatar-name { font-size: 0.8rem; color: var(--color-text-muted); margin-top: var(--space-sm); }

    .start-btn { width: 100%; justify-content: center; padding: var(--space-md); font-size: 1.1rem; border-radius: var(--radius-lg); }

    /* Active session */
    .mini-avatar { text-align: center; margin-bottom: var(--space-md); }
    .mini-avatar svg { animation: float 3s ease-in-out infinite; }

    .scenario-reminder { margin-bottom: var(--space-lg); text-align: center; }
    .scenario-reminder p { font-size: 0.85rem; color: var(--color-text-secondary); font-style: italic; }

    .waveform-container { margin-bottom: var(--space-lg); }
    .waveform {
      display: flex; align-items: flex-end; justify-content: center; gap: 2px;
      height: 120px; padding: var(--space-md);
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
      box-shadow: inset 3px 3px 6px var(--shadow-neu-inset-dark), inset -3px -3px 6px var(--shadow-neu-inset-light);
    }
    .wave-bar {
      width: 4px; min-height: 4px; border-radius: 2px;
      transition: height 0.1s ease, background 0.3s ease;
    }
    .energy-label { text-align: center; margin-top: var(--space-sm); }
    .energy-indicator {
      font-size: 0.75rem; font-weight: 600; padding: 2px 12px; border-radius: 10px;
    }
    .energy-indicator.timid { background: #FFEBEE; color: #C62828; }
    .energy-indicator.calm { background: #E8F5E9; color: #2E7D32; }
    .energy-indicator.confident { background: #FFF8E1; color: #F57F17; }
    .energy-indicator.powerful { background: #E3F2FD; color: #1565C0; }

    .whisper-toggle {
      width: 100%; justify-content: center; margin-bottom: var(--space-sm); font-size: 0.9rem;
    }
    .whisper-toggle.active { background: var(--color-gold-glow); color: var(--color-earth-deep); }

    .whisper-message {
      text-align: center; padding: var(--space-md); margin-bottom: var(--space-lg);
      background: var(--color-gold-glow); border-radius: var(--radius-md);
    }
    .whisper-message p { font-style: italic; color: var(--color-earth-deep); font-size: 0.9rem; }

    .session-controls { display: flex; justify-content: center; }
    .stop-btn {
      background: var(--color-earth-deep); color: white; padding: var(--space-md) var(--space-2xl);
      border-radius: var(--radius-lg); font-size: 1rem;
    }
  `]
})
export class SparringComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  audioService = inject(AudioService);
  private userService = inject(UserService);

  mission: MissionData | null = null;
  phase = signal<'prep' | 'active' | 'complete'>('prep');
  isActive = signal(false);
  timeRemaining = signal(0);
  showWhisper = signal(false);
  whisperMessage = 'Speak from your chest, I am right here with you.';

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  private allMissions: Record<string, MissionData> = {
    'vs-1': { id: 'vs-1', title: 'The Ice Breaker', scenario: 'You are at a community event. A person your age is standing alone by the refreshments table. Start a friendly conversation.', tips: ['Start with a genuine compliment', 'Ask open-ended questions', 'Share something about yourself too'], duration: 300 },
    'vs-2': { id: 'vs-2', title: 'The Storyteller', scenario: 'Your friends are gathered around and ask you to share a memorable experience. Tell them a story that keeps them engaged.', tips: ['Set the scene vividly', 'Use pauses for dramatic effect', 'Make eye contact with different people'], duration: 420 },
    'vs-3': { id: 'vs-3', title: 'The Group Leader', scenario: 'You are chosen to lead a discussion about planning a community event. Guide the conversation.', tips: ['Acknowledge each person by name', 'Summarize points before moving on', 'Ask quiet members for input'], duration: 600 },
    'vs-4': { id: 'vs-4', title: 'The Toast Master', scenario: 'Your best friend is celebrating a milestone. Stand up and deliver a warm, memorable toast.', tips: ['Speak from the heart', 'Include a specific memory', 'End with a wish for the future'], duration: 300 },
    'vs-5': { id: 'vs-5', title: 'The Crowd Speaker', scenario: 'You have been invited to speak at a youth rally. Deliver an inspiring message.', tips: ['Project your voice to the back row', 'Use repetition for emphasis', 'Move with purpose'], duration: 600 },
    'vs-6': { id: 'vs-6', title: 'The Peacemaker', scenario: 'Two of your close friends are in a heated argument. Step in and help them find common ground.', tips: ['Listen without judgment', 'Repeat what each person said', 'Suggest a compromise'], duration: 480 },
    'vs-7': { id: 'vs-7', title: 'The Encourager', scenario: 'A classmate just failed an important exam and feels devastated. Offer genuine words of encouragement.', tips: ['Validate their feelings first', 'Share a time you overcame failure', 'Focus on their strengths'], duration: 300 },
    'vs-8': { id: 'vs-8', title: 'The Cultural Bridge', scenario: 'A foreign exchange student asks about your culture and traditions. Share your heritage with pride.', tips: ['Be proud but not boastful', 'Use analogies they can relate to', 'Invite questions'], duration: 480 },
    'br-1': { id: 'br-1', title: 'The Elevator Pitch', scenario: 'You step into an elevator with a potential employer. You have 60 seconds to make an impression.', tips: ['Lead with your strongest skill', 'Be specific, not vague', 'End with what you can offer'], duration: 180 },
    'br-2': { id: 'br-2', title: 'The Interview', scenario: 'You are in a job interview for your dream position. Answer challenging behavioral questions.', tips: ['Use the STAR method', 'Be honest about weaknesses', 'Ask thoughtful questions back'], duration: 600 },
    'br-3': { id: 'br-3', title: 'The Business Pitch', scenario: 'Present your startup idea to a panel of investors. Convince them your idea is worth funding.', tips: ['Start with the problem you solve', 'Show the market opportunity', 'Be clear about what you need'], duration: 600 },
    'br-4': { id: 'br-4', title: 'The Salary Talk', scenario: 'You received a job offer but the salary is lower than expected. Negotiate respectfully.', tips: ['Know your market value', 'Focus on value you bring', 'Discuss non-salary benefits'], duration: 480 },
    'br-5': { id: 'br-5', title: 'The Meeting Voice', scenario: 'You are in a team meeting and have a great idea. Speak up and share it clearly.', tips: ['Wait for a natural pause', 'Start with "Building on that..."', 'Be concise and specific'], duration: 420 },
    'br-6': { id: 'br-6', title: 'The Presentation', scenario: 'Present your quarterly project results to your team and manager.', tips: ['Start with the key takeaway', 'Use stories and examples', 'Handle questions gracefully'], duration: 600 },
    'br-7': { id: 'br-7', title: 'The Networker', scenario: 'You are at an industry conference. Approach professionals and build connections.', tips: ['Show genuine interest', 'Have your story ready', 'Follow up within 24 hours'], duration: 480 },
    'br-8': { id: 'br-8', title: "The Leader's Address", scenario: 'You were just promoted to team lead. Address your team for the first time.', tips: ['Acknowledge the team first', 'Share your vision clearly', 'Invite collaboration'], duration: 480 },
    'pr-1': { id: 'pr-1', title: 'The Gentle No', scenario: 'Your friends are pressuring you to skip class and go to a party. Decline firmly but kindly.', tips: ['Be direct but warm', 'Offer an alternative', "Don't apologize for your decision"], duration: 300 },
    'pr-2': { id: 'pr-2', title: 'The Respectful Challenge', scenario: 'An older family member has a view you strongly disagree with. Express your perspective while maintaining respect.', tips: ['Acknowledge their experience', 'Use "I feel" statements', 'Value the relationship'], duration: 480 },
    'pr-3': { id: 'pr-3', title: 'The De-escalator', scenario: 'Two colleagues are arguing loudly in the office. Step in and help de-escalate.', tips: ['Lower your voice to set tone', 'Acknowledge both emotions', 'Suggest a cooling-off period'], duration: 480 },
    'pr-4': { id: 'pr-4', title: 'The Boundary Setter', scenario: 'A friend keeps borrowing money and not returning it. Address the issue.', tips: ['Be specific about the behavior', 'Explain how it affects you', 'Propose a clear solution'], duration: 300 },
    'pr-5': { id: 'pr-5', title: 'The Apologizer', scenario: 'You said something hurtful to a friend in anger. Apologize sincerely.', tips: ['Take full responsibility', 'Be specific about what you did wrong', 'Ask how to make it right'], duration: 300 },
    'pr-6': { id: 'pr-6', title: 'The Advocate', scenario: 'A classmate is being bullied and you witness it. Speak up and defend them.', tips: ['Stay calm and composed', 'Address the behavior, not the person', 'Offer support after'], duration: 480 },
    'pr-7': { id: 'pr-7', title: 'The Family Diplomat', scenario: 'Your parents want you to study medicine but you want to pursue art. Have a respectful conversation.', tips: ['Show you have researched your path', 'Acknowledge their concerns', 'Propose a compromise'], duration: 600 },
    'pr-8': { id: 'pr-8', title: 'The Truth Speaker', scenario: 'You need to tell your team that a project has failed. Deliver the news honestly.', tips: ['Be direct but compassionate', 'Focus on lessons learned', 'Present a path forward'], duration: 480 },
  };

  ngOnInit(): void {
    const missionId = this.route.snapshot.paramMap.get('missionId');
    if (missionId) {
      this.mission = this.allMissions[missionId] || null;
      if (this.mission) {
        this.timeRemaining.set(this.mission.duration);
      }
    }
    // Set whisper based on guardian
    const guardianId = this.userService.user().guardianId;
    const whispers: Record<string, string> = {
      'lion': 'Speak from your chest, I am right here with you.',
      'eagle': 'Breathe deep, find your rhythm. You have got this.',
      'elephant': 'Your words have weight. Let them land softly but firmly.',
    };
    this.whisperMessage = whispers[guardianId] || whispers['lion'];
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.audioService.isRecording()) this.audioService.stopRecording();
  }

  async startSession(): Promise<void> {
    this.phase.set('active');
    this.isActive.set(true);
    await this.audioService.startRecording();
    this.timerInterval = setInterval(() => {
      const remaining = this.timeRemaining();
      if (remaining <= 0) {
        this.stopSession();
      } else {
        this.timeRemaining.set(remaining - 1);
      }
    }, 1000);
  }

  stopSession(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isActive.set(false);
    const analysis = this.audioService.stopRecording();
    this.userService.addXp(Math.round(50 + Math.random() * 100));
    this.userService.completeMission();
    this.router.navigate(['/growth-chart'], {
      queryParams: {
        mission: this.mission?.title,
        energy: analysis.energy,
        pitch: analysis.pitch,
        volume: analysis.volume,
        clarity: analysis.clarity,
        fillerWords: analysis.fillerWords,
        pace: analysis.pace,
      },
    });
  }

  exitSparring(): void {
    if (this.audioService.isRecording()) this.audioService.stopRecording();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.router.navigate(['/']);
  }

  toggleWhisper(): void {
    this.showWhisper.set(!this.showWhisper());
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  getWaveColor(value: number): string {
    if (value < 0.2) return '#C62828';
    if (value < 0.4) return '#F57F17';
    if (value < 0.6) return '#7CB342';
    return '#D4A843';
  }

  getEnergyClass(): string {
    const level = this.audioService.audioLevel();
    if (level < 0.15) return 'timid';
    if (level < 0.3) return 'calm';
    if (level < 0.5) return 'confident';
    return 'powerful';
  }

  getEnergyLabel(): string {
    const level = this.audioService.audioLevel();
    if (level < 0.15) return 'Timid - Speak louder!';
    if (level < 0.3) return 'Calm & Steady';
    if (level < 0.5) return 'Confident!';
    return 'Powerful Voice!';
  }
}
