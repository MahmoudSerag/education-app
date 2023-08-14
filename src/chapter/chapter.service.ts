import { Injectable, Res } from '@nestjs/common';
import { ChapterModel } from 'src/database/models/chapter.model';
import { Response } from 'express';

import { chapterDto } from './dto/chapter.dto';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterModel: ChapterModel,
    private readonly errorResponse: ErrorResponse,
  ) {}
  async createNewChapter(@Res() res: Response, body: chapterDto): Promise<any> {
    try {
      await this.chapterModel.createNewChapter(body);

      return {
        success: true,
        statusCode: 201,
        message: 'تم إنشاء الفصل بنجاح.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async deleteSingleChapter(
    @Res() res: Response,
    chapterId: string,
  ): Promise<any> {
    try {
      let message;

      const chapter = await this.chapterModel.deleteChapterById(chapterId);

      if (!chapter[0])
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');

      if (!chapter[1]['deletedCount'])
        message = `تم حذف الفصل بنجاح و لا يوجد محاضرات محذوفة تابعة لهذا الفصل.`;

      return {
        success: true,
        statusCode: 204,
        message:
          message ||
          `تم حذف الفصل بنجاح وتم حذف المحاضرات التابعة لهذا الفصل بنجاح.`,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
