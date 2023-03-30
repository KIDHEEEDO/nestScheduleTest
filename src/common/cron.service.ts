import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TestService } from './test.service';

@Injectable()
export class CronService {
  constructor(private readonly testService: TestService) {}
  @Cron('50 10 * * 1-5')
  recommendLunch() {
    this.testService.lunchBefore10Minute();
  }

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_11AM)
  orderLunch() {
    this.testService.lunch();
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  recommendBreakfast() {
    this.testService.breakfast();
  }

  @Cron('30 17 * * 1-5')
  recommendDinner() {
    this.testService.dinner();
  }
}
