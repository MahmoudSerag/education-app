import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

import { LectureService } from './lecture.service';

import { LectureDto } from './dto/lecture.dto';

import { MulterConfig } from 'src/helpers/uploadAndDownloadService.helper';

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
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
} from 'src/swagger/errors.swagger';
import {
  createdLectureIdParam,
  createdLectureParam,
  createdLectureResponse,
  updatedLectureResponse,
} from 'src/swagger/lectures/lecture.swagger';

@ApiProduces('application/json')
@ApiTags('Lectures')
@Controller('api/v1/lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post(':chapterId')
  @ApiParam(createdLectureParam)
  @ApiCreatedResponse(createdLectureResponse)
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

  @Put(':lectureId')
  @ApiParam(createdLectureIdParam)
  @ApiCreatedResponse(updatedLectureResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UseInterceptors(FilesInterceptor('files', 5, MulterConfig))
  @ApiBody({ type: LectureDto })
  updateSingleLecture(
    @Res({ passthrough: true }) res: Response,
    @Param('lectureId') lectureId: string,
    @Body() body: LectureDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): object {
    return this.lectureService.updateSingleLecture(res, lectureId, body, files);
  }
}
