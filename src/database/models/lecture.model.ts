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

  async countAllLectures(): Promise<LectureInterface[]> {
    return await this.lectureModel.count().lean();
  }

  async getLecturesByChapterId(chapterId: string): Promise<string[]> {
    return (
      await this.lectureModel
        .find({ chapterId })
        .sort({ createdAt: -1 })
        .select('pdfFiles -_id')
        .lean()
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
    return await this.lectureModel
      .findById(lectureId)
      .select('-createdAt -updatedAt -__v')
      .populate({ path: 'chapterId', select: 'title -_id' })
      .lean();
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

  async getChapterLecturesAndCount(
    chapterId: string,
    page: number,
    limit: number,
  ): Promise<[LectureInterface[], number]> {
    return await Promise.all([
      this.getAllLecturesByChapterId(chapterId, page, limit),
      this.countChapterLectures(chapterId),
    ]);
  }

  async deleteLectureById(lectureId: string): Promise<{ pdfFiles: string[] }> {
    return await this.lectureModel
      .findByIdAndDelete(lectureId)
      .select('pdfFiles -_id')
      .lean();
  }

  async getAllLectures(
    page: number,
    limit: number,
  ): Promise<LectureInterface[]> {
    const lectures = await this.lectureModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select('title imageURL academicYear chapterId price')
      .populate({ path: 'chapterId', select: 'title -_id' })
      .sort({ createdAt: -1 })
      .lean();

    lectures.forEach((lecture) => {
      lecture['chapterTitle'] = lecture.chapterId['title'];
      delete lecture.chapterId;
    });

    return lectures;
  }

  async countLectures(title?: string): Promise<number> {
    if (!title) return await this.lectureModel.count().lean();

    const lectureQuery = {
      title: { $regex: new RegExp(title.replace(/\s+/g, '\\s*'), 'i') },
    };

    return await this.lectureModel.count(lectureQuery).lean();
  }

  async getLecturesAndCount(
    page: number,
    limit: number,
  ): Promise<[LectureInterface[], number]> {
    return await Promise.all([
      this.getAllLectures(page, limit),
      this.countLectures(),
    ]);
  }

  async searchLecture(
    title: string,
    page: number,
    limit: number,
  ): Promise<LectureInterface[]> {
    const lectureQuery = {
      title: { $regex: new RegExp(title.replace(/\s+/g, '\\s*'), 'i') },
    };

    const lecture = await this.lectureModel
      .find(lectureQuery)
      .select('title imageURL academicYear chapterId price')
      .populate({ path: 'chapterId', select: 'title -_id' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    lecture.forEach((lecture) => {
      lecture['chapterTitle'] = lecture.chapterId['title'];
      delete lecture.chapterId;
    });

    return lecture;
  }

  async searchLecturesAndCount(
    page: number,
    limit: number,
    title: string,
  ): Promise<[LectureInterface[], number]> {
    return await Promise.all([
      this.searchLecture(title, page, limit),
      this.countLectures(title),
    ]);
  }
}
