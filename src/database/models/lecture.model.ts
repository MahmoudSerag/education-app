import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LectureInterface } from 'src/lecture/interface/lecture.interface';
import { ChapterInterface } from 'src/chapter/interface/chapter.interface';

import { lectureDto } from 'src/lecture/dto/lecture.dto';

@Injectable()
export class LectureModel {
  constructor(
    @InjectModel('Lecture')
    private readonly lectureModel: Model<LectureInterface>,
  ) {}

  async deleteManyLecturesByChapterId(
    chapterId: string,
  ): Promise<LectureInterface> {
    return await this.lectureModel.deleteMany({ chapterId }).lean();
  }

  async createNewLecture(
    body: lectureDto,
    chapter: ChapterInterface,
  ): Promise<void> {
    body['chapterId'] = chapter._id;
    body['academicYear'] = chapter.academicYear;
    await this.lectureModel.create(body);
  }
}
