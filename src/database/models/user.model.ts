import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserAuthInterface } from 'src/auth/interface/userAuth.interface';

@Injectable()
export class UserModel {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserAuthInterface>,
  ) {}

  async getUserById(userId: string): Promise<UserAuthInterface> {
    return await this.userModel
      .findById(userId)
      .select('fullName email phoneNumber sex academicYear wallet')
      .lean();
  }
}
