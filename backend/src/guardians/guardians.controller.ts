import { Controller, Get, Param } from '@nestjs/common';
import { GuardiansService } from './guardians.service';
import type { Guardian } from './guardians.service';
import type { GuardianType } from '../common/types';

@Controller('guardians')
export class GuardiansController {
  constructor(private readonly guardiansService: GuardiansService) {}

  @Get()
  findAll(): Guardian[] {
    return this.guardiansService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: GuardianType): Guardian | undefined {
    return this.guardiansService.findById(id);
  }

  @Get(':id/whisper')
  getWhisper(@Param('id') id: GuardianType): { message: string } {
    return { message: this.guardiansService.getWhisper(id) };
  }

  @Get(':id/encouragement')
  getEncouragement(@Param('id') id: GuardianType): { message: string } {
    return { message: this.guardiansService.getEncouragement(id) };
  }
}
