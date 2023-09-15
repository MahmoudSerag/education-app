import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CodeBankModel } from 'src/database/models/codeBank.model';
import { LectureModel } from './lecture.model';
import { OperationLogsModel } from './operationLogs.model';
import { ChapterModel } from './chapter.model';

import { UserAuthInterface } from 'src/auth/interface/userAuth.interface';
import { CodeBankInterface } from 'src/code-bank/interface/codeBank.interface';
import { LectureInterface } from 'src/lecture/interface/lecture.interface';
import { OperationsLogsInterface } from 'src/operation-logs/interface/operationsLogs.interface';
import { ChapterInterface } from 'src/chapter/interface/chapter.interface';

import { UpdatedUserDto } from 'src/user/dto/updatedUser.dto';

@Injectable()
export class UserModel {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserAuthInterface>,
    private readonly codeBankModel: CodeBankModel,
    private readonly lectureModel: LectureModel,
    private readonly operationLogs: OperationLogsModel,
    private readonly chapterModel: ChapterModel,
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

  async getLectureById(lectureId: string): Promise<LectureInterface> {
    return await this.lectureModel.getLectureById(lectureId);
  }

  async purchaseLecture(userId: string, lectureId: string): Promise<void> {
    await this.operationLogs.purchaseLecture(userId, lectureId);
  }

  async updateUserWallet(userId: string, lecturePrice: number): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $inc: { wallet: lecturePrice },
    });
  }

  async findPurchasedLecture(
    userId: string,
    lectureId: string,
  ): Promise<OperationsLogsInterface> {
    return this.operationLogs.findPurchasedLecture(userId, lectureId);
  }

  async getUserOperationsLogs(
    userId: string,
  ): Promise<OperationsLogsInterface[]> {
    const userOperationsLogs = await this.operationLogs.getOperationsLogs(
      userId,
    );

    userOperationsLogs.forEach((log) => {
      log['lecture'] = log.lectureId;
      delete log.lectureId;
    });

    return userOperationsLogs;
  }

  async getLatestLecturesAndChapters(): Promise<
    [LectureInterface[], ChapterInterface[]]
  > {
    const [lectures, chapters] = await Promise.all([
      this.lectureModel.getLatestLectures(),
      this.chapterModel.getLatestChapters(),
    ]);

    lectures.forEach((lecture) => {
      lecture['chapterTitle'] = lecture.chapterId['title'];
      delete lecture.chapterId;
    });

    return [lectures, chapters];
  }
}
