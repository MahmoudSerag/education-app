import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LectureModel } from './lecture.model';

import { chapterDto } from 'src/chapter/dto/chapter.dto';
import { ChapterInterface } from 'src/chapter/interface/chapter.interface';
import { LectureInterface } from 'src/lecture/interface/lecture.interface';

@Injectable()
export class ChapterModel {
  constructor(
    @InjectModel('Chapter')
    private readonly chapterModel: Model<ChapterInterface>,
    private readonly lectureModel: LectureModel,
  ) {}

  async createNewChapter(body: chapterDto): Promise<void> {
    await this.chapterModel.create(body);
  }

  async deleteChapterById(
    chapterId: string,
  ): Promise<[ChapterInterface, LectureInterface]> {
    return await Promise.all([
      this.chapterModel
        .findByIdAndDelete(chapterId)
        .select(
          '-title -imageURL -description -academicYear -createdAt -updatedAt',
        )
        .lean(),
      this.lectureModel.deleteManyLecturesByChapterId(chapterId),
    ]);
  }
}
