import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CodeBankModel } from 'src/database/models/codeBank.model';

import { UserAuthInterface } from 'src/auth/interface/userAuth.interface';
import { CodeBankInterface } from 'src/code-bank/interface/codeBank.interface';

import { UpdatedUserDto } from 'src/user/dto/updatedUser.dto';

@Injectable()
export class UserModel {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserAuthInterface>,
    private readonly codeBankModel: CodeBankModel,
  ) {}

  async getUserById(userId: string): Promise<UserAuthInterface> {
    return await this.userModel
      .findById(userId)
      .select('fullName email phoneNumber sex academicYear wallet password');
  }

  async updateUserById(userId: string, body: UpdatedUserDto): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, body);
  }

  async updateUserPassword(user: UserAuthInterface): Promise<void> {
    await user.save();
  }

  async getChargingCode(code: string): Promise<CodeBankInterface> {
    return await this.codeBankModel.getChargingCode(code);
  }

  async chargeCode(userId: string, codePrice: number): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $inc: { wallet: codePrice },
    });
  }

  async deleteChargingCode(code: string): Promise<void> {
    await this.codeBankModel.deleteChargingCode(code);
  }
}
