import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LectureModel } from './lecture.model';

import { ChapterDto } from 'src/chapter/dto/chapter.dto';
import { ChapterInterface } from 'src/chapter/interface/chapter.interface';
import { LectureInterface } from 'src/lecture/interface/lecture.interface';

@Injectable()
export class ChapterModel {
  constructor(
    @InjectModel('Chapter')
    private readonly chapterModel: Model<ChapterInterface>,
    @Inject(forwardRef(() => LectureModel))
    private readonly lectureModel: LectureModel,
  ) {}

  async createNewChapter(body: ChapterDto): Promise<void> {
    await this.chapterModel.create(body);
  }

  async deleteChapterById(
    chapterId: string,
  ): Promise<[ChapterInterface, LectureInterface | void]> {
    return await Promise.all([
      this.chapterModel.findByIdAndDelete(chapterId).lean(),
      this.lectureModel.deleteManyLecturesByChapterId(chapterId),
    ]);
  }

  async updateChapterById(
    chapterId: string,
    body: ChapterDto,
  ): Promise<ChapterInterface> {
    return await this.chapterModel.findByIdAndUpdate(chapterId, body).lean();
  }

  async getAllChapters(academicYear: number): Promise<ChapterInterface[]> {
    if (!academicYear)
      return await this.chapterModel.find().sort({ createdAt: -1 }).lean();

    return await this.chapterModel
      .find({ academicYear })
      .sort({ createdAt: -1 })
      .lean();
  }

  async searchChapters(title: string): Promise<ChapterInterface[]> {
    const chapterQuery = {
      title: { $regex: new RegExp(title.replace(/\s+/g, '\\s*'), 'i') },
    };

    return await this.chapterModel
      .find(chapterQuery)
      .sort({ createdAt: -1 })
      .lean();
  }

  async getChapterById(chapterId: string): Promise<ChapterInterface> {
    return await this.chapterModel
      .findById(chapterId)
      .select('_id academicYear')
      .lean();
  }
}
