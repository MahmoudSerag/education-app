import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LectureDto } from 'src/lecture/dto/lecture.dto';
import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Missing request body.',
      });
    }
    const lectureDto = plainToClass(LectureDto, req.body);
    const errors = await validate(lectureDto);

    if (errors.length > 0) return ErrorResponse.validateRequestBody(errors);

    next();
  }
}
