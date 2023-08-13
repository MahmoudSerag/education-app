import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { chapterDto } from './dto/chapter.dto';

@Controller('api/v1/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
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
