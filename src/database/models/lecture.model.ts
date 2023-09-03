import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChapterModel } from './chapter.model';
import { Model } from 'mongoose';

import { LectureInterface } from 'src/lecture/interface/lecture.interface';
import { ChapterInterface } from 'src/chapter/interface/chapter.interface';

import { LectureDto } from 'src/lecture/dto/lecture.dto';

import { HelperFunctions } from 'src/helpers/helperFunctions.helper';

@Injectable()
export class LectureModel {
  constructor(
    @InjectModel('Lecture')
    private readonly lectureModel: Model<LectureInterface>,
    @Inject(forwardRef(() => ChapterModel))
    private readonly chapterModel: ChapterModel,
    private readonly helperFunction: HelperFunctions,
  ) {}

  async getLecturesByChapterId(chapterId: string): Promise<string[]> {
    return (
      await this.lectureModel.find({ chapterId }).select('pdfFiles -_id').lean()
    ).flatMap((lecture) => lecture.pdfFiles);
  }

  async deleteManyLecturesByChapterId(
    chapterId: string,
  ): Promise<LectureInterface | void> {
    const lecturesPDFsFiles = await this.getLecturesByChapterId(chapterId);

    if (lecturesPDFsFiles.length)
      this.helperFunction.deleteFiles(lecturesPDFsFiles);

    return await this.lectureModel.deleteMany({ chapterId }).lean();
  }

  async createNewLecture(
    body: LectureDto,
    chapter: ChapterInterface,
    files: Array<Express.Multer.File>,
  ): Promise<void> {
    body['chapterId'] = chapter._id;
    body['academicYear'] = chapter.academicYear;

    if (files && files.length)
      body['pdfFiles'] = files.map((file) => file.path);

    await this.lectureModel.create(body);
  }

  async updateLectureById(
    lectureId: string,
    body: LectureDto,
    files: Array<Express.Multer.File>,
  ): Promise<LectureInterface> {
    if (files && files.length)
      body['pdfFiles'] = files.map((file) => file.path);
    else body['pdfFiles'] = [];

    return await this.lectureModel.findByIdAndUpdate(lectureId, body);
  }

  async getLectureById(lectureId: string): Promise<LectureInterface> {
    return await this.lectureModel.findById(lectureId).lean();
  }

  async getAllLecturesByChapterId(
    chapterId: string,
    page: number,
    limit: number,
  ): Promise<LectureInterface[]> {
    const lectures = await this.lectureModel
      .find({ chapterId })
      .select('-pdfFiles -videoURLs -createdAt -updatedAt -__v')
      .populate({ path: 'chapterId', select: 'title -_id' })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    lectures.forEach((lecture) => {
      lecture['chapterTitle'] = lecture.chapterId['title'];
      delete lecture.chapterId;
    });

    return lectures;
  }

  async countChapterLectures(chapterId: string): Promise<number> {
    return await this.lectureModel.count({ chapterId }).lean();
  }

  async getChapterById(chapterId: string): Promise<ChapterInterface> {
    return await this.chapterModel.getChapterById(chapterId);
  }
}
