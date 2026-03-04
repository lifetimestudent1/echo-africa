import { Controller, Get, Param } from '@nestjs/common';
import { MissionsService } from './missions.service';
import type { OfflineMission, DailyGym } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get('offline')
  getOfflineMissions(): OfflineMission[] {
    return this.missionsService.getOfflineMissions();
  }

  @Get('offline/:id')
  getOfflineMission(@Param('id') id: string): OfflineMission | undefined {
    return this.missionsService.getOfflineMission(id);
  }

  @Get('daily-gym')
  getDailyGym(): DailyGym[] {
    return this.missionsService.getDailyGym();
  }

  @Get('daily-gym/today')
  getTodaysDailyGym(): DailyGym[] {
    return this.missionsService.getTodaysDailyGym();
  }

  @Get('daily-gym/:id')
  getDailyGymExercise(@Param('id') id: string): DailyGym | undefined {
    return this.missionsService.getDailyGymExercise(id);
  }
}
