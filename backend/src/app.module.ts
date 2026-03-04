import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GuardiansModule } from './guardians/guardians.module';
import { PillarsModule } from './pillars/pillars.module';
import { SessionsModule } from './sessions/sessions.module';
import { MissionsModule } from './missions/missions.module';
import { AssessmentsModule } from './assessments/assessments.module';

@Module({
  imports: [
    UsersModule,
    GuardiansModule,
    PillarsModule,
    SessionsModule,
    MissionsModule,
    AssessmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
