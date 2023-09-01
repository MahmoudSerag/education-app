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
      this.helperFunction.deletePDFFiles(lecturesPDFsFiles);

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

  async getChapterById(chapterId: string): Promise<ChapterInterface> {
    return await this.chapterModel.getChapterById(chapterId);
  }
}
