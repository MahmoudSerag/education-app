import { Injectable, Res } from '@nestjs/common';
import { ChapterModel } from 'src/database/models/chapter.model';
import { Response } from 'express';

import { ChapterDto } from './dto/chapter.dto';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterModel: ChapterModel,
    private readonly errorResponse: ErrorResponse,
  ) {}
  async createNewChapter(@Res() res: Response, body: ChapterDto): Promise<any> {
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

  async deleteSingleChapter(res: Response, chapterId: string): Promise<any> {
    try {
      let message;

      const chapter = await this.chapterModel.deleteChapterById(chapterId);

      if (!chapter[0])
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');

      if (!chapter[1]['deletedCount'])
        message = `تم حذف الفصل بنجاح و لا يوجد محاضرات محذوفة تابعة لهذا الفصل.`;

      return {
        success: true,
        statusCode: 200,
        message:
          message ||
          `تم حذف الفصل بنجاح وتم حذف المحاضرات التابعة لهذا الفصل بنجاح.`,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async updateSingleChapter(
    res: Response,
    chapterId: string,
    body: ChapterDto,
  ): Promise<any> {
    try {
      const updatedChapter = await this.chapterModel.updateChapterById(
        chapterId,
        body,
      );

      if (!updatedChapter)
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');

      return {
        success: true,
        statusCode: 200,
        message: 'تم تعديل الفصل بنجاح.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getAllChapters(res: Response, academicYear: number): Promise<any> {
    try {
      const chapters = await this.chapterModel.getAllChapters(academicYear);

      if (!chapters.length)
        return this.errorResponse.handleError(res, 404, 'Chapters not found.');

      return {
        success: true,
        statusCode: 200,
        message: 'Chapters fetched successfully.',
        chapters,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async searchChapters(res: Response, title: string): Promise<any> {
    try {
      if (!title || title.trim() === '')
        return this.errorResponse.handleError(
          res,
          400,
          `Incorrect query parameters. 'title' should not be empty or undefined.`,
        );

      const chapters = await this.chapterModel.getChaptersByTitle(title);

      if (!chapters.length)
        return this.errorResponse.handleError(
          res,
          404,
          'لا يوجد محاضرات بهذا التسلسل او الرمز',
        );

      return {
        success: true,
        statusCode: 200,
        message: 'Chapters fetched successfully.',
        chapters,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getChapterById(res: Response, chapterId: string): Promise<any> {
    try {
      const chapter = await this.chapterModel.getChapterById(chapterId);

      if (!chapter)
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');

      return {
        success: true,
        statusCode: 200,
        message: 'Chapter fetched successfully.',
        chapter,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
