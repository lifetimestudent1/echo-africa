import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import type { Session } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() data: Partial<Session>): Session {
    return this.sessionsService.create(data);
  }

  @Get(':id')
  findById(@Param('id') id: string): Session | undefined {
    return this.sessionsService.findById(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Session[] {
    return this.sessionsService.findByUser(userId);
  }

  @Put(':id/complete')
  complete(@Param('id') id: string): Session | undefined {
    return this.sessionsService.complete(id);
  }
}
