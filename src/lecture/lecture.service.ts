import { Injectable } from '@nestjs/common';
import { LectureModel } from 'src/database/models/lecture.model';

@Injectable()
export class LectureService {
  constructor(private readonly lectureModel: LectureModel) {}
  async getHello() {
    return 'Hello World!';
  }
}
