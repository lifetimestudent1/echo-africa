import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import type { Assessment, Certificate } from './assessments.service';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post('vibe-check')
  createVibeCheck(@Body() data: { userId: string }): Assessment {
    return this.assessmentsService.createVibeCheck(data.userId);
  }

  @Put(':id/complete')
  completeVibeCheck(@Param('id') id: string): Assessment | undefined {
    return this.assessmentsService.completeVibeCheck(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Assessment[] {
    return this.assessmentsService.findByUser(userId);
  }

  @Post('certificates')
  issueCertificate(
    @Body() data: { userId: string; questId: string; title: string },
  ): Certificate {
    return this.assessmentsService.issueCertificate(
      data.userId,
      data.questId,
      data.title,
    );
  }

  @Get('certificates/:userId')
  getUserCertificates(@Param('userId') userId: string): Certificate[] {
    return this.assessmentsService.getUserCertificates(userId);
  }
}
