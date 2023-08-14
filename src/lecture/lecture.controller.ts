import { Controller, Get } from '@nestjs/common';
import { LectureService } from './lecture.service';

@Controller('test')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get()
  getHello(): any {
    return this.lectureService.getHello();
  }
}
