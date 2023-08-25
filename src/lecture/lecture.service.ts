import { Injectable, Res } from '@nestjs/common';
import { LectureModel } from 'src/database/models/lecture.model';
import { ChapterModel } from 'src/database/models/chapter.model';
import { Response } from 'express';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { lectureDto } from './dto/lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureModel: LectureModel,
    private readonly errorResponse: ErrorResponse,
    private readonly chapterModel: ChapterModel,
  ) {}
  async createNewLecture(
    @Res() res: Response,
    chapterId: string,
    body: lectureDto,
  ) {
    try {
      const chapter = await this.chapterModel.getChapterById(chapterId);

      if (!chapter)
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');

      await this.lectureModel.createNewLecture(body, chapter);

      return {
        success: true,
        statusCode: 201,
        message: 'Lecture created successfully',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
