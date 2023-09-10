import { Get, Controller, Res, Query } from '@nestjs/common';

import { StatisticsService } from './statistics.service';

import { Response } from 'express';

import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  apiForbiddenResponse,
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
} from 'src/swagger/errors.swagger';
import { pageQueryParam } from 'src/swagger/lectures/lecture.swagger';
import {
  statistics,
  studentsList,
} from 'src/swagger/statistics/statistics.swagger';

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

  @Get('students')
  @ApiQuery(pageQueryParam)
  @ApiOkResponse(studentsList)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getStudentsList(
    @Res({ passthrough: true }) res: Response,
    @Query('page') page: number,
  ): object {
    return this.statisticsService.getStudentsList(res, Number(page) || 1);
  }
}
