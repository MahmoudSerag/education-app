import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersLecturesInterface } from 'src/users-lectures/interface/usersLectures.interface';

@Injectable()
export class UsersLecturesModel {
  constructor(
    @InjectModel('UsersLectures')
    private readonly usersLecturesModel: Model<UsersLecturesInterface>,
  ) {}

  async findPurchasedLecture(
    userId: string,
    lectureId: string,
  ): Promise<UsersLecturesInterface> {
    return await this.usersLecturesModel
      .findOne({ userId, lectureId, enrolledIn: true })
      .select('_id')
      .lean();
  }
}
