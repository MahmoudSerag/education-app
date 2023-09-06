import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
  UploadedFiles,
  Get,
  Query,
  Delete,
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
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiQuery,
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
  updatedLectureParam,
  createdLectureParam,
  createdLectureResponse,
  updatedLectureResponse,
  lectureListResponse,
  deletedLectureResponse,
  pageQueryParam,
  singleLectureResponse,
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
  @ApiParam(updatedLectureParam)
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

  @Get(':chapterId')
  @ApiParam(createdLectureParam)
  @ApiQuery(pageQueryParam)
  @ApiOkResponse(lectureListResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getAllLecturesByChapterId(
    @Res({ passthrough: true }) res: Response,
    @Param('chapterId') chapterId: string,
    @Query('page') page: number,
  ) {
    page = Number(page) || 1;
    return this.lectureService.getAllLecturesByChapterId(res, chapterId, page);
  }

  @Delete(':lectureId')
  @ApiParam(updatedLectureParam)
  @ApiOkResponse(deletedLectureResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  deleteSingleLecture(
    @Res({ passthrough: true }) res: Response,
    @Param('lectureId') lectureId: string,
  ): object {
    return this.lectureService.deleteSingleLecture(res, lectureId);
  }

  @Get(':lectureId/details')
  @ApiParam(updatedLectureParam)
  @ApiCreatedResponse(singleLectureResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getSingleLecture(@Res({ passthrough: true }) res: Response): object {
    return this.lectureService.getSingleLecture(res);
  }

  @Get(':lectureId/:pdfId/pdf')
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  downloadLecturePDF(
    @Res({ passthrough: true }) res: Response,
    @Param('pdfId') pdfId: string,
  ): object {
    return this.lectureService.downloadLecturePDF(res, pdfId);
  }
}
