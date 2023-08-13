import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import {
  ApiProduces,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import {
  apiBadRequestResponse,
  apiForbiddenResponse,
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
} from 'src/helpers/swaggerService.helper';

import { chapterDto } from './dto/chapter.dto';
@ApiProduces('application/json')
@ApiTags('Auth')
@Controller('api/v1/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'User registration',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'User created successfully',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  createNewChapter(@Body() body: chapterDto): object {
    return this.chapterService.createNewChapter(body);
  }
}
