import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

import { MulterConfig } from 'src/helpers/multerService.helper';
import { LectureDto } from './dto/lecture.dto';

import {
  ApiBadRequestResponse,
  ApiBody,
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
        statusCode: 201,
        message: 'Lecture created successfully.',
      },
    },
  })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UseInterceptors(FilesInterceptor('files', 5, MulterConfig))
  @ApiBody({ type: LectureDto })
  createNewLecture(
    @Res({ passthrough: true }) res: Response,
    @Param('chapterId') chapterId: string,
    @Body() body: LectureDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): object {
    return this.lectureService.createNewLecture(res, chapterId, body, files);
  }
}
