import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserAuthInterface } from 'src/auth/interface/userAuth.interface';

import { UpdatedUserDto } from 'src/user/dto/updatedLecture.dto';

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

  async updateUserById(userId: string, body: UpdatedUserDto): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, body);
  }
}
