import { Get, Controller, Res } from '@nestjs/common';

import { StatisticsService } from './statistics.service';

import { Response } from 'express';

import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  apiForbiddenResponse,
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
} from 'src/swagger/errors.swagger';
import { statistics } from 'src/swagger/statistics/statistics.swagger';

@Controller('api/v1/statistics')
@ApiTags('Statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @ApiOkResponse(statistics)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getStatistics(@Res({ passthrough: true }) res: Response): object {
    return this.statisticsService.getStatistics(res);
  }
}
