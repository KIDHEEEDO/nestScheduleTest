import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CronService } from './common/cron.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly cronService: CronService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
