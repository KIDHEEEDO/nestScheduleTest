import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './common/cron.service';
import { TestService } from './common/test.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, CronService, TestService],
})
export class AppModule {}
