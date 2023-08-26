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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiProduces,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  apiBadRequestResponse,
  apiNotFoundResponse,
  apiInternalServerErrorResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
} from 'src/helpers/swaggerService.helper';

@ApiProduces('application/json')
@ApiTags('Lectures')
@Controller('api/v1/lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post(':chapterId')
  @ApiParam({
    name: 'chapterId',
    description: 'Should provide chapterId to check if chapter exists.',
    example: '64d97510859dc4f83d9dc0c8',
    required: true,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Create a new lecture for a specific chapter.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Lecture created successfully.',
      },
    },
  })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
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
