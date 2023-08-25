import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Response } from 'express';

import { lectureDto } from './dto/lecture.dto';
import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { ApiProduces, ApiTags } from '@nestjs/swagger';

@ApiProduces('application/json')
@ApiTags('Lectures')
@Controller('api/v1/lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post(':chapterId')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  createNewLecture(
    @Res({ passthrough: true }) res: Response,
    @Param('chapterId') chapterId: string,
    @Body() body: lectureDto,
  ): object {
    return this.lectureService.createNewLecture(res, chapterId, body);
  }
}
