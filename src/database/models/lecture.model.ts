import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChapterModel } from './chapter.model';
import { Model } from 'mongoose';

import { LectureInterface } from 'src/lecture/interface/lecture.interface';
import { ChapterInterface } from 'src/chapter/interface/chapter.interface';

import { LectureDto } from 'src/lecture/dto/lecture.dto';

@Injectable()
export class LectureModel {
  constructor(
    @InjectModel('Lecture')
    private readonly lectureModel: Model<LectureInterface>,
    @Inject(forwardRef(() => ChapterModel))
    private readonly chapterModel: ChapterModel,
  ) {}

  async deleteManyLecturesByChapterId(
    chapterId: string,
  ): Promise<LectureInterface> {
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
