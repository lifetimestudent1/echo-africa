import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './users.service';
import type { UserProgress } from '../common/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string): User | undefined {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() data: Partial<User>): User {
    return this.usersService.create(data);
  }

  @Put(':id/progress')
  updateProgress(
    @Param('id') id: string,
    @Body() progress: Partial<UserProgress>,
  ): User | undefined {
    return this.usersService.updateProgress(id, progress);
  }

  @Put(':id/data-light-mode')
  toggleDataLightMode(@Param('id') id: string): User | undefined {
    return this.usersService.toggleDataLightMode(id);
  }
}
