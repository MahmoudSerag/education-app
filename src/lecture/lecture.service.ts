import { Injectable } from '@nestjs/common';
import { LectureModel } from 'src/database/models/lecture.model';
import { Response } from 'express';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { HelperFunctions } from 'src/helpers/helperFunctions.helper';

import { LectureDto } from './dto/lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureModel: LectureModel,
    private readonly errorResponse: ErrorResponse,
    private readonly helperFunction: HelperFunctions,
  ) {}
  async createNewLecture(
    res: Response,
    chapterId: string,
    body: LectureDto,
    files: Array<Express.Multer.File>,
  ) {
    try {
      if (files && files.length && files[0].mimetype !== 'application/pdf')
        return this.errorResponse.deleteFiles(res, files);

      const chapter = await this.lectureModel.getChapterById(chapterId);

      if (!chapter) {
        this.helperFunction.deletePDFFiles(files);
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');
      }

      await this.lectureModel.createNewLecture(body, chapter, files);

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
