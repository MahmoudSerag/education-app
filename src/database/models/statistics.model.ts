import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserAuthInterface } from 'src/auth/interface/userAuth.interface';

import { LectureModel } from './lecture.model';

@Injectable()
export class StatisticsModel {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserAuthInterface>,
    private readonly lectureModel: LectureModel,
  ) {}

  async getStatistics(): Promise<number[]> {
    let yearOne = 0,
      yearTwo = 0,
      yearThree = 0;

    const [students, numberOfLectures] = await Promise.all([
      this.userModel
        .find({ role: 'student' })
        .select('academicYear -_id')
        .lean(),
      this.lectureModel.countAllLectures(),
    ]);

    students.forEach((student) => {
      if (student.academicYear === 1) yearOne++;
      else if (student.academicYear === 2) yearTwo++;
      else yearThree++;
    });

    return [students.length, numberOfLectures, yearOne, yearTwo, yearThree];
  }

  async countAllStudents(): Promise<number> {
    return await this.userModel.count({ role: 'student' }).lean();
  }

  async getStudentsList(
    page: number,
    limit: number,
  ): Promise<UserAuthInterface[]> {
    return await this.userModel
      .find({ role: 'student' })
      .select('fullName phoneNumber email academicYear sex')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  async getStudentsListWithTotalCount(
    page: number,
    limit: number,
  ): Promise<[UserAuthInterface[], number]> {
    return await Promise.all([
      this.getStudentsList(page, limit),
      this.countAllStudents(),
    ]);
  }
}
