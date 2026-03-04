import { Controller, Get, Param } from '@nestjs/common';
import { PillarsService } from './pillars.service';
import type { Pillar, PillarMission } from './pillars.service';
import type { PillarType } from '../common/types';

@Controller('pillars')
export class PillarsController {
  constructor(private readonly pillarsService: PillarsService) {}

  @Get()
  findAll(): Pillar[] {
    return this.pillarsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: PillarType): Pillar | undefined {
    return this.pillarsService.findById(id);
  }

  @Get(':id/missions')
  getMissions(@Param('id') id: PillarType): PillarMission[] {
    return this.pillarsService.getMissions(id);
  }

  @Get(':id/missions/:missionId')
  getMission(
    @Param('id') id: PillarType,
    @Param('missionId') missionId: string,
  ): PillarMission | undefined {
    return this.pillarsService.getMission(id, missionId);
  }
}
