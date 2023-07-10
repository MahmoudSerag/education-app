import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { registerDto } from 'src/auth/dto/register.dto';
import { UserAuthInterface } from 'src/auth/interface/userAuth.interface';

@Injectable()
export class AuthModel {
  constructor(
    @InjectModel('User') private readonly authModel: Model<UserAuthInterface>,
  ) {}

  async findUserByPhoneNumber(phoneNumber: string): Promise<UserAuthInterface> {
    return await this.authModel
      .findOne({ phoneNumber })
      .select('phoneNumber -_id')
      .lean();
  }

  async findUserByEmail(email: string): Promise<UserAuthInterface> {
    return await this.authModel.findOne({ email }).select('email -_id').lean();
  }

  async CreateNewUser(body: registerDto): Promise<void> {
    await this.authModel.create(body);
  }
}