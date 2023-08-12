import { Controller, Get } from '@nestjs/common';
import { ChapterService } from './chapter.service';

@Controller('api/v1/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get()
  getHello(): string {
    return this.chapterService.getHello();
  }
}
