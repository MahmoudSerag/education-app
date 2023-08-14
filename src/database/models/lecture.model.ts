import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LectureInterface } from 'src/lecture/interface/lecture.interface';

@Injectable()
export class LectureModel {
  constructor(
    @InjectModel('Lecture')
    private readonly lectureModel: Model<LectureInterface>,
  ) {}

  async deleteManyLecturesByChapterId(chapterId: string): Promise<any> {
    return { message: 'Hello World!!', chapterId };
  }
}
