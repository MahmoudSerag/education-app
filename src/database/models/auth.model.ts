import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserAuthInterface } from 'src/auth/interface/userAuth.interface';

@Injectable()
export class AuthModel {
  constructor(
    @InjectModel('User') private readonly authModel: Model<UserAuthInterface>,
  ) {}

  async findUserByEmail(email: string): Promise<UserAuthInterface> {
    return await this.authModel.findOne({ email }).select('email');
  }

  async findUserByEmailOrPhoneNumber(
    emailOrPhoneNumber: string,
  ): Promise<UserAuthInterface> {
    return await this.authModel
      .findOne({
        $or: [
          { email: emailOrPhoneNumber },
          { phoneNumber: emailOrPhoneNumber },
        ],
      })
      .select('password email role phoneNumber')
      .lean();
  }

  async createNewUser(body: RegisterDto): Promise<void> {
    await this.authModel.create(body);
  }

  async setTokenExpired(
    user: UserAuthInterface,
    isTokenExpired: boolean,
  ): Promise<void> {
    user.isTokenExpired = isTokenExpired;
    await user.save();
  }

  async createNewPassword(
    email: string,
    hashedPassword: string,
  ): Promise<void> {
    const queryOptions = { password: hashedPassword, isTokenExpired: true };
    await this.authModel.findOneAndUpdate({ email }, queryOptions);
  }

  async findUserById(userId: string): Promise<UserAuthInterface> {
    return await this.authModel
      .findOne({ _id: userId })
      .select('_id isTokenExpired')
      .lean();
  }
}
