import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { LectureModel } from 'src/database/models/lecture.model';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { HelperFunctions } from 'src/helpers/helperFunctions.helper';
import { UploadAndDownloadService } from 'src/helpers/uploadAndDownloadService.helper';

import { LectureDto } from './dto/lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureModel: LectureModel,
    private readonly errorResponse: ErrorResponse,
    private readonly helperFunction: HelperFunctions,
    private readonly uploadAndDownloadService: UploadAndDownloadService,
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
        this.helperFunction.deleteFiles(files);
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');
      }

      await this.lectureModel.createNewLecture(body, chapter, files);

      return {
        success: true,
        statusCode: 201,
        message: 'Lecture created successfully',
      };
    } catch (error) {
      this.helperFunction.deleteFiles(files);
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async updateSingleLecture(
    res: Response,
    lectureId: string,
    body: LectureDto,
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    try {
      if (files && files.length && files[0].mimetype !== 'application/pdf')
        return this.errorResponse.deleteFiles(res, files);

      const lecture = await this.lectureModel.getLectureById(lectureId);

      if (!lecture) {
        this.helperFunction.deleteFiles(files);
        return this.errorResponse.handleError(res, 404, 'Lecture not found.');
      }

      await this.lectureModel.updateLectureById(lectureId, body, files);

      this.helperFunction.deleteFiles(lecture.pdfFiles);

      return {
        success: true,
        statusCode: 200,
        message: 'Lecture updated successfully.',
      };
    } catch (error) {
      this.helperFunction.deleteFiles(files);
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getAllLecturesByChapterId(
    res: Response,
    chapterId: string,
    page: number,
    limit = 10,
  ): Promise<any> {
    try {
      const chapter = await this.lectureModel.getChapterById(chapterId);

      if (!chapter)
        return this.errorResponse.handleError(res, 404, 'Chapter not found.');

      const [lectures, lecturesCount] =
        await this.lectureModel.getChapterLecturesAndCount(
          chapterId,
          page,
          limit,
        );

      return {
        success: true,
        statusCode: 200,
        message: 'Lectures fetched successfully.',
        totalLecturesCount: lecturesCount,
        lecturesPerPage: limit,
        maxPages: Math.ceil(lecturesCount / limit),
        currentPage: page,
        lectures: (() => {
          return lectures.length ? lectures : 'No more lectures';
        })(),
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async deleteSingleLecture(res: Response, lectureId: string): Promise<any> {
    try {
      const lecture = await this.lectureModel.deleteLectureById(lectureId);

      if (!lecture)
        return this.errorResponse.handleError(res, 404, 'Lecture not found.');

      this.helperFunction.deleteFiles(lecture.pdfFiles);

      return {
        success: true,
        statusCode: 200,
        message: 'Lecture deleted successfully.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async getSingleLecture(res: Response): Promise<any> {
    try {
      const lecture = res.locals.lecture;
      const chapterTitle = lecture.chapterId?.title || '';

      const pdfFiles = lecture.pdfFiles.map((pdf) => {
        const currentPdf = pdf.split('-');
        return {
          pdfId: currentPdf[0].split('/')[1],
          pdfName: currentPdf[2],
        };
      });

      const optimizedLecture = {
        ...lecture,
        chapterTitle,
        pdfFiles,
      };

      delete optimizedLecture.chapterId;

      return {
        success: true,
        statusCode: 200,
        message: 'Lecture fetched successfully.',
        lecture: optimizedLecture,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async downloadLecturePDF(res: Response, pdfId: string): Promise<any> {
    try {
      const pdfFiles = res.locals.lecture.pdfFiles;
      let isPdfExists = false;
      let pdfName: string, pdfMimeType: string;

      for (const pdf of pdfFiles) {
        const currentPdfId = pdf.split('-')[0].split('/')[1];
        if (currentPdfId === pdfId) {
          isPdfExists = true;
          pdfName = pdf.split('/')[1];
          pdfMimeType = 'application/pdf';
          break;
        }
      }

      if (!isPdfExists || !pdfName || !pdfMimeType)
        return this.errorResponse.handleError(res, 404, 'PDF not found.');

      return this.uploadAndDownloadService.downloadFile(
        res,
        pdfName,
        pdfMimeType,
      );
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
