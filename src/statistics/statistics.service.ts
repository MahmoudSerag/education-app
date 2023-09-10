import { Injectable } from '@nestjs/common';

import { Response } from 'express';

import { StatisticsModel } from 'src/database/models/statistics.model';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly errorResponse: ErrorResponse,
    private readonly statisticsModel: StatisticsModel,
  ) {}

  async getStatistics(res: Response): Promise<any> {
    try {
      const [
        numberOfStudents,
        numberOfLectures,
        studentsInYearOne,
        studentsInYearTwo,
        studentsInYearThree,
      ] = await this.statisticsModel.getStatistics();

      if (
        !numberOfStudents &&
        !numberOfLectures &&
        !studentsInYearOne &&
        !studentsInYearTwo &&
        !studentsInYearThree
      )
        return this.errorResponse.handleError(res, 404, 'No statistics found.');

      return {
        success: true,
        statusCode: 200,
        message: 'Statistics fetched successfully.',
        statistics: {
          numberOfStudents,
          numberOfLectures,
          studentsInYearOne,
          studentsInYearTwo,
          studentsInYearThree,
        },
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
