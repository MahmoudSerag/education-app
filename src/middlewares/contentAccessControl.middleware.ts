import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { OperationLogsModel } from 'src/database/models/operationLogs.model';
import { LectureModel } from 'src/database/models/lecture.model';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

@Injectable()
export class ContentAccessControlMiddleware implements NestMiddleware {
  constructor(
    private readonly usersLecturesModel: OperationLogsModel,
    private readonly errorResponse: ErrorResponse,
    private readonly lectureModel: LectureModel,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.decodedToken.userId;
      const lectureId = req.params.lectureId;

      const [lecture, userLecture] = await Promise.all([
        await this.lectureModel.getLectureById(lectureId),
        await this.usersLecturesModel.findPurchasedLecture(userId, lectureId),
      ]);

      if (!lecture)
        return this.errorResponse.sendErrorResponse(
          res,
          404,
          'Lecture not found',
        );

      if (!userLecture)
        return this.errorResponse.sendErrorResponse(
          res,
          403,
          'Forbidden: Should purchase this lecture',
        );

      res.locals.lecture = lecture;

      next();
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }
}
