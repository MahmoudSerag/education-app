import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  Patch,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { ChapterService } from './chapter.service';
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
} from '@nestjs/swagger';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import {
  apiBadRequestResponse,
  apiForbiddenResponse,
  apiUnauthorizedResponse,
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
} from 'src/helpers/swaggerService.helper';

import { chapterDto } from './dto/chapter.dto';
@ApiProduces('application/json')
@ApiTags('Chapter: Accessed by Admin / Moderator')
@Controller('api/v1/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'Create new chapter',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Chapter created successfully.',
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
  createNewChapter(
    @Res({ passthrough: true }) res: Response,
    @Body() body: chapterDto,
  ): object {
    return this.chapterService.createNewChapter(res, body);
  }

  @Delete(':chapterId')
  @ApiParam({
    name: 'chapterId',
    description: 'Should provide chapterId to delete single chapter',
    example: '5f2b4a7c4c5c4d5e6f7g8h9i',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Delete single chapter by chapterId',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message:
          'تم حذف الفصل بنجاح و لا يوجد محاضرات محذوفة تابعة لهذا الفصل. || تم حذف الفصل بنجاح وتم حذف المحاضرات التابعة لهذا الفصل بنجاح.',
      },
    },
  })
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

  @Patch(':chapterId')
  @ApiParam({
    name: 'chapterId',
    description: 'Should provide chapterId to delete single chapter',
    example: '5f2b4a7c4c5c4d5e6f7g8h9i',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Update single chapter by chapterId',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'تم تعديل الفصل بنجاح.',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  updateSingleChapter(
    @Res({ passthrough: true }) res: Response,
    @Param('chapterId') chapterId: string,
    @Body() body: chapterDto,
  ): object {
    return this.chapterService.updateSingleChapter(res, chapterId, body);
  }

  @Get('all')
  @ApiOkResponse({
    status: 200,
    description: 'Fetch all chapters',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Chapters fetched successfully.',
        chapters: [
          {
            _id: '64d97510859dc4f83d9dc0c8',
            title: 'المواد المصولة و المواد الغير موصلة',
            imageURL:
              'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
            academicYear: 2,
            description: 'النهاردة درس مهم موووت',
            createdAt: '2023-08-14T00:28:00.061Z',
            updatedAt: '2023-08-14T00:28:00.061Z',
          },
          {
            _id: '64da68e286a1df137c94af8a',
            title: 'المواد المصولة و المواد الغير موصلة',
            imageURL:
              'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
            academicYear: 2,
            description: 'النهاردة درس مهم موووت',
            createdAt: '2023-08-14T17:48:18.803Z',
            updatedAt: '2023-08-14T17:48:18.803Z',
          },
          `{ .......... }`,
        ],
      },
    },
  })
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getAllChapters(@Res({ passthrough: true }) res: Response): object {
    return this.chapterService.getAllChapters(res);
  }
}
