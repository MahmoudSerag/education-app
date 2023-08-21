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
}
