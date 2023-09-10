import { Get, Controller, Res } from '@nestjs/common';

import { StatisticsService } from './statistics.service';

import { Response } from 'express';

import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/statistics')
@ApiTags('Statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics(@Res({ passthrough: true }) res: Response): object {
    return this.statisticsService.getStatistics(res);
  }
}
