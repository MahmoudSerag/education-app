import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
  Res,
  Get,
  Query,
  Put,
} from '@nestjs/common';
import { Response } from 'express';

import { validationPipe } from 'src/pipes/validation.pipe';

import { ChapterService } from './chapter.service';

import { ChapterDto } from './dto/chapter.dto';

import {
  ApiProduces,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  apiBadRequestResponse,
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
} from 'src/swagger/errors.swagger';
import {
  ChaptersFilterByAcademicYearQuery,
  createdChapterResponse,
  deleteChapterParam,
  deletedChapterResponse,
  getChapterParam,
  getChapterResponse,
  getChaptersResponse,
  searchChapterQuery,
  searchChapterResponse,
  updateChapterParam,
  updateChapterResponse,
} from 'src/swagger/chapters/chapter.swagger';

@ApiProduces('application/json')
@ApiTags('Chapters')
@Controller('api/v1/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiCreatedResponse(createdChapterResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  createNewChapter(
    @Res({ passthrough: true }) res: Response,
    @Body() body: ChapterDto,
  ): object {
    return this.chapterService.createNewChapter(res, body);
  }

  @Delete(':chapterId')
  @ApiParam(deleteChapterParam)
  @ApiOkResponse(deletedChapterResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  deleteSingleChapter(
    @Res({ passthrough: true }) res: Response,
    @Param('chapterId') chapterId: string,
  ): object {
    return this.chapterService.deleteSingleChapter(res, chapterId);
  }

  @Put(':chapterId')
  @ApiParam(updateChapterParam)
  @ApiOkResponse(updateChapterResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  updateSingleChapter(
    @Res({ passthrough: true }) res: Response,
    @Param('chapterId') chapterId: string,
    @Body() body: ChapterDto,
  ): object {
    return this.chapterService.updateSingleChapter(res, chapterId, body);
  }

  @Get()
  @ApiQuery(ChaptersFilterByAcademicYearQuery)
  @ApiOkResponse(getChaptersResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getAllChapters(
    @Res({ passthrough: true }) res: Response,
    @Query('academicYear') academicYear: number,
  ): object {
    return this.chapterService.getAllChapters(res, Number(academicYear));
  }

  @Get('/search')
  @ApiQuery(searchChapterQuery)
  @ApiOkResponse(searchChapterResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  searchChapter(
    @Res({ passthrough: true }) res: Response,
    @Query('title') title: string,
  ): object {
    return this.chapterService.searchChapters(res, title);
  }

  @Get(':chapterId')
  @ApiParam(getChapterParam)
  @ApiOkResponse(getChapterResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getChapterById(
    @Res({ passthrough: true }) res: Response,
    @Param('chapterId') chapterId: string,
  ): object {
    return this.chapterService.getChapterById(res, chapterId);
  }
}
